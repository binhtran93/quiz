import React from 'react';
import {Container} from "react-bootstrap";
import JoinForm from "./join-quiz/JoinForm";

function App() {
  return (
      <Container className="mt-lg-5">
          <h2>Join a Quiz</h2>
          <JoinForm onSubmit={(data) => {
              console.log(data);
          }} />
      </Container>
  );
}

export default App;
