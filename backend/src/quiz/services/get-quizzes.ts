import {inject, injectable} from "inversify";
import {TYPES} from "../../app/injection";
import QuizRepository from "../repositories/quiz-repository";
import {Quiz} from "../models/quiz";

@injectable()
export default class GetQuizzes {
    constructor(
        @inject(TYPES.QuizRepository)
        private quizRepository: QuizRepository
    ) {}

    execute(): Promise<Quiz[]> {
        return this.quizRepository.findAll();
    }
}