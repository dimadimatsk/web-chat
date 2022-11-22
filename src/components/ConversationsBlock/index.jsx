import React, { useEffect, useState } from 'react';
import styles from './ConversationsBlock.module.scss';
import { onSnapshot } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useSelector, useDispatch } from 'react-redux';
import { setChat } from '../../redux/slices/chatSlice';
import { Spinner } from 'react-bootstrap';

const ConversationsBlock = ({ toggle }) => {
  const [conversations, setConversations] = useState([]);
  const [currentUser, setCurrentUser] = useState(useSelector((state) => state.user));
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
      !doc.metadata.hasPendingWrites && setConversations(doc.data());
      setIsLoading(false);
    });
    return () => unsub();
  }, [currentUser.uid]);

  const handleClickUser = ({ chatId, user }) => {
    dispatch(setChat({ chatId, user }));
    toggle();
  };

  return (
    <div style={{ position: 'relative' }}>
      {!isLoading ? (
        Object.entries(conversations)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <div
              key={chat[0]}
              className={styles.friends}
              onClick={() =>
                handleClickUser({
                  chatId:
                    currentUser.uid > chat[1].userInfo.uid
                      ? currentUser.uid + chat[1].userInfo.uid
                      : chat[1].userInfo.uid + currentUser.uid,
                  user: chat[1].userInfo,
                })
              }>
              <img className={styles.avatar} src={chat[1].userInfo.photoURL} alt="avatar" />
              <div className={styles.messages}>
                <span className={styles.name}>{chat[1].userInfo.displayName}</span>
                <p className={styles.lastMsg}>{chat[1].lastMessage?.text}</p>
              </div>
            </div>
          ))
      ) : (
        <Spinner className={styles.load} variant="light" animation="border" role="status"></Spinner>
      )}
    </div>
  );
};

export default ConversationsBlock;
