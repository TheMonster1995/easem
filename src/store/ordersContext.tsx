import React, { useState, createContext, useCallback } from 'react';

export const OrdersContext = createContext<{ getOrders: () => TOrder[] }>({
  getOrders: () => null,
});
export const OrdersContextUpdate = createContext({
  updateOrders: (orders: TOrder[]) => null,
  handleUpdates: (orders: TOrder[]) => null,
});

export const OrdersProvider: React.FC = ({ children }): JSX.Element => {
  const [orders, setOrders] = useState<TOrder[]>(null);
  const OrdersProviderLoc = OrdersContext.Provider;
  const OrdersUpdateProvider = OrdersContextUpdate.Provider;

  const handleUpdates = (newOrders: TOrder[]) =>
    setOrders((lastOrders) => [...newOrders, ...lastOrders]);

  const updateOrders = (newOrders: TOrder[]) => setOrders(newOrders);

  const getOrders = useCallback(() => (orders ? [...orders] : null), [orders]);

  return (
    <OrdersProviderLoc value={{ getOrders }}>
      <OrdersUpdateProvider value={{ updateOrders, handleUpdates }}>
        {children}
      </OrdersUpdateProvider>
    </OrdersProviderLoc>
  );
};

export type TOrderRow = {
  price: number;
  count: number;
  label: string;
  item_id: string;
};

export type TOrder = {
  order_id: string;
  orders: TOrderRow[];
  table: string;
  new?: boolean;
};
