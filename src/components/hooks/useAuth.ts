import { useContext } from 'react';
import easemApi from 'axios/easemApi';
import { useNavigate } from 'react-router-dom';
import { encrypt } from 'utils';

import { AuthContext, AuthContextUpdate } from 'store/authContext';

type ReturnType = {
  isAuthorized: () => boolean;
  checkAuth: () => Promise<boolean>;
  authorize: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const useAuth = (): ReturnType => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const updateAuth = useContext(AuthContextUpdate);

  const isAuthorized = () => !!authCtx?.isAuthorized;

  const checkAuth = async () => {
    const accesstoken = localStorage.getItem('accesstoken');

    if (!accesstoken) return false;

    try {
      await easemApi.get('/auth', {
        headers: { accesstoken },
      });
    } catch (err) {
      return false;
    }

    return true;
  };

  const authorize = async (username, password) => {
    const accesstoken = localStorage.getItem('accesstoken');

    if (accesstoken) localStorage.removeItem('accesstoken');

    const encPassword = encrypt(password);

    try {
      const login = await easemApi.post(
        '/login',
        { username, password: encPassword },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

      localStorage.setItem('accesstoken', login.data.payload.accessToken);
      localStorage.setItem('cafe_id__easem', login.data.payload.cafe_id);
      updateAuth(true);
    } catch (err) {
      return false;
    }

    return true;
  };

  const logout = () => {
    localStorage.removeItem('accesstoken');
    localStorage.removeItem('cafe_id__easem');
    updateAuth(false);
    navigate('/login');
  };

  return { isAuthorized, authorize, logout, checkAuth };
};

export default useAuth;
