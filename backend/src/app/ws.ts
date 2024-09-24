import {Server} from "socket.io";
import server from "./http";
import {createAdapter} from "@socket.io/redis-streams-adapter";
import redisClient from "../redis/client";
import container from "./container";
import SubmitAnswer from "../quiz/services/submit-answer";

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

    socket.on('submit-answer', async (params) => {
        const {userId, answerIndex, questionId, quizId} = params;

        const submitAnswer = container.resolve(SubmitAnswer);
        const isCorrect = await submitAnswer.execute(userId, quizId, questionId, answerIndex);
        if (isCorrect) {
            const leaderboard = await redisClient.zRangeWithScores(`leaderboard-${quizId}`, 0, 10, {REV: true});
            io.to(quizId).emit('leaderboard-updated', leaderboard);
        }
    });
});