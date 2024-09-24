import SubmitAnswer from "../../quiz/services/submit-answer";
import {injectable} from "inversify";
import redisClient from "../../redis/client";
import io from "../../app/ws";

@injectable()
export default class UserSocketHandler {
    constructor(
        private submitAnswerServ: SubmitAnswer
    ) {}

    public async submitAnswer(userId: string, quizId: string, questionId: string, answerIndex: number) {
        const isCorrect = await this.submitAnswerServ.execute(userId, quizId, questionId, answerIndex);
        if (isCorrect) {
            const leaderboard = await redisClient.zRangeWithScores(`leaderboard-${quizId}`, 0, 10, {REV: true});
            io.to(quizId).emit('leaderboard-updated', leaderboard);
        }
    }
}