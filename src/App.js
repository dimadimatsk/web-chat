import { Routes, Route } from 'react-router-dom';
import { useIsAuth } from './hooks/useIsAuth';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const { isAuth, email } = useIsAuth();

  return (
    <Routes>
      <Route path="/chat" element={isAuth ? <Chat email={email} /> : <>МИМО</>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={isAuth ? <Chat email={email} /> : <Login />} />
    </Routes>
  );
}

export default App;
