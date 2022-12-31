import React, { useCallback, useState } from 'react';
import { Box, Typography } from '@mui/material';

import Order from 'components/wrapper/Order';
import { TOrder } from 'store/ordersContext';
import OrderForm from './OrderForm';

type Props = {
  orders: TOrder[];
  newOpen: boolean;
  closeNew: () => void;
};

const OrderList: React.FC<Props> = ({ orders, newOpen, closeNew }) => {
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
    if (!orders || orders?.length === 0) return NoOrderFound();

    return orders.map((order) => (
      <Order data={order} key={order.order_id} onEdit={openOrderForm} />
    ));
  };

  const renderForm = useCallback(() => {
    if (!newOpen && !isFormOpen) return null;

    let onClose = closeOrderForm;
    let open = isFormOpen;

    if (newOpen) {
      onClose = closeNew;
      open = newOpen;
    }

    const order = orders?.find((order) => order.order_id === orderOfInterest);

    return (
      <OrderForm {...{ open, onClose }} defaultData={newOpen ? 'new' : order} />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFormOpen, newOpen, orderOfInterest]);

  return (
    <Box className="w-full flex flex-wrap items-start justify-start">
      {renderOrders()}
      {renderForm()}
    </Box>
  );
};

export default OrderList;
