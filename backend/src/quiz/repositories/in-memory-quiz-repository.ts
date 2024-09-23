import {Quiz} from "../models/quiz";
import { nanoid } from 'nanoid'
import {injectable} from "inversify";
import QuizRepository from "./quiz-repository";
import {Question} from "../models/question";

@injectable()
export default class InMemoryQuizRepository implements QuizRepository{
    private quizzes: Quiz[];
    private questions: Question[];

    constructor() {
        const quizId1 = nanoid();
        const quizId2 = nanoid();

        const question1 = nanoid();
        const question2 = nanoid();
        const question3 = nanoid();
        const question4 = nanoid();
        const question5 = nanoid();

        this.quizzes = [
            {id: quizId1, name: 'Quiz 1', questions: [question1, question2]},
            {id: quizId2, name: 'Quiz 2', questions: [question3, question4, question5]},
        ]

        this.questions = [
            {
                id: question1,
                text: 'What is the capital of France?',
                options: ['Paris', 'Berlin', 'Madrid', 'Rome'],
                correctAnswerIndex: 0, // Paris
            },
            {
                id: question2,
                text: 'Which planet is known as the Red Planet?',
                options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
                correctAnswerIndex: 1, // Mars
            },
            {
                id: question3,
                text: 'Which element has the chemical symbol O?',
                options: ['Oxygen', 'Gold', 'Hydrogen', 'Nitrogen'],
                correctAnswerIndex: 0, // Oxygen
            },
            {
                id: question4,
                text: 'Who wrote the play "Romeo and Juliet"?',
                options: ['William Shakespeare', 'Mark Twain', 'Charles Dickens', 'Leo Tolstoy'],
                correctAnswerIndex: 0, // William Shakespeare
            },
            {
                id: question5,
                text: 'What is the largest mammal?',
                options: ['Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
                correctAnswerIndex: 1, // Blue Whale
            },
        ]
    }

    public findAll(): Promise<Quiz[]> {
        return Promise.resolve(this.quizzes);
    }

    getQuestions(quizId: string): Promise<Question[]> {
        const quiz = this.quizzes.find(quiz => (quizId === quiz.id));
        if (!quiz) {
            return Promise.resolve([]);
        }

        return Promise.resolve(this.questions.filter((question) => quiz.questions.includes(question.id)));
    }
}
