import Form from "react-bootstrap/Form";
import UserInput from "./UserInput";
import QuizInput from "./QuizInput";
import Button from "react-bootstrap/Button";
import {Quiz} from "../types";
import React from "react";

type JoinFormProps = {
    setUsername: (username: string) => void;
    setQuiz: (quiz: Quiz) => void;
    joinQuiz: () => void;
}

export default function JoinForm(props: JoinFormProps) {
    const {setUsername, joinQuiz, setQuiz} = props;

    return (
        <>
            <h2>Join a Quiz</h2>
            <Form>
                <Form.Group className="mb-3">
                    <UserInput onChange={username => setUsername(username)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <QuizInput onChange={quiz => setQuiz(quiz)} />
                </Form.Group>
                <Button variant="primary" type="button" onClick={joinQuiz}>
                    Submit
                </Button>
            </Form>
        </>
    );
}