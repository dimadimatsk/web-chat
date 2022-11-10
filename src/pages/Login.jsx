import React from 'react';
import Sign from './Sign';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLog = (email, password) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(setUser({ email: user.email, userId: user.uid, token: user.accessToken }));
        navigate('/chat');
      })
      .catch(console.error);
  };

  return <Sign title={'LOG'} handleClick={handleLog} />;
};

export default Login;
