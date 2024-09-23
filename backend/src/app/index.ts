import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
const cors = require('cors');
import {Container} from "inversify";
import "reflect-metadata";
import {TYPES} from "./injection";
import UserRepository from "../user/repository/user-repository";
import InMemoryUserRepository from "../user/repository/in-memory-user-repository";
import GetUsers from "../user/services/getUsers";
import initRoutes from "./router";
import GetQuizzes from "../quiz/services/get-quizzes";
import QuizRepository from "../quiz/repositories/quiz-repository";
import InMemoryQuizRepository from "../quiz/repositories/in-memory-quiz-repository";

// Create express app
const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));

// Create socket io server
const server = http.createServer(app);
const io = new Server(server);

// Binding
const container = new Container();
container.bind<UserRepository>(TYPES.UserRepository).to(InMemoryUserRepository);
container.bind<QuizRepository>(TYPES.QuizRepository).to(InMemoryQuizRepository);
container.bind(GetUsers).toSelf();
container.bind(GetQuizzes).toSelf();

initRoutes(app, container);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

io.on('connection', (socket) => {
    console.log('a user connected');
});