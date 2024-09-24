import { Request, Response } from 'express'
import { injectable } from 'inversify'
import GetQuizzes from '../services/get-quizzes'
import GetQuestions from '../services/get-questions'

@injectable()
export default class QuizController {
  constructor(
    private getQuizzes: GetQuizzes,
    private getQuestions: GetQuestions,
  ) {}

  public async getAll(req: Request, res: Response) {
    const quizzes = await this.getQuizzes.execute()

    return res.json(quizzes)
  }

  public async findQuestions(req: Request, res: Response) {
    const quizId = req.params.quizId
    const questions = await this.getQuestions.execute(quizId)

    return res.json(questions)
  }
}
