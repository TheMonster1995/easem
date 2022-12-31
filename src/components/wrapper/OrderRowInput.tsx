/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { faCheck, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button } from '@mui/material';
import Autocomplete, { TOption } from 'components/general/AutoComplete';
import Counter from 'components/general/Counter';
import { TOrderRow } from 'store/ordersContext';
import classNames from 'classnames';

type Props = {
  defaultItem?: TOrderRow;
  onSubmit: (data: TOrderRow, index: number) => void;
  onDelete: () => void;
  options: TOption[];
  index: number;
  submitted?: boolean;
};

const OrderRowInput: React.FC<Props> = ({
  defaultItem,
  options,
  index,
  onSubmit,
  onDelete,
  submitted: rowSubmitted,
}) => {
  const [item, setItem] = useState<TOrderRow>(defaultItem ?? null);
  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(!!defaultItem);

  useEffect(() => {
    if (defaultItem && item === null) setItem(defaultItem);
    if (rowSubmitted) setSubmitted(true);
  }, []);

  const onIncrease = () => {
    setItem((lastItem) => ({ ...lastItem, count: lastItem.count + 1 }));
    trigger();
  };

  const onDecrease = () => {
    setItem((lastItem) => ({
      ...lastItem,
      count: lastItem.count - 1 < 0 ? 0 : lastItem.count - 1,
    }));
    trigger();
  };

  const handleSubmit = () => {
    if (!item.item_id || item.count === 0) return setError(true);

    onSubmit(item, index);

    setSubmitted(true);
  };

  const onTitleChange = (event, newVal: TOption) => {
    setItem((lastItem) => ({
      ...newVal,
      count: lastItem.count ?? 0,
      price: newVal?.price ?? 0,
      item_id: newVal.item_id ?? null,
    }));
    trigger();
  };

  const trigger = () => {
    // couldn't decide on a name, trigger what exactly?
    setSubmitted(false);
    if (!error) return;
    if (item.label !== '' && item.count !== 0) setError(false);
  };

  return (
    <Box className="flex justify-start items-center mb-6">
      <Button
        className={classNames(
          'rounded-full ml-6 !w-10 !h-10 min-w-0 hover:text-green-600',
          submitted ? 'bg-red-700' : 'bg-green-600',
          error ? 'border-red-700 text-red-700' : 'text-light',
        )}
        onClick={submitted ? onDelete : handleSubmit}
      >
        <FontAwesomeIcon icon={submitted ? faTrashAlt : faCheck} />
      </Button>
      <Box className="ml-6">
        <Autocomplete
          options={options}
          muiProps={{ value: item, onChange: onTitleChange }}
        />
      </Box>
      <Counter
        value={item.count}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
      />
    </Box>
  );
};

export default OrderRowInput;
