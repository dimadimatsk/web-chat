import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import Search from './SearchBlock';
import Conversations from './ConversationsBlock';

const Aside = ({ isOpen, toggle }) => {
  const getWidth = () =>
    window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  let [width, setWidth] = useState(getWidth());

  useEffect(() => {
    const resizeListener = () => {
      setWidth(getWidth());
    };

    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

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
          <Search />
          <Conversations />
        </div>
      )}
    </>
  );
};

export default Aside;
