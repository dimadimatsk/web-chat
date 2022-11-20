import React, { useEffect, useState } from 'react';
import styles from './ConversationsBlock.module.css';
import { onSnapshot } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useSelector, useDispatch } from 'react-redux';
import { setChat } from '../../redux/slices/chatSlice';

const ConversationsBlock = () => {
  const [conversations, setConversations] = useState([]);
  const [currentUser, setCurrentUser] = useState(useSelector((state) => state.user));

  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
      !doc.metadata.hasPendingWrites && setConversations(doc.data());
    });
    return () => unsub();
  }, [currentUser.uid]);

  const handleClickUser = ({ chatId, user }) => {
    dispatch(setChat({ chatId, user }));
  };

  return (
    <div>
      {Object.entries(conversations)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            key={chat[0]}
            className={styles.friends}
            onClick={() =>
              handleClickUser({
                // date: Math.floor(new Date('2012.08.10').getTime() / 1000),
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
        ))}
    </div>
  );
};

export default ConversationsBlock;
