import { Quiz } from '../models/quiz'
import { Question } from '../models/question'

export default interface QuizRepository {
  findAll(): Promise<Quiz[]>
  getQuestions(quizId: string): Promise<Question[]>
}
