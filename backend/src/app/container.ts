import { Container } from 'inversify'
import 'reflect-metadata'
import UserRepository from '../user/repository/user-repository'
import QuizRepository from '../quiz/repositories/quiz-repository'
import GetUsers from '../user/services/getUsers'
import GetQuizzes from '../quiz/services/get-quizzes'
import GetQuestions from '../quiz/services/get-questions'
import SubmitAnswer from '../user/services/submit-answer'
import InMemoryUserRepository from '../user/repository/in-memory-user-repository'
import InMemoryQuizRepository from '../quiz/repositories/in-memory-quiz-repository'
import { TYPES } from './configs'
import InMemoryLeaderboardRepository from '../leaderboard/repositories/in-memory-leaderboard-repository'
import LeaderboardRepository from '../leaderboard/repositories/leaderboard-repository'
import GetLeaderboard from '../leaderboard/services/get-leaderboard'

// Config container
const container = new Container()
container.bind<UserRepository>(TYPES.UserRepository).to(InMemoryUserRepository)
container.bind<QuizRepository>(TYPES.QuizRepository).to(InMemoryQuizRepository)
container.bind<LeaderboardRepository>(TYPES.LeaderboardRepository).to(InMemoryLeaderboardRepository)
container.bind(GetUsers).toSelf()
container.bind(GetQuizzes).toSelf()
container.bind(GetQuestions).toSelf()
container.bind(SubmitAnswer).toSelf()
container.bind(GetLeaderboard).toSelf()

export default container
