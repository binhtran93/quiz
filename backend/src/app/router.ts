import { Container } from 'inversify'
import { Express } from 'express'
import UserController from '../user/controllers/user-controller'
import QuizController from '../quiz/controllers/quiz-controller'
import LeaderboardController from '../leaderboard/controllers/leaderboard-controller'

export default function initRoutes(app: Express, container: Container): void {
  const userController = container.resolve(UserController)
  app.get('/api/v1/users', userController.getAll.bind(userController))

  const quizController = container.resolve(QuizController)
  app.get('/api/v1/quizzes', quizController.getAll.bind(quizController))
  app.get('/api/v1/quizzes/:quizId/questions', quizController.findQuestions.bind(quizController))

  const leaderboardController = container.resolve(LeaderboardController)
  app.get('/api/v1/leaderboard/:quizId/top10', leaderboardController.getTop10.bind(leaderboardController))
}
