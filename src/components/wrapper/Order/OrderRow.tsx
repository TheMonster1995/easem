import React from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Typography } from '@mui/material';

import NumberDisplay from 'components/general/NumberDisplay';
import { TOrderRow } from 'store/ordersContext';
import classNames from 'classnames';

type Props = {
  data: TOrderRow;
  total?: boolean;
  className?: string;
};

const OrderRow: React.FC<Props> = ({ data, total, className }) => {
  return (
    <Box
      className={classNames(
        'flex flex-wrap w-72 justify-between my-2 border-0',
        className,
      )}
    >
      <Box className="flex justify-end">
        <NumberDisplay
          num={(total ? +data.price : +data.price * +data.count) * 1000}
          className="text-base"
        />
        <Typography className="italic text-xs ml-2 font-semibold">T</Typography>
      </Box>
      <Box className="flex justify-end flex-nowrap items-center">
        {total ? null : (
          <>
            <NumberDisplay num={data.count} className="text-base" />
            <FontAwesomeIcon icon={faTimes} className="text-base mx-2" />
          </>
        )}
        <Typography fontSize="1.125rem!important">{data.label}</Typography>
      </Box>
    </Box>
  );
};

export default OrderRow;
