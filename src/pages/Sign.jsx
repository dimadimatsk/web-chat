import React, { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Sign = ({ title, handleClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Container
      style={{
        height: window.innerHeight,
      }}
      className="h-full d-flex flex-column justify-content-center align-items-center">
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="mx-auto">ChatME</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-3"
            placeholder="Enter email"
            type="email"
          />
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-3"
            placeholder="Password"
            type="password"
          />
          <div className="d-flex justify-content-between align-items-center mt-3 pl-3 pr-3">
            <div>
              Have an account? <Link to="/login">Login!</Link>
            </div>
            <Button onClick={() => handleClick(email, password)} variant="outline-dark">
              {title}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};
export default Sign;
