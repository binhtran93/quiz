import {Request, Response} from "express";
import {injectable} from "inversify";
import GetQuizzes from "../services/get-quizzes";

@injectable()
export default class QuizController {
    constructor(
        private getQuizzes: GetQuizzes
    ) {}

    public async getAll(req: Request, res: Response) {
        const users = await this.getQuizzes.execute();

        return res.json(users);
    }
}