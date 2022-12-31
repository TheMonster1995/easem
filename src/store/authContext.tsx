import React, { useState, createContext, useEffect } from 'react';
import { useSnackbar } from 'notistack';

import useAuth from 'components/hooks/useAuth';

export const AuthContext = createContext<TAuthStore>(null);
export const AuthContextUpdate = createContext((status: boolean) => null);

export const AuthProvider: React.FC = ({ children }): JSX.Element => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(null);
  const AuthProviderLoc = AuthContext.Provider;
  const AuthUpdateProvider = AuthContextUpdate.Provider;
  const { enqueueSnackbar } = useSnackbar();
  const { checkAuth } = useAuth();
  const accessToken = localStorage.getItem('accesstoken');

  useEffect(() => {
    if (!accessToken) return setIsAuthorized(false);

    const updateAuth = async () => {
      try {
        const authCheck = await checkAuth();

        if (authCheck) return setIsAuthorized(true);

        return setIsAuthorized(false);
      } catch (err) {
        enqueueSnackbar('Please login again', { variant: 'error' });
        return setIsAuthorized(false);
      }
    };

    updateAuth();
  }, [accessToken, enqueueSnackbar, checkAuth]);

  const authorizeUser = (status: boolean) => setIsAuthorized(status);

  return (
    <AuthProviderLoc value={{ isAuthorized }}>
      <AuthUpdateProvider value={authorizeUser}>{children}</AuthUpdateProvider>
    </AuthProviderLoc>
  );
};

export type TAuthStore = {
  isAuthorized: boolean;
};
