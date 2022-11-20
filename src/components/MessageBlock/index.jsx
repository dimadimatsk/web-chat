import React, { useEffect, useRef } from 'react';
import styles from './MessageBlock.module.css';
import { useSelector } from 'react-redux';

const MessageBlock = ({ message }) => {
  const currentUser = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.chats);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView(false, { behavior: 'smooth' });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`${styles.message} ${message.senderId === currentUser.uid && `${styles.own}`}`}>
      <div className={styles.messageInfo}>
        <img
          className={styles.avatar}
          src={message.senderId === currentUser.uid ? currentUser.photoURL : user.photoURL}
          alt="avatar"
        />
        <span className={styles.under}>
          {new Date(message.date.seconds * 1000).toLocaleDateString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
      <div className={styles.messageContent}>
        {message.text && <p className={styles.text}>{message.text}</p>}
        {message.img && <img className={styles.sendImg} src={message.img} alt="img" />}
      </div>
    </div>
  );
};

export default MessageBlock;
