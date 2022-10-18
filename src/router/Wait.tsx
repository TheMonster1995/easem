import { Box } from '@mui/material';
import React from 'react';
import { RingLoader } from 'react-spinners';

type Props = {
  display?: boolean;
};

const Wait: React.FC<Props> = ({ display = true }) => {
  return (
    <Box className="w-screen h-screen absolute top-0 left-0 flex justify-center items-center">
      <RingLoader loading={display} size={80} />
    </Box>
  );
};

export default Wait;
