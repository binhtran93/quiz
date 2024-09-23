import React, {useEffect, useState} from "react";
import {Question, Quiz} from "../types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

type QuestionListProps = {
    username: string;
    quiz: Quiz;
}

export default function QuestionList(props: QuestionListProps) {
    const {quiz, username} = props;
    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        async function fetchQuestions() {
            const res = await fetch(`http://localhost:5000/api/v1/quizzes/${quiz.id}/questions`);

            const questions = await res.json();
            setQuestions(questions);
        }

        fetchQuestions();
    }, []);

    return (

        <div>
            <h2 className="mb-4">{quiz.name}</h2>
            {questions.map((question) => {
                return (
                    <Form className="mb-4" key={question.id}>
                        <h4>{question.text}</h4>
                        {question.options.map((option, index) => {
                            return (
                                <Form.Check
                                    key={option}
                                    className="mb-1"
                                    type="radio"
                                    label={option}
                                    value={index}
                                    name="answer"
                                />
                            )
                        })}
                        <Button className="mt-2" variant="primary" type="button" onClick={() => {}}>
                            Submit
                        </Button>
                    </Form>
                )
            })}
        </div>
    )
}