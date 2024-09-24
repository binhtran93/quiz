import { inject, injectable } from 'inversify'
import { TYPES } from '../../app/configs'
import QuizRepository from '../repositories/quiz-repository'
import { Quiz } from '../models/quiz'

type NoQuestionsQuiz = Omit<Quiz, 'questions'>

@injectable()
export default class GetQuizzes {
  constructor(
    @inject(TYPES.QuizRepository)
    private quizRepository: QuizRepository
  ) {}

  async execute(): Promise<NoQuestionsQuiz[]> {
    const quizzes = await this.quizRepository.findAll()

    const data: { id: string; name: string }[] = []
    quizzes.forEach((quiz) => {
      data.push({
        id: quiz.id,
        name: quiz.name
      })
    })

    return Promise.resolve(data)
  }
}
