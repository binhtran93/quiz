import SubmitAnswer from '../../quiz/services/submit-answer'
import { injectable } from 'inversify'
import io from '../../app/ws'
import GetLeaderboard from '../../leaderboard/services/get-leaderboard'
import { SOCKET_EVENTS } from '../../app/configs'
import redisClient from '../../redis/client'
import { generateLeaderboardLastModifiedCacheKey } from '../../leaderboard/utils'

@injectable()
export default class UserSocketHandler {
  constructor(
    private submitAnswerServ: SubmitAnswer,
    private getLeaderboard: GetLeaderboard
  ) {}

  public async submitAnswer(userId: string, quizId: string, questionId: string, answerIndex: number) {
    const isCorrect = await this.submitAnswerServ.execute(userId, quizId, questionId, answerIndex)
    if (isCorrect) {
      await this.emitLeaderboard(quizId)
    }
  }

  private async emitLeaderboard(quizId: string) {
    const leaderboard = await this.getLeaderboard.execute(quizId)

    /**
     * We don't want to emit new leaderboard everytime user submit a correct answer, a throttle here is needed to
     * prevent that
     *
     * In order for this to work properly, redis cluster should config to read from master only
     */
    const lastModifiedCacheKey = generateLeaderboardLastModifiedCacheKey(quizId)
    const lastModified = await redisClient.get(lastModifiedCacheKey)
    const now = Date.now()
    if (lastModified === null || now - parseInt(lastModified) > 500) {
      io.to(quizId).emit(SOCKET_EVENTS.LeaderboardUpdated, leaderboard)
      await redisClient.set(lastModifiedCacheKey, now)
    }
  }
}
