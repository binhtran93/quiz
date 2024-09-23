import {Request, Response} from "express";
import {injectable} from "inversify";
import GetQuizzes from "../services/get-quizzes";
import GetQuestions from "../services/get-questions";
import SubmitAnswer from "../services/submit-answer";

@injectable()
export default class QuizController {
    constructor(
        private getQuizzes: GetQuizzes,
        private getQuestions: GetQuestions,
        private submitAnswerServ: SubmitAnswer,
    ) {}

    public async getAll(req: Request, res: Response) {
        const quizzes = await this.getQuizzes.execute();

        return res.json(quizzes);
    }

    public async findQuestions(req: Request, res: Response) {
        const quizId = req.params.quizId;
        const questions = await this.getQuestions.execute(quizId);

        return res.json(questions);
    }

    public async submitAnswer(userId: string, quizId: string, questionId: string, answerIndex: number): Promise<void> {
        await this.submitAnswerServ.execute(userId, quizId, questionId, answerIndex);

    }
}