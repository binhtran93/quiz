import React, {useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Container} from "react-bootstrap";
import UserInput from "./JoinQuiz/UserInput";
import QuizInput from "./JoinQuiz/QuizInput";
import { socket } from './socket';

function App() {
    useEffect(() => {
        function onConnect() {
            console.log('Connected!');
        }

        function onDisconnect() {
            console.log('disconnected!');
        }

        function onFooEvent(value: any) {
            console.log(value);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('foo', onFooEvent);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('foo', onFooEvent);
        };
    }, []);

  return (
      <Container className="mt-lg-5">
          <h2>Join a Quiz</h2>
          <Form>
              <Form.Group className="mb-3">
                  <UserInput />
              </Form.Group>
              <Form.Group className="mb-3">
                  <QuizInput />
              </Form.Group>
              <Button variant="primary" type="submit">
                  Submit
              </Button>
          </Form>
      </Container>
  );
}

export default App;
