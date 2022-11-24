import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';

function App() {
  const isLogged = useSelector((state) => state.user.userLogged);

  const ProtectedRoute = ({ children }) => {
    return isLogged ? children : <Navigate to="/login" />;
  };

  useEffect(() => {}, [isLogged]);

  return (
    <Container
      style={{ height: '100%' }}
      className="bg-primary d-flex flex-column justify-content-center align-items-center">
      <Routes>
        <Route
          index
          element={
            <ProtectedRoute>
              <Main />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={isLogged ? <Navigate to={'/'} /> : <Login />} />
        <Route path="/register" element={isLogged ? <Navigate to={'/'} /> : <Register />} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
