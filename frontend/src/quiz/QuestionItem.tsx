import {ChangeEvent, FormEvent, useState} from "react";
import {Question, User} from "../types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import socket from '../socket';

type QuestionItemProps = {
    quizId: string;
    question: Question;
    user: User;
}

export default function QuestionItem(props: QuestionItemProps) {
    const {user, question, quizId} = props;
    const [answer, setAnswer] = useState<number>(-1);

    const submitAnswer = (e: FormEvent<HTMLButtonElement>) => {
        if (answer === -1) {
            alert('Please select an answer');
            return;
        }

        socket.emit('submit-answer', {userId: user.id, answerIndex: answer, questionId: question.id, quizId});
    }

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
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setAnswer(parseInt(e.target.value))
                        }}
                    />
                )
            })}

            <Button className="mt-2" variant="primary" type="button" onClick={submitAnswer}>
                Submit
            </Button>
        </Form>
    )
}