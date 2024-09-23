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
            <h2 className="mb-4">{quiz.name}</h2>
            {questions.map((question) => {
                return (
                    <div className="mb-4" key={question.id}>
                        <h4>{question.text}</h4>
                        {question.options.map((option) => {
                            return (
                                <Form.Check
                                    key={option}
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