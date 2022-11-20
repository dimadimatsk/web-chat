import { Container } from 'react-bootstrap';
import Aside from '../components/Aside';
import Chat from '../components/Chat';

const Main = () => {
  return (
    <Container
      style={{ height: '100vh' }}
      className="bg-primary d-flex flex-column justify-content-center align-items-center">
      <div className="wrapper d-flex flex-row">
        <Aside />
        <Chat />
      </div>
    </Container>
  );
};

export default Main;
