import React, { useContext, useState, useEffect } from 'react';
import { Typography } from '@mui/material';

import { AuthContext } from 'store/authContext';
import useOrder from 'components/hooks/useOrder';
import { OrdersContext, TOrder } from 'store/ordersContext';
import OrderList from './OrderList';

const OrderManager: React.FC = () => {
  const [orders, setOrders] = useState<TOrder[]>([]);
  const { getOrders: getOrdersStore } = useContext(OrdersContext);
  const authCtx = useContext(AuthContext);
  const { getOrders, getUpdates } = useOrder();

  useEffect(() => {
    if (!authCtx?.isAuthorized) return;
    getOrders();
    const updateInterval = setInterval(() => {
      const updates = getUpdates();
      if (!updates) clearInterval(updateInterval);
    }, 30 * 1000);
    return () => clearInterval(updateInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authCtx?.isAuthorized]);

  useEffect(() => {
    if (getOrdersStore) setOrders(getOrdersStore());
  }, [getOrdersStore]);

  return (
    <section className="pl-64">
      <Typography variant="h1" className="text-primary">
        Orders <span className="italic">(live)</span>
      </Typography>
      <OrderList orders={orders} />
    </section>
  );
};

export default OrderManager;
