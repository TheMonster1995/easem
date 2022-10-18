import React, { useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import classNames from 'classnames';

import { TOrder } from 'store/ordersContext';
import Modal from 'components/general/Modal';
import useOrder from 'components/hooks/useOrder';

type Props = {
  defaultData?: TOrder;
  open: boolean;
  onClose: () => void;
};

const OrderForm: React.FC<Props> = ({ defaultData, open, onClose }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<TOrder>();
  const { updateOrder } = useOrder();

  useEffect(() => {
    if (!defaultData) return;

    setValue('table', defaultData.table);
    setValue('orders', defaultData.orders);
  }, [defaultData, setValue]);

  const onSubmit: SubmitHandler<TOrder> = async (formVals) => {
    const update = await updateOrder(formVals);

    if (update) onClose();
  };

  return (
    <Modal
      title={defaultData ? `سفارش شماره ${defaultData.order_id}` : 'سفارش جدید'}
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
    >
      <form></form>
    </Modal>
  );
};

export default OrderForm;
