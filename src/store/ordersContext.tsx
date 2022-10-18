import React, { useState, createContext, useCallback } from 'react';

export const OrdersContext = createContext<{ getOrders: () => TOrder[] }>({
  getOrders: () => [],
});
export const OrdersContextUpdate = createContext({
  updateOrders: (orders: TOrder[]) => null,
  handleUpdates: (orders: TOrder[]) => null,
});

export const OrdersProvider: React.FC = ({ children }): JSX.Element => {
  const [orders, setOrders] = useState<TOrder[]>([]);
  const OrdersProvider = OrdersContext.Provider;
  const OrdersUpdateProvider = OrdersContextUpdate.Provider;

  const handleUpdates = (newOrders: TOrder[]) =>
    setOrders((lastOrders) => [...lastOrders, ...newOrders]);

  const updateOrders = (newOrders: TOrder[]) => setOrders(newOrders);

  const getOrders = useCallback(() => [...orders], [orders]);

  return (
    <OrdersProvider value={{ getOrders }}>
      <OrdersUpdateProvider value={{ updateOrders, handleUpdates }}>
        {children}
      </OrdersUpdateProvider>
    </OrdersProvider>
  );
};

export type TOrderRow = {
  price: number;
  count: number;
  label: string;
};

export type TOrder = {
  order_id: string;
  orders: TOrderRow[];
  table: string;
  new?: boolean;
};
