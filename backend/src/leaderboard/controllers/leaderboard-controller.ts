import GetLeaderboard from '../services/get-leaderboard'
import { injectable } from 'inversify'
import { Request, Response } from 'express'

@injectable()
export default class LeaderboardController {
  constructor(private getLeaderboard: GetLeaderboard) {}

  public async getTop10(req: Request, res: Response) {
    const quizId = req.params.quizId
    if (!quizId) {
      return res.status(404).send('No such quiz')
    }

    const leaderboard = await this.getLeaderboard.execute(quizId)

    return res.json(leaderboard)
  }
}
