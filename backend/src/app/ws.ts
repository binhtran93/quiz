import {Server} from "socket.io";
import server from "./http";
import {createAdapter} from "@socket.io/redis-streams-adapter";
import redisClient from "../redis/client";
import container from "./container";
import UserSocketHandler from "../user/socket/user-socket-handler";

const origin = 'http://localhost:3000';
const io = new Server(server, {
    cors: {
        origin
    },
    adapter: createAdapter(redisClient)
});

io.on('connection', (socket) => {
    socket.on('join-quiz', (quizId: string) => {
        socket.join(quizId);
    });

    socket.on('leave-quiz', (quizId: string) => {
        socket.leave(quizId);
    });

    socket.on('submit-answer', async (params) => {
        const {userId, answerIndex, questionId, quizId} = params;

        const userSocketHandler = container.resolve(UserSocketHandler);
        await userSocketHandler.submitAnswer(userId, quizId, questionId, answerIndex);
    });
});

export default io;