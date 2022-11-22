import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../firebase';
import Message from '../MessageBlock';
import styles from './FriendChatBlock.module.scss';

const FriendChatBlock = () => {
  const [messages, setMessages] = useState([]);
  const { chatId } = useSelector((state) => state.chats);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'chats', chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unsub();
    };
  }, [chatId]);

  return (
    <div className={styles.messages}>
      {messages?.map((msg) => (
        <Message key={msg.id} message={msg} />
      ))}
    </div>
  );
};

export default FriendChatBlock;
