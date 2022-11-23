import { useEffect, useRef, useState, useCallback } from 'react';
import { Container } from 'react-bootstrap';
import Aside from '../components/Aside';
import Chat from '../components/Chat';

const Main = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const toggleHamburger = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  useEffect(() => {
    const handleClick = () => {
      toggleHamburger();
    };
    const element = ref.current;

    element.addEventListener('click', handleClick);

    return () => {
      element.removeEventListener('click', handleClick);
    };
  }, []);

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
    <Container
      style={{ height: '100vh' }}
      className="bg-primary d-flex flex-column justify-content-center align-items-center">
      <div className="wrapper d-flex flex-row position-relative">
        <div
          ref={ref}
          onClick={toggleHamburger}
          className={`overlay${isOpen && width < 768 ? ' active' : ''}`}></div>
        <Aside isOpen={isOpen} width={width} toggle={toggleHamburger} />
        <Chat isOpen={isOpen} toggle={toggleHamburger} />
      </div>
    </Container>
  );
};

export default Main;
