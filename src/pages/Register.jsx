import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { auth, storage, db } from '../firebase';
import React, { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import addAvatar from '../assets/images/add-avatar.png';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, 'avatars/' + displayName);
      const task = uploadBytesResumable(storageRef, file);

      task.on(
        'state_changed',
        (snap) => {},
        (error) => {
          setError(true);
        },
        () => {
          getDownloadURL(task.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(user, {
              displayName: displayName,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, 'users', user.uid), {
              userId: user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
          });
        },
      );

      // dispatch(
      //   setUser({
      //     email: user.email,
      //     userId: user.uid,
      //     token: user.accessToken,
      //     nickName: user.displayName,
      //   }),
      // );
      navigate('/chat');
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <Container
      style={{
        height: '100vh',
      }}
      className="h-full d-flex flex-column justify-content-center align-items-center">
      <Card style={{ minWidth: 325 }} className="p-3">
        <h2 className="mx-auto">ChatME</h2>
        <p className="mx-auto">Login</p>
        <Form onSubmit={handleSubmit} className="d-flex gap-3 flex-column">
          <Form.Control className="" placeholder="Nickname" type="text" />
          <Form.Control className="" placeholder="Enter email" type="email" />
          <Form.Control className="" placeholder="Password" type="password" />
          <Form.Control className="d-none" id="file" type="file" />
          <Form.Label className="addAvatar mb-0 d-flex gap-2 align-items-center" htmlFor="file">
            <img src={addAvatar} alt="add avatar" />
            <p className="mb-0">Add an avatar</p>
          </Form.Label>
          <Button type="submit" variant="outline-dark">
            Registration
          </Button>
          {error && <span className="align-self-center">Opps... Something wrong :(</span>}
          <p className="align-self-center">
            Have an account? <Link to="/login">Login!</Link>
          </p>
        </Form>
      </Card>
    </Container>
  );
};

export default Register;
