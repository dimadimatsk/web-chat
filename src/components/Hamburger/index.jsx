import React from 'react';
import styles from './Hamburger.module.scss';

const Hamburger = ({ toggle, isOpen }) => {
  return (
    <div onClick={toggle} className={styles.hamburger}>
      <div
        className={`${styles.burger}`}
        style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0)' }}></div>
      <div
        className={`${styles.burger}`}
        style={{
          transform: isOpen ? 'translateX(100%)' : 'translateX(0)',
          opacity: isOpen ? 0 : 1,
        }}></div>
      <div
        className={`${styles.burger}`}
        style={{ transform: isOpen ? 'rotate(-45deg)' : 'rotate(0)' }}></div>
    </div>
  );
};

export default Hamburger;
