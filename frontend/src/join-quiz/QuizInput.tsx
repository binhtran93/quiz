import {ChangeEvent, useEffect, useState} from "react";
import {Form} from "react-bootstrap";
import {Quiz} from "../types";

type QuizInputProps = {
    onChange: (quiz: Quiz) => void;
}

export default function QuizInput(props: QuizInputProps) {
    const {onChange} = props;
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);

    useEffect(() => {
        async function fetchQuizzes() {
            const res = await fetch('http://localhost:5000/api/v1/quizzes');

            const quizzes = await res.json();
            setQuizzes(quizzes);

            if (quizzes.length > 0) {
                onChange(quizzes[0]);
            }
        }

        fetchQuizzes();
    }, []);

    const selectQuiz = (e: ChangeEvent<HTMLSelectElement>) => {
        const quiz = quizzes.find((quiz) => quiz.id === e.target.value);
        if (quiz !== undefined) {
            onChange(quiz);
        }
    }

    return (
        <Form.Group className="mb-3">
            <Form.Label>Select Quiz</Form.Label>
                <Form.Select aria-label="Default select example" onChange={selectQuiz}>
                    {quizzes.map((quiz) => (
                        <option key={quiz.id} value={quiz.id}>{quiz.name}</option>
                    ))}
            </Form.Select>
        </Form.Group>
    );
}