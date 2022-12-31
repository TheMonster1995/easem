/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react';
import { useSnackbar } from 'notistack';

import easemApi from 'axios/easemApi';
import {
  OrdersContext,
  OrdersContextUpdate,
  TOrder,
  TOrderRow,
} from 'store/ordersContext';
import useAuth from './useAuth';

type ReturnType = {
  createOrder: (orderData: TOrderRaw) => Promise<boolean | void>;
  updateOrder: (orderData: TOrder) => Promise<boolean | void>;
  archiveOrder: (orderId: string) => Promise<boolean | void>;
  getOrders: () => Promise<boolean>;
  getUpdates: () => Promise<boolean>;
  setSeen: (orderId: string) => void;
};

const useOrder = (): ReturnType => {
  const { logout, isAuthorized } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { getOrders: getOrdersStore } = useContext(OrdersContext);
  const updateOrders = useContext(OrdersContextUpdate);

  const orderRemover = (orderId: string) =>
    getOrdersStore().filter((order) => order.order_id !== orderId);

  const orderEditor = (
    ooi: TOrder, //Order Of Interest
  ) =>
    getOrdersStore().map((order) =>
      order.order_id !== ooi.order_id ? order : { ...order, ...ooi },
    );

  const addOrder = (orderData, order_id) => [
    { ...orderData, order_id },
    ...getOrdersStore(),
  ];

  const updateOrder = async (orderData) => {
    try {
      await easemApi.put(
        `/order/${localStorage.getItem('cafe_id__easem')}`,
        { order: orderData },
        {
          headers: {
            'Content-Type': 'application/json',
            accesstoken: localStorage.getItem('accesstoken'),
          },
        },
      );

      enqueueSnackbar('Order updated', { variant: 'success' });
      updateOrders.updateOrders(orderEditor(orderData));
      return true;
    } catch (err: any) {
      if (err.response?.status === '401') {
        enqueueSnackbar('Please login first', { variant: 'error' });
        return logout();
      }
      enqueueSnackbar('There was a problem. Please try again', {
        variant: 'error',
      });
      return false;
    }
  };

  const archiveOrder = async (orderId: string) => {
    try {
      await easemApi.put(
        `/order/${localStorage.getItem('cafe_id__easem')}`,
        { order: { order_id: orderId, status: 'archived' } },
        {
          headers: {
            'Content-Type': 'application/json',
            accesstoken: localStorage.getItem('accesstoken'),
          },
        },
      );

      enqueueSnackbar('Order archived', { variant: 'success' });
      updateOrders.updateOrders(orderRemover(orderId));
      return true;
    } catch (err: any) {
      if (err.response?.status === '401') {
        enqueueSnackbar('Please login first', { variant: 'error' });
        return logout();
      }
      enqueueSnackbar('There was a problem. Please try again', {
        variant: 'error',
      });
      return false;
    }
  };

  const getOrders = async () => {
    if (!isAuthorized()) return false;
    try {
      const getAllOrders = await easemApi.get(
        `/orders/${localStorage.getItem('cafe_id__easem')}`,
        {
          headers: { accesstoken: localStorage.getItem('accesstoken') },
        },
      );
      const allOrders = getAllOrders.data?.payload ?? [];

      if (allOrders.length > 0) updateOrders.updateOrders([...allOrders]);
    } catch (err) {
      enqueueSnackbar('There as a problem getting orders from server', {
        variant: 'warning',
      });

      return false;
    }

    return true;
  };

  const getUpdates = async () => {
    if (!isAuthorized()) return false;
    try {
      const updatedOrders = await easemApi.get(
        `/update/${localStorage.getItem('cafe_id__easem')}`,
        {
          headers: { accesstoken: localStorage.getItem('accesstoken') },
        },
      );
      let updates = updatedOrders.data?.payload ?? [];
      if (updates.length > 0) {
        updates = updates.map((order) => ({ ...order, new: true }));
        enqueueSnackbar('A new order just arrived', { variant: 'success' });
        updateOrders.handleUpdates(updates);
      }
      return true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response?.status === '401') {
        localStorage.removeItem('accesstoken');
        logout();
        return false;
      }
      console.warn('There was an error getting updates');
      console.warn(err);
      enqueueSnackbar('There was a problem getting updates from server', {
        variant: 'warning',
      });
      return true;
    }
  };

  const setSeen = (orderId: string) => {
    if (!isAuthorized()) return;

    const newOrdersState = getOrdersStore().map((order) =>
      order.order_id !== orderId ? order : { ...order, new: false },
    );

    updateOrders.updateOrders(newOrdersState);
  };

  const createOrder = async (order: TOrderRaw) => {
    if (!isAuthorized()) return;

    try {
      const newOrder = await easemApi.post(
        `/order/new/${localStorage.getItem('cafe_id__easem')}`,
        { order: { ...order, seen: true } },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      enqueueSnackbar('Order submitted', { variant: 'success' });
      updateOrders.updateOrders(addOrder(order, newOrder.data.payload.orderId));
    } catch (err: any) {
      if (err.response?.status === '401') {
        enqueueSnackbar('Please login first', { variant: 'error' });
        return logout();
      }
      enqueueSnackbar('There was a problem. Please try again', {
        variant: 'error',
      });
      return false;
    }
    return true;
  };

  return {
    createOrder,
    updateOrder,
    archiveOrder,
    getOrders,
    getUpdates,
    setSeen,
  };
};

export default useOrder;

export type TOrderRaw = {
  orders: TOrderRow[];
  table: string;
};
