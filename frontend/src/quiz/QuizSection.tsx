import {Col, Row} from "react-bootstrap";
import QuestionList from "./QuestionList";
import {Quiz, User} from "../types";
import Leaderboard from "./Leaderboard";
import {useEffect} from "react";
import socket from "../socket";

type QuestionSectionProps = {
    user: User;
    quiz: Quiz;
}

export default function QuizSection(props: QuestionSectionProps) {
    const {quiz, user} = props;

    useEffect(() => {
        socket.emit('join-quiz', quiz.id);

        return () => {
            socket.emit('leave-quiz', quiz.id);
        }
    }, []);

    return (
        <Row>
            <Col>
                <QuestionList user={user} quiz={quiz} />
            </Col>

            <Col>
                <Leaderboard quizId={quiz.id} />
            </Col>
        </Row>
    )
}