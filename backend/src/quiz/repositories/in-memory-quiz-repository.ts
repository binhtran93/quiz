import {Quiz} from "../models/quiz";
import { nanoid } from 'nanoid'
import {injectable} from "inversify";

@injectable()
export default class InMemoryQuizRepository {
    private quizzes: Quiz[];

    constructor() {
        this.quizzes = [
            {id: nanoid(), name: 'Quiz 1'},
            {id: nanoid(), name: 'Quiz 2'},
        ]
    }

    public findAll(): Promise<Quiz[]> {
        return Promise.resolve(this.quizzes);
    }
}
