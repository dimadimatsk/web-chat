import React, { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      dispatch(
        setUser({
          userLogged: !!user.email,
          displayName: user.displayName,
          uid: user.uid,
          email: user.email,
          accessToken: user.accessToken,
          photoURL: user.photoURL,
        }),
      );
      navigate('/');
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  return (
    <Container
      style={{
        height: '100vh',
      }}
      className="h-full d-flex flex-column justify-content-center align-items-center">
      <Card style={{ minWidth: '320px' }} className="p-3">
        <h2 className="mx-auto">ChatME</h2>
        <p className="mx-auto">Sign In</p>
        <Form onSubmit={handleSubmit} className="d-flex gap-3 flex-column">
          <Form.Control className="" placeholder="Enter email" type="email" />
          <Form.Control className="" placeholder="Password" type="password" />
          <Button type="submit" variant="outline-dark">
            Sign In
          </Button>
          {error && <span className="align-self-center">Opps... Something wrong :(</span>}
          <p className="align-self-center">
            Haven't account yet? <Link to="/register">Sign Up!</Link>
          </p>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
