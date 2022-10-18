/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react';
import { useSnackbar } from 'notistack';

import easemApi from 'axios/easemApi';
import {
  OrdersContext,
  OrdersContextUpdate,
  TOrder,
} from 'store/ordersContext';
import useAuth from './useAuth';

type ReturnType = {
  updateOrder: (orderData: TOrder) => Promise<boolean | void>;
  archiveOrder: (orderId: string) => Promise<boolean | void>;
  getOrders: () => Promise<boolean>;
  getUpdates: () => Promise<boolean>;
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

  const updateOrder = async (orderData) => {
    try {
      await easemApi.put(
        '/order',
        { order: orderData },
        {
          headers: {
            'Content-Type': 'application/json',
            accesstoken: localStorage.getItem('accessToken'),
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
        '/order',
        { order: { order_id: orderId } },
        {
          headers: {
            'Content-Type': 'application/json',
            accesstoken: localStorage.getItem('accessToken'),
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
      const getAllOrders = await easemApi.get('/orders', {
        headers: { accesstoken: localStorage.getItem('accesstoken') },
      });
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
      const updatedOrders = await easemApi.get('/update', {
        headers: { accesstoken: localStorage.getItem('accesstoken') },
      });
      let updates = updatedOrders.data?.payload ?? [];
      if (updates.length > 0)
        updates = updates.map((order) => ({ ...order, new: true }));
      updateOrders.handleUpdates(updates);
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

  return { updateOrder, archiveOrder, getOrders, getUpdates };
};

export default useOrder;
