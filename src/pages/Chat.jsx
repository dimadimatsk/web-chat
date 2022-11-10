import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const Chat = ({ email }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOut = () => {
    dispatch(logoutUser());
    navigate('/');
  };
  return <button onClick={logOut}>{email}</button>;
};

export default Chat;
