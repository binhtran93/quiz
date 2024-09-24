import { Server } from 'socket.io'
import server from './http'
import { createAdapter } from '@socket.io/redis-streams-adapter'
import redisClient from '../redis/client'
import container from './container'
import UserSocketHandler from '../user/socket/user-socket-handler'
import { SOCKET_EVENTS } from './configs'

const origin = 'http://localhost:3000'
const io = new Server(server, {
  cors: {
    origin
  },
  adapter: createAdapter(redisClient)
})

io.on('connection', (socket) => {
  socket.on(SOCKET_EVENTS.JoinQuiz, (quizId: string) => {
    socket.join(quizId)
  })

  socket.on(SOCKET_EVENTS.LeaveQuiz, (quizId: string) => {
    socket.leave(quizId)
  })

  socket.on(SOCKET_EVENTS.SubmitAnswer, async (params) => {
    const { userId, answerIndex, questionId, quizId } = params

    const userSocketHandler = container.resolve(UserSocketHandler)
    await userSocketHandler.submitAnswer(userId, quizId, questionId, answerIndex)
  })
})

export default io
