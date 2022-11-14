import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { logoutUser } from '../redux/slices/userSlice';

const Chat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOut = () => {
    signOut(auth);
    dispatch(logoutUser());
    navigate('/login');
  };
  return <button onClick={logOut}>QUIT</button>;
};

export default Chat;
