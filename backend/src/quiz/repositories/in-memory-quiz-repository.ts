import {Quiz} from "../models/quiz";
import { nanoid } from 'nanoid'
import {injectable} from "inversify";

@injectable()
export default class InMemoryQuizRepository {
    private quizzes: Quiz[];

    constructor() {
        this.quizzes = [
            {id: nanoid()},
            {id: nanoid()},
        ]
    }

    public findAll(): Promise<Quiz[]> {
        return Promise.resolve(this.quizzes);
    }
}
