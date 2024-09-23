import {Quiz} from "../models/quiz";
import {injectable} from "inversify";
import QuizRepository from "./quiz-repository";
import {Question} from "../models/question";

const quizId1 = '5auOzRcxikM2ebToYIPGx';
const quizId2 = 'aFrF5jNiu8nv2BbdigYZt';

const question1 = 'QTDi2_bniYD7Ugk0Qc2Lh';
const question2 = 'InBSs3HrRjh-mDzPwQ8LS';
const question3 = 'lfYL3s-3slK7Y0ilWlPQt';
const question4 = 'YeaoD4_JqGB9XZhzrbsAz';
const question5 = '_tOTgZBbB3VRCnpSozRBj';

@injectable()
export default class InMemoryQuizRepository implements QuizRepository{
    private readonly quizzes: Quiz[];
    private questions: Question[];

    constructor() {
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
