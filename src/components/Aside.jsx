import React from 'react';
import NavBar from './NavBar';
import Search from './SearchBlock';
import Conversations from './ConversationsBlock';

const Aside = () => {
  return (
    <div className="aside">
      <NavBar />
      <Search />
      <Conversations />
    </div>
  );
};

export default Aside;
