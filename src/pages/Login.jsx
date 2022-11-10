import React from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

const Login = () => {
  return (
    <Container
      style={{
        height: window.innerHeight,
      }}
      className="h-full d-flex flex-column justify-content-center align-items-center">
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="mx-auto">ChatME</h2>
        <Form className="d-flex flex-column">
          <Form.Control className="mt-3" placeholder="Enter email" type="email" />
          <Form.Control className="mt-3" placeholder="Password" type="password" />
          <div className="d-flex justify-content-between align-items-center mt-3 pl-3 pr-3">
            <div>
              Haven't account yet? <NavLink to="/register">Register!</NavLink>
            </div>
            <Button variant="outline-dark">LOGIN</Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
