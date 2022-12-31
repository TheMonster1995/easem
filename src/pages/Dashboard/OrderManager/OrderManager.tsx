import React, { useContext, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

import { OrdersContext } from 'store/ordersContext';
import OrderList from './OrderList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const OrderManager: React.FC = () => {
  const [newOpen, setNewOpen] = useState(false);
  const { getOrders } = useContext(OrdersContext);

  const orders = getOrders();

  return (
    <section className="pl-64">
      <Box className="flex justify-start items-center mb-4">
        <Typography variant="h1" className="text-primary mr-8 rounded-full">
          Orders <span className="italic">(live)</span>
        </Typography>
        <Button
          variant="outlined"
          color="info"
          onClick={() => setNewOpen(true)}
          className="rounded-full min-w-0"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Add Item
        </Button>
      </Box>
      <OrderList
        orders={orders}
        newOpen={newOpen}
        closeNew={() => setNewOpen(false)}
      />
    </section>
  );
};

export default OrderManager;
