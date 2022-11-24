import React, { useEffect, useRef, useState } from 'react';
import styles from './MessageBlock.module.scss';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const MessageBlock = ({ message }) => {
  const currentUser = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.chats);
  const ref = useRef();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    ref.current?.scrollIntoView(false, { behavior: 'smooth' });
  }, [message]);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleShow = () => {
    setShowModal(true);
  };

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
        {message.img && (
          <img
            style={{ cursor: 'pointer' }}
            onClick={handleShow}
            className={styles.sendImg}
            src={message.img}
            alt="img"
          />
        )}
      </div>

      <Modal
        onHide={handleClose}
        show={showModal}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Body style={{ position: 'relative', paddingTop: '30px', maxHeight: '80vh' }}>
          <svg
            className={styles.close}
            onClick={handleClose}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="#000">
            <path
              fill="#a2a2a2"
              d="M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z"
            />
          </svg>
          <img
            style={{ width: '-webkit-fill-available', maxHeight: 'calc(80vh - 45px)' }}
            onClick={handleShow}
            className={styles.sendImg}
            src={message.img}
            alt="img"
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MessageBlock;
