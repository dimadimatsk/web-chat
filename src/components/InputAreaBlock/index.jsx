import React, { useState } from 'react';
import styles from './InputAreaBlock.module.css';
import addImgIcon from '../../assets/images/addimg.svg';
import { useSelector } from 'react-redux';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const InputAreaBlock = () => {
  const { chatId, user } = useSelector((state) => state.chats);
  const { uid } = useSelector((state) => state.user);
  const [text, setText] = useState('');
  const [img, setImg] = useState(null);

  const handleSend = async (e) => {
    if ((e.type === 'click' || (e.type === 'keydown' && e.key === 'Enter')) && (text || img)) {
      if (img) {
        const storageRef = ref(storage, `msg/${uuid()}`);
        const uploadTask = uploadBytesResumable(storageRef, img);
        setText('');
        setImg(null);

        uploadTask.on(
          'state_changed',
          () => {},
          (error) => {},
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              await updateDoc(doc(db, 'chats', chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text,
                  senderId: uid,
                  date: Timestamp.now(),
                  img: downloadURL,
                }),
              });
            });
          },
        );
        await updateDoc(doc(db, 'userChats', uid), {
          [chatId + '.lastMessage']: {
            text: 'Picture',
          },
          [chatId + '.date']: serverTimestamp(),
        });

        await updateDoc(doc(db, 'userChats', user.uid), {
          [chatId + '.lastMessage']: {
            text: 'Picture',
          },
          [chatId + '.date']: serverTimestamp(),
        });
      } else {
        setText('');
        setImg(null);
        await updateDoc(doc(db, 'chats', chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: uid,
            date: Timestamp.now(),
          }),
        });
        await updateDoc(doc(db, 'userChats', uid), {
          [chatId + '.date']: serverTimestamp(),
          [chatId + '.lastMessage']: {
            text,
          },
        });

        await updateDoc(doc(db, 'userChats', user.uid), {
          [chatId + '.date']: serverTimestamp(),
          [chatId + '.lastMessage']: {
            text,
          },
        });
      }
    }
  };

  return (
    <>
      {chatId === 'null' ? (
        <div className={styles.empty}>Find a user to star conversation 👀</div>
      ) : (
        <div className={styles.input}>
          <input
            className={styles.inputText}
            type="text"
            placeholder="test"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => handleSend(e)}
          />
          <div className={styles.send}>
            <input
              type="file"
              style={{ display: 'none' }}
              id="chatFile"
              onChange={(e) => setImg(e.target.files[0])}
            />
            <label style={{ display: 'flex' }} htmlFor="chatFile">
              <img className={styles.icon} src={addImgIcon} alt="add photo" />
            </label>
            <button onClick={(e) => handleSend(e)} className={styles.sendBtn}>
              send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default InputAreaBlock;
