import React, {useEffect, useState} from "react";
import {Question, Quiz, User} from "../types";
import socket from "../socket";
import QuestionItem from "./QuestionItem";

type QuestionListProps = {
    user: User;
    quiz: Quiz;
}

export default function QuestionList(props: QuestionListProps) {
    const {quiz, user} = props;
    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        async function fetchQuestions() {
            const res = await fetch(`http://localhost:5000/api/v1/quizzes/${quiz.id}/questions`);

            const questions = await res.json();
            setQuestions(questions);
        }

        fetchQuestions();
    }, []);

    useEffect(() => {
        socket.emit('join-quiz', quiz.id);
    }, []);

    return (
        <div>
            <h2 className="mb-4">{quiz.name} ({user.username})</h2>
            {questions.map((question) => {
                return (
                    <QuestionItem key={question.id} question={question} user={user} quizId={quiz.id} />
                )
            })}
        </div>
    )
}