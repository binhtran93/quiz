import React, {useState} from 'react';
import {Container} from "react-bootstrap";
import JoinForm from "./join-quiz/JoinForm";
import {Quiz, User} from "./types";
import QuizSection from "./quiz/QuizSection";

type State = 'lobby' | 'joined';

function App() {
    const [state, setState] = useState<State>('lobby')
    const [user, setUser] = useState<User>();
    const [quiz, setQuiz] = useState<Quiz>();

    const joinQuiz = () => {
        setState('joined');
    }

    return (
        <Container className="mt-lg-5">
            {state === 'lobby' && (
                <JoinForm setQuiz={setQuiz} setUser={setUser} joinQuiz={joinQuiz} />
            )}

            {state === 'joined' && quiz !== undefined && user !== undefined && (
                <QuizSection user={user} quiz={quiz} />
            )}
        </Container>
    );
}

export default App;
