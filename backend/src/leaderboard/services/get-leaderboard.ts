import redisClient from '../../redis/client'
import LeaderboardRepository from '../repositories/leaderboard-repository'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../app/configs'
import { generateLeaderboardCacheKey } from '../utils'
import { UserScore, UserScoreWithUsername } from '../models/UserScore'
import { generateUserCacheKey } from '../../user/utils'
import { User } from '../../user/models/user'
import UserRepository from '../../user/repository/user-repository'

@injectable()
export default class GetLeaderboard {
  constructor(
    @inject(TYPES.LeaderboardRepository)
    private leaderboardRepository: LeaderboardRepository,
    @inject(TYPES.UserRepository)
    private userRepository: UserRepository
  ) {}

  async execute(quizId: string): Promise<UserScoreWithUsername[]> {
    let leaderboard = await this.getLeaderboardFromCache(quizId)
    if (leaderboard.length === 0) {
      const leaderboardCacheKey = generateLeaderboardCacheKey(quizId)
      leaderboard = await this.leaderboardRepository.get()

      await redisClient.zAdd(leaderboardCacheKey, leaderboard)
    }

    const storeUserInCache: Promise<User | null>[] = []
    leaderboard.forEach((userScore) => {
      storeUserInCache.push(this.cacheAndGetUser(userScore.value))
    })
    const users = await Promise.all(storeUserInCache)

    const leaderboardWithUsername: UserScoreWithUsername[] = []
    leaderboard.forEach((userScore: UserScore) => {
      const user = users.find((u) => u?.id === userScore.value)
      if (!user) {
        return
      }

      leaderboardWithUsername.push({
        score: userScore.score,
        username: user.username,
        value: userScore.value
      })
    })

    return leaderboardWithUsername
  }

  private async getLeaderboardFromCache(quizId: string): Promise<UserScore[]> {
    const cacheKey = generateLeaderboardCacheKey(quizId)

    return redisClient.zRangeWithScores(cacheKey, 0, 10, { REV: true })
  }

  /**
   * Get and cache aside user in redis using hset
   *
   * @param userId
   * @private
   */
  private async cacheAndGetUser(userId: string): Promise<User | null> {
    const cacheKey = generateUserCacheKey(userId)
    const cached = await redisClient.hGetAll(cacheKey)
    if (cached.id !== undefined && cached.username !== null) {
      return {
        id: cached.id,
        username: cached.username
      }
    }

    const user = await this.userRepository.findById(userId)
    if (!user) {
      return null
    }

    await redisClient.hSet(cacheKey, {
      id: user.id,
      username: user.username
    })

    return user
  }
}
