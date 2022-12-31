import React, { useState, useEffect } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, Typography } from '@mui/material';
import { TOption } from 'components/general/AutoComplete';
import OrderRowInput from 'components/wrapper/OrderRowInput';
import { TOrderRow } from 'store/ordersContext';
import useMenu from './useMenu';

type ReturnType = {
  OrderRowWrapper: () => React.ReactElement | null;
  getValues: () => TRows;
  emptyRows: () => void;
};

type TRows = Array<TOrderRow>;

const useOrderRow = (
  defaultRows?: TRows,
  optionsInput?: TOption[],
): ReturnType => {
  const [orders, setOrders] = useState<TRows>([]);
  const { getItems } = useMenu();

  const options = optionsInput ?? getItems();

  useEffect(() => {
    if (defaultRows?.length > 0 && orders.length === 0) setOrders(defaultRows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getValues = () => orders.filter((order) => order.label && order.count);

  const updateRow = (data: TOrderRow, index: number) => {
    const rowData = { ...data };

    if (data.price === 0) {
      const row = options.find((option) => option.item_id === data.item_id);
      rowData.price = row.price;
    }

    setOrders((lastOrders) =>
      lastOrders.map((order, i) => (i !== index ? order : rowData)),
    );
  };

  const deleteRow = (index) =>
    setOrders((lastOrders) => lastOrders.filter((order, i) => i !== index));

  const addRow = () =>
    setOrders((lastOrders) => [
      ...lastOrders,
      { price: 0, label: 'انتخاب آیتم', count: 0, item_id: null },
    ]);

  const renderRows = () =>
    orders.map((row, i) => (
      <OrderRowInput
        defaultItem={row}
        onSubmit={updateRow}
        onDelete={deleteRow.bind(this, i)}
        options={options}
        key={row.item_id ?? `itemInput${i}`}
        index={i}
        submitted={!!row.item_id}
      />
    ));

  const OrderRowWrapper = () => (
    <Box className="flex flex-col justify-start items-start">
      {renderRows()}
      <Button
        className="font-semibold text-base rounded-full"
        onClick={addRow}
        variant="outlined"
      >
        <FontAwesomeIcon icon={faPlus} className="ml-2" />
        <Typography className="text-sm">آیتم جدید</Typography>
      </Button>
    </Box>
  );

  const emptyRows = () => setOrders([]);

  return { getValues, OrderRowWrapper, emptyRows };
};

export default useOrderRow;
