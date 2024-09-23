import {Quiz} from "../models/quiz";

export default interface QuizRepository {
    findAll(): Promise<Quiz[]>;
}
