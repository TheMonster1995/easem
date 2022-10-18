import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';

import Order from 'components/wrapper/Order';
import { TOrder } from 'store/ordersContext';

type Props = {
  orders: TOrder[];
};

const OrderList: React.FC<Props> = ({ orders }) => {
  const [isFormOpen, setFormOpen] = useState(false);
  const [orderOfInterest, setOrderOfInterest] = useState('');
  const NoOrderFound = () => (
    <Box className="flex items-center justify-center w-full h-52">
      <Typography variant="h3" className="text-primary">
        No new orders :\
      </Typography>
    </Box>
  );

  const openOrderForm = (orderId) => {
    setOrderOfInterest(orderId);
    setFormOpen(true);
  };

  const closeOrderForm = () => {
    setOrderOfInterest('');
    setFormOpen(false);
  };

  const renderOrders = () => {
    if (orders.length === 0) return NoOrderFound();

    return orders.map((order) => (
      <Order data={order} key={order.order_id} onEdit={openOrderForm} />
    ));
  };

  return (
    <Box className="w-full flex flex-wrap items-start justify-start">
      {renderOrders()}
    </Box>
  );
};

export default OrderList;
