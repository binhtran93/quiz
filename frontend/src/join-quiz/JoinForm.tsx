import Form from "react-bootstrap/Form";
import {FormEvent, useState} from "react";
import UserInput from "./UserInput";
import QuizInput from "./QuizInput";
import Button from "react-bootstrap/Button";
import {Quiz} from "../types";

type JoinFormProps = {
    onSubmit: (data: {username: string, quiz: Quiz}) => void;
}

export default function JoinForm(props: JoinFormProps) {
    const {onSubmit} = props;
    const [username, setUsername] = useState<string>('');
    const [quiz, setQuiz] = useState<Quiz>();

    const handleClick = (e: FormEvent<HTMLButtonElement>) => {
        console.log(username, quiz);
        if (!username && quiz !== undefined) {
            onSubmit({username, quiz});
        }
    }

    return (
        <Form>
            <Form.Group className="mb-3">
                <UserInput onChange={username => setUsername(username)}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <QuizInput onChange={quiz => setQuiz(quiz)} />
            </Form.Group>
            <Button variant="primary" type="button" onClick={handleClick}>
                Submit
            </Button>
        </Form>
    );
}