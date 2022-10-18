import React from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Typography } from '@mui/material';

import NumberDisplay from 'components/general/NumberDisplay';
import { TOrderRow } from 'store/ordersContext';

type Props = {
  data: TOrderRow;
  total?: boolean;
};

const OrderRow: React.FC<Props> = ({ data, total }) => {
  return (
    <Box className="flex flex-wrap w-72 justify-between">
      <NumberDisplay num={+data.price * +data.count * 1000} />
      <Box className="flex justify-end flex-nowrap">
        <Typography>{data.label}</Typography>
        {total ? null : (
          <>
            <FontAwesomeIcon icon={faTimes} />
            <NumberDisplay num={data.count} />
          </>
        )}
      </Box>
    </Box>
  );
};

export default OrderRow;
