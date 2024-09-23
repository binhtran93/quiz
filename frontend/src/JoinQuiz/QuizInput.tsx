import {useEffect, useState} from "react";
import {Form} from "react-bootstrap";
import {Quiz, User} from "../types";

export default function QuizInput() {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    useEffect(() => {
        async function fetchQuizzes() {
            const res = await fetch('http://localhost:5000/api/v1/quizzes');

            const quizzes = await res.json();
            setQuizzes(quizzes);
        }

        fetchQuizzes();
    }, []);

    return (
        <Form.Group className="mb-3">
            <Form.Label>Select Quiz</Form.Label>
                <Form.Select aria-label="Default select example">
                    {quizzes.map((quiz) => (
                        <option value={quiz.id}>{quiz.name}</option>
                    ))}
            </Form.Select>
        </Form.Group>
    );
}