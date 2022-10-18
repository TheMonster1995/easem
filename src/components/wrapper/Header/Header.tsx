import React, { useContext } from 'react';
import Navbar from './Navbar';
import { AuthContext } from 'store/authContext';

const Header: React.FC = () => {
  const { isAuthorized } = useContext(AuthContext);

  const renderNavbar = () => {
    if (isAuthorized) return <Navbar />;
    return null;
  };

  return (
    <>
      <header className="flex items-center justify-between">
        <section className="pl-8">
          <img src="logo.png" alt="easem" className="h-32" />
        </section>
        <section></section>
      </header>
      {renderNavbar()}
    </>
  );
};

export default Header;
