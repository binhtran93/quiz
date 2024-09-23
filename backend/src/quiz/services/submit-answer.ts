import {inject, injectable} from "inversify";
import {TYPES} from "../../app/injection";
import QuizRepository from "../repositories/quiz-repository";

@injectable()
export default class SubmitAnswer {
    constructor(
        @inject(TYPES.QuizRepository)
        private quizRepository: QuizRepository,
    ) {}

    async execute(userId: string, quizId: string, questionId: string, answerIndex: number): Promise<boolean> {
        const questions = await this.quizRepository.getQuestions(quizId);

        const question = questions.find((question) => question.id === questionId) ?? null;
        if (question === null) {
            throw new Error('Could not find question');
        }

        const isCorrect = question.correctAnswerIndex === answerIndex;
        if (isCorrect) {
            /**
             * PERSISTENT STORAGE
             *
             * 1. Update user score in persistent storage. We need a database that can handle a high volume of writes,
             * supports eventual consistency, and is easy to scale. MongoDB is a good option due to its high
             * availability through clustering
             *
             * 2. To avoid backpressure, and because eventual consistency is okay, using a queue will help. Kafka is a
             * good choice because it ensures exactly-once processing. We don’t need to worry about order since score
             * updates are atomic, like 'update score = score + 1 where xyz'
             */

            // REDIS

        }

        return isCorrect
    }
}