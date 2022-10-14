import React, { useState } from 'react';
import LoginForm from './LoginForm';

const Login: React.FC = () => {
  const [cmpState, setCmpState] = useState<'login' | 'forgotPassword' | 'lintSent'>('login');
  const [username, setUsername] = useState('');

  const toggleCmpState = (inputUsername) => setCmpState((val) => {
    setUsername(inputUsername ?? '');
    if (val === 'login') return 'forgotPassword'
    return 'login';
  });

  return (
    <section className="h-96">
      {cmpState === 'login' ? 
        <LoginForm onForgotPassword={toggleCmpState} defaultUsername={username} />
      :
        // <ForgotPasswordForm onBack={toggleCmpState} defaultUsername={username} />
        null
      }
    </section>
  );
};

export default Login;
