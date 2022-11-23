import React from 'react';
import NavBar from './NavBar';
import Search from './SearchBlock';
import Conversations from './ConversationsBlock';

const Aside = ({ isOpen, toggle, width }) => {

  return (
    <>
      {width < 768 ? (
        <div className="aside" style={{ left: `${isOpen ? '0' : '-100%'}` }}>
          <NavBar />
          <Search toggle={toggle} />
          <Conversations toggle={toggle} />
        </div>
      ) : (
        <div className="aside">
          <NavBar />
          <Search toggle={toggle} />
          <Conversations toggle={toggle} />
        </div>
      )}
    </>
  );
};

export default Aside;
