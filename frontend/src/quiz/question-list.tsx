import {useEffect, useState} from "react";
import {Question, Quiz} from "../types";
import Form from "react-bootstrap/Form";

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
            <h2>Quiz: ${quiz.name}</h2>
            {questions.map((question) => {
                return (
                    <div>
                        <h4>{question.text}</h4>
                        {question.options.map((option) => {
                            return (
                                <Form.Check
                                    type="radio"
                                    label={option}
                                />
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}