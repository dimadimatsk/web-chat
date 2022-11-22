import React from 'react';
import { useSelector } from 'react-redux';
import Messages from './FriendChatBlock';
import Hamburger from './Hamburger';
import InputArea from './InputAreaBlock';

const Chat = ({ toggle, isOpen }) => {
  const { user } = useSelector((state) => state.chats);

  return (
    <div className="chat">
      <div className="chatInfo">
        <Hamburger toggle={toggle} isOpen={isOpen} className="hamburger" />
        <span>{user?.displayName}</span>
      </div>
      <Messages />
      <InputArea />
    </div>
  );
};

export default Chat;
