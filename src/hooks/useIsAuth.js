import { useSelector } from 'react-redux';

export const useIsAuth = () => {
  const { email, userId, token } = useSelector((state) => state.user);
  return {
    isAuth: !!email,
    email,
    userId,
    token,
  };
};
