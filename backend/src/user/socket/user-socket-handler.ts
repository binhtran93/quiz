import SubmitAnswer from "../../quiz/services/submit-answer";
import {injectable} from "inversify";
import io from "../../app/ws";
import GetLeaderboard from "../../leaderboard/services/get-leaderboard";
import {SOCKET_EVENTS} from "../../app/configs";

@injectable()
export default class UserSocketHandler {
    constructor(
        private submitAnswerServ: SubmitAnswer,
        private getLeaderboard: GetLeaderboard,
    ) {}

    public async submitAnswer(userId: string, quizId: string, questionId: string, answerIndex: number) {
        const isCorrect = await this.submitAnswerServ.execute(userId, quizId, questionId, answerIndex);
        if (isCorrect) {
            const leaderboard = await this.getLeaderboard.execute(quizId);
            io.to(quizId).emit(SOCKET_EVENTS.LeaderboardUpdated, leaderboard);
        }
    }
}