import {inject, injectable} from "inversify";
import {TYPES} from "../../app/injection";
import QuizRepository from "../repositories/quiz-repository";
import {Question} from "../models/question";

@injectable()
export default class GetQuestions {
    constructor(
        @inject(TYPES.QuizRepository)
        private quizRepository: QuizRepository
    ) {}

    execute(quizId: string): Promise<Question[]> {
        return this.quizRepository.getQuestions(quizId);
    }
}