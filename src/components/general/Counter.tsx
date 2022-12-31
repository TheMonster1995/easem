import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Typography, Box } from '@mui/material';
import React from 'react';

type Props = {
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

const Counter: React.FC<Props> = ({ value, onIncrease, onDecrease }) => {
  return (
    <Box className="flex justify-start items-center">
      <Button
        className="bg-light text-secondary rounded-full text-base !w-10 !h-10 !min-w-0"
        onClick={onIncrease}
      >
        <FontAwesomeIcon icon={faPlus} />
      </Button>
      <Typography className="!text-2xl font-semibold mx-4">{value}</Typography>
      <Button
        className="bg-light text-secondary rounded-full text-base !w-10 !h-10 !min-w-0"
        onClick={onDecrease}
      >
        <FontAwesomeIcon icon={faMinus} />
      </Button>
    </Box>
  );
};

export default Counter;
