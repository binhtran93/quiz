import SubmitAnswer from "../../quiz/services/submit-answer";
import {injectable} from "inversify";
import io from "../../app/ws";
import GetTop10 from "../../leaderboard/services/get-top-10";

@injectable()
export default class UserSocketHandler {
    constructor(
        private submitAnswerServ: SubmitAnswer,
        private getTop10: GetTop10,
    ) {}

    public async submitAnswer(userId: string, quizId: string, questionId: string, answerIndex: number) {
        const isCorrect = await this.submitAnswerServ.execute(userId, quizId, questionId, answerIndex);
        if (isCorrect) {
            const leaderboard = await this.getTop10.execute(quizId);
            io.to(quizId).emit('leaderboard-updated', leaderboard);
        }
    }
}