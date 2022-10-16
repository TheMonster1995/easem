import React from 'react';
import Navbar from './Navbar';

const Header: React.FC = () => {
  return (
    <>
      <header className="flex items-center justify-between">
        <section className="pl-8">
          <img src="logo.png" alt="easem" className="h-32" />
        </section>
        <section></section>
      </header>
      <Navbar />
    </>
  );
};

export default Header;
