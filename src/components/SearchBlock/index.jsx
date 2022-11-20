import React, { useState, useEffect, useRef } from 'react';
import styles from './SearchBlock.module.css';
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setChat } from '../../redux/slices/chatSlice';

const SearchBlock = () => {
  const [searchUserName, setSearchUserName] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [currentUser, setCurrentUser] = useState(useSelector((state) => state.user));
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const onClickClear = () => {
    setSearchUserName('');
    setUser(null);
    inputRef.current.focus();
  };

  const handleSearch = async () => {
    const q = query(collection(db, 'users'), where('displayName', '==', searchUserName));

    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setUser('notfound');
      } else {
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
      }
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  const handleKeyDown = (e) => {
    e.code === 'Enter' && handleSearch();
  };

  const handleSelect = async () => {
    const chatId =
      currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;

    try {
      const response = await getDoc(doc(db, 'chats', chatId));
      console.log(response);

      if (!response.exists()) {
        await setDoc(doc(db, 'chats', chatId), { messages: [] });
        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [chatId + '.userInfo']: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [chatId + '.date']: serverTimestamp(),
        });
        await updateDoc(doc(db, 'userChats', user.uid), {
          [chatId + '.userInfo']: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [chatId + '.date']: serverTimestamp(),
        });
      }
      dispatch(setChat({ chatId: chatId, user: user }));
    } catch (error) {
      setError(true);
      console.log(error);
    }
    setUser(null);
    setSearchUserName('');
  };

  return (
    <div className={styles.search}>
      <input
        ref={inputRef}
        placeholder="Search your conversation..."
        value={searchUserName}
        onKeyDown={handleKeyDown}
        onChange={(e) => setSearchUserName(e.target.value)}
        className={styles.input}
        type="search"
      />
      {searchUserName && (
        <svg
          className={styles.clear}
          onClick={onClickClear}
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z"
            fill="#fff"
          />
          <path d="M0 0h48v48H0z" fill="none" />
        </svg>
      )}
      {error && <div className={styles.friends}>not found</div>}
      {user === 'notfound' && (
        <div className={styles.friends}>
          <div>
            <span className={styles.name}>User not found 😢</span>
          </div>
        </div>
      )}
      {user !== null && user !== 'notfound' && (
        <div className={styles.friends} onClick={handleSelect}>
          <img className={styles.avatar} src={user.photoURL} alt="avatar" />
          <div>
            <span className={styles.name}>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBlock;
