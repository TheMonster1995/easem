import easemApi from 'axios/easemApi';
import { useNavigate } from 'react-router-dom';

type ReturnType = {
  isAuthorized: () => Promise<boolean>;
  authorize: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const useAuth = (): ReturnType => {
  const navigate = useNavigate();

  const isAuthorized = async () => {
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

    // const encPassword = encrypt(password);
    const encPassword = password;

    try {
      const login = await easemApi.post(
        '/login',
        { username, password: encPassword },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

      localStorage.setItem('accesstoken', login.data.payload.accessToken);
    } catch (err) {
      return false;
    }

    return true;
  };

  const logout = () => {
    localStorage.removeItem('accesstoken');
    navigate('/login');
  };

  return { isAuthorized, authorize, logout };
};

export default useAuth;
