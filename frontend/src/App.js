import {Col, Container, Form, Row} from "react-bootstrap";

function App() {
  return (
    <Container className="mt-lg-5">
      <Row className="justify-content-center align-items-center">
        <Col>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="input" placeholder="Enter username" />
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
