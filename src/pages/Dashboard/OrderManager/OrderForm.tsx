/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';

import { TOrder } from 'store/ordersContext';
import Modal from 'components/general/Modal';
import useOrder from 'components/hooks/useOrder';
import AutoComplete from 'components/general/AutoComplete';
import useOrderRow from 'components/hooks/useOrderRow';
import useLoader from 'components/hooks/useLoader';

type Props = {
  defaultData?: TOrder | 'new';
  open: boolean;
  onClose: () => void;
};

const OrderForm: React.FC<Props> = ({ defaultData, open, onClose }) => {
  const { updateOrder, createOrder } = useOrder();
  const [table, setTable] = useState<number>(null);
  const {
    getValues: getOrderRows,
    OrderRowWrapper,
    emptyRows,
  } = useOrderRow(
    defaultData !== 'new' && defaultData?.orders ? defaultData.orders : [],
  );
  const { enqueueSnackbar } = useSnackbar();
  const { LoadingWrapper, isLoading, toggleLoading } = useLoader({
    text: 'ثبت',
  });

  useEffect(() => {
    if (!defaultData) return;

    if (defaultData === 'new') return setTable((lastTable) => lastTable);

    setTable(+defaultData.table);
  }, [defaultData]);

  const onSubmit = async (data) => {
    toggleLoading();

    const orderData: any = { ...data };

    if (defaultData !== 'new') {
      orderData.order_id = defaultData.order_id;
      const update = await updateOrder(orderData);

      if (update) return onClose();

      return toggleLoading();
    }

    const newOrder = await createOrder(orderData);

    if (newOrder) {
      setTable(null);
      emptyRows();
      return onClose();
    }

    return toggleLoading();
  };

  const handleSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    if (table === null)
      return enqueueSnackbar('لطفا شماره میز را وارد کنید', {
        variant: 'warning',
      });

    const orderData: any = {
      table,
      orders: getOrderRows(),
    };

    return onSubmit(orderData);
  };

  return (
    <Modal
      title={
        defaultData !== 'new'
          ? `سفارش شماره ${defaultData?.order_id}`
          : 'سفارش جدید'
      }
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitWrapper={LoadingWrapper}
      isLoading={isLoading}
    >
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col justify-start h-96"
        dir="rtl"
      >
        <Box className="flex justify-start items-center mb-2">
          <Typography className="font-semibold ml-2 !text-base">
            شماره میز
          </Typography>
          <AutoComplete
            options={[
              { label: '1' },
              { label: '2' },
              { label: '3' },
              { label: '4' },
              { label: '5' },
              { label: '6' },
              { label: '7' },
              { label: '8' },
              { label: '9' },
              { label: '10' },
            ]}
            muiProps={{
              value: { label: `${table ?? 'انتخاب میز'}` },
              onChange: (event, newValue) => setTable(+newValue.label),
            }}
          />
        </Box>
        <OrderRowWrapper />
      </form>
    </Modal>
  );
};

export default OrderForm;
