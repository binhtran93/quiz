import { inject, injectable } from 'inversify'
import { TYPES } from '../../app/configs'
import QuizRepository from '../repositories/quiz-repository'
import { Question } from '../models/question'

type QuestionOnly = Omit<Question, 'correctAnswerIndex'>

@injectable()
export default class GetQuestions {
  constructor(
    @inject(TYPES.QuizRepository)
    private quizRepository: QuizRepository
  ) {}

  async execute(quizId: string): Promise<QuestionOnly[]> {
    const questions = await this.quizRepository.getQuestions(quizId)

    return questions.map((question) => {
      return {
        id: question.id,
        text: question.text,
        options: question.options
      }
    })
  }
}
