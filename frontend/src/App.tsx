import React, {useState} from 'react';
import {Container} from "react-bootstrap";
import JoinForm from "./join-quiz/JoinForm";
import QuestionList from "./quiz/question-list";
import {Question, Quiz} from "./types";

type State = 'lobby' | 'joined';

function App() {
    const [state, setState] = useState<State>('lobby')
    const [username, setUsername] = useState<string>('');
    const [quiz, setQuiz] = useState<Quiz>();

    const joinQuiz = () => {
        setState('joined');
    }

    return (
        <Container className="mt-lg-5">
            {state === 'lobby' && (
                <JoinForm setQuiz={setQuiz} setUsername={setUsername} joinQuiz={joinQuiz} />
            )}

            {state === 'joined' && quiz !== undefined && (
                <QuestionList username={username} quiz={quiz} />
            )}
        </Container>
    );
}

export default App;
