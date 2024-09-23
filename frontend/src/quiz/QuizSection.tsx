import {Col, Row} from "react-bootstrap";
import QuestionList from "./QuestionList";
import {Quiz} from "../types";
import Leaderboard from "./Leaderboard";

type QuestionSectionProps = {
    username: string;
    quiz: Quiz;
}

export default function QuizSection(props: QuestionSectionProps) {
    const {quiz, username} = props;

    return (
        <Row>
            <Col>
                <QuestionList username={username} quiz={quiz} />
            </Col>

            <Col>
                <Leaderboard />
            </Col>
        </Row>
    )
}