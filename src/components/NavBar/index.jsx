import React from 'react';
import styles from './NavBar.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { logoutUser } from '../../redux/slices/userSlice';
import { auth } from '../../firebase';

const NavBar = () => {
  const currentUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOut = () => {
    signOut(auth);
    dispatch(logoutUser());
    navigate('/login');
  };
  return (
    <div className={styles.navbar}>
      <span className={styles.logo}>ChatME</span>
      <div className={styles.user}>
        <img className={styles.avatar} src={currentUser.photoURL} alt="avatar" />
        <span>{currentUser.displayName}</span>
        <button onClick={logOut} className={styles.logout}>
          QUIT
        </button>
      </div>
    </div>
  );
};

export default NavBar;
