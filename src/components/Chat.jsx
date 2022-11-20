import React from 'react';
import { useSelector } from 'react-redux';
import Messages from './FriendChatBlock';
import InputArea from './InputAreaBlock';

const Chat = () => {
  const { user } = useSelector((state) => state.chats);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{user?.displayName}</span>
      </div>
      <Messages />
      <InputArea />
    </div>
  );
};

export default Chat;
