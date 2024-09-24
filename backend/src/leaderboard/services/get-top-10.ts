import redisClient from "../../redis/client";
import LeaderboardRepository from "../repositories/leaderboard-repository";
import {inject, injectable} from "inversify";
import {TYPES} from "../../app/configs";
import {generateLeaderboardCacheKey} from "../utils";

@injectable()
export default class GetTop10 {
    constructor(
        @inject(TYPES.LeaderboardRepository)
        private leaderboardRepository: LeaderboardRepository
    ) {
    }

    async execute(quizId: string) {
        let cachedTop10 = await redisClient.zRangeWithScores(`leaderboard-${quizId}`, 0, 10, {REV: true});
        if (cachedTop10.length === 0) {
            const top10 = await this.leaderboardRepository.getTop10();
            top10.forEach((userScore) => {
                const cacheKey = generateLeaderboardCacheKey(quizId);
                redisClient.zAdd(cacheKey, {score: userScore.score, value: userScore.userId});
            })

            cachedTop10 = await redisClient.zRangeWithScores(`leaderboard-${quizId}`, 0, 10, {REV: true});
        }

        return cachedTop10;
    }
}