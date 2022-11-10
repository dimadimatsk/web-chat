import Sign from './Sign';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleReg = (email, password) => {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(setUser({ email: user.email, userId: user.uid, token: user.accessToken }));
        navigate('/chat');
      })
      .catch(console.error);
  };

  return <Sign title={'REG'} handleClick={handleReg} />;
};

export default Register;
