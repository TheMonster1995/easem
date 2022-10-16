import React, { useState } from 'react';
import LoginForm from './LoginForm';
import ForgotPasswordForm from './ForgotPasswordForm';

const Login: React.FC = () => {
  const [cmpState, setCmpState] = useState<
    'login' | 'forgotPassword' | 'lintSent'
  >('login');
  const [username, setUsername] = useState('');

  const toggleCmpState = (inputUsername, status) => {
    setUsername(inputUsername ?? '');
    setCmpState(status);
  };

  return (
    <section className="h-96">
      {cmpState === 'login' ? (
        <LoginForm
          onForgotPassword={toggleCmpState}
          defaultUsername={username}
        />
      ) : (
        <ForgotPasswordForm
          onBack={toggleCmpState}
          defaultUsername={username}
        />
      )}
    </section>
  );
};

export default Login;
