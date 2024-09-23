import Form from "react-bootstrap/Form";
import UserInput from "./UserInput";
import QuizInput from "./QuizInput";
import Button from "react-bootstrap/Button";
import {Quiz, User} from "../types";
import React from "react";

type JoinFormProps = {
    setUser: (user: User) => void;
    setQuiz: (quiz: Quiz) => void;
    joinQuiz: () => void;
}

export default function JoinForm(props: JoinFormProps) {
    const {setUser, joinQuiz, setQuiz} = props;

    return (
        <>
            <h2>Join a Quiz</h2>
            <Form>
                <Form.Group className="mb-3">
                    <UserInput onChange={user => setUser(user)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <QuizInput onChange={quiz => setQuiz(quiz)} />
                </Form.Group>
                <Button variant="primary" type="button" onClick={joinQuiz}>
                    Join
                </Button>
            </Form>
        </>
    );
}