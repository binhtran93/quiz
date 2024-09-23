import express from 'express';
import http from 'http';
import {Server} from 'socket.io';
import {Container} from "inversify";
import "reflect-metadata";
import {TYPES} from "./injection";
import UserRepository from "../user/repository/user-repository";
import InMemoryUserRepository from "../user/repository/in-memory-user-repository";
import GetUsers from "../user/services/getUsers";
import configRoutes from "./router";
import GetQuizzes from "../quiz/services/get-quizzes";
import QuizRepository from "../quiz/repositories/quiz-repository";
import InMemoryQuizRepository from "../quiz/repositories/in-memory-quiz-repository";
import GetQuestions from "../quiz/services/get-questions";
import redisClient from "../redis/client";
import {createAdapter} from "@socket.io/redis-streams-adapter";
import SubmitAnswer from "../quiz/services/submit-answer";

const cors = require('cors');

// Config container
const container = new Container();
container.bind<UserRepository>(TYPES.UserRepository).to(InMemoryUserRepository);
container.bind<QuizRepository>(TYPES.QuizRepository).to(InMemoryQuizRepository);
container.bind(GetUsers).toSelf();
container.bind(GetQuizzes).toSelf();
container.bind(GetQuestions).toSelf();
container.bind(SubmitAnswer).toSelf();

// Create express app
const app = express();
const port = process.env.PORT || 5000;
const origin = 'http://localhost:3000';

const corsOptions = {
    origin,
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));

// Create socket io server
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin
    },
    adapter: createAdapter(redisClient)
});

configRoutes(app, container);

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

io.on('connection', (socket) => {
    socket.on('join-quiz', (quizId: string) => {
        socket.join(quizId);
    });

    socket.on('submit-answer', async (params) => {
        const {userId, answerIndex, questionId, quizId} = params;

        const submitAnswer = container.resolve(SubmitAnswer);
        await submitAnswer.execute(userId, quizId, questionId, answerIndex);
    });
});