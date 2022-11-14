import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const isLogged = useSelector((state) => state.user.userLogged);
  const [logged, setLogged] = useState(false);

  const ProtectedRoute = ({ children }) => {
    return isLogged ? children : <Navigate to="/login" />;
  };

  useEffect(() => {
    setLogged(isLogged);
  }, [isLogged]);

  return (
    <Routes>
      <Route
        index
        element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={isLogged ? <Navigate to={'/'} /> : <Login />} />
      <Route path="/register" element={isLogged ? <Navigate to={'/'} /> : <Register />} />
    </Routes>
  );
}

export default App;
