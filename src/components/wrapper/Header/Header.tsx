/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import Navbar from './Navbar';
import { AuthContext } from 'store/authContext';
import useOrder from 'components/hooks/useOrder';
import { MenuContext } from 'store/menuContext';
import { OrdersContext } from 'store/ordersContext';
import useMenu from 'components/hooks/useMenu';

const Header: React.FC = () => {
  const { isAuthorized } = useContext(AuthContext);
  const { getOrders: getDBOrders, getUpdates } = useOrder();
  const { getOrders } = useContext(OrdersContext);
  const { getMenu: getCtxMenu } = useContext(MenuContext);
  const { getMenu } = useMenu();

  const orders = getOrders();
  const menu = getCtxMenu();

  useEffect(() => {
    if (!isAuthorized) return;
    if (orders !== null) return;
    getDBOrders();
    const updateInterval = setInterval(() => {
      const updates = getUpdates();
      if (!updates) clearInterval(updateInterval);
    }, 30 * 1000);
    return () => clearInterval(updateInterval);
  }, [isAuthorized]);

  useEffect(() => {
    if (!isAuthorized) return;
    if (menu !== null) return;

    getMenu();
  }, [isAuthorized]);

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
