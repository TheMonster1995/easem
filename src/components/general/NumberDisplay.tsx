import { Typography } from '@mui/material';
import React from 'react';
import { numberNormalizer } from 'utils';

type Props = {
  num: number;
  min?: number;
};

const NumberDisplay: React.FC<Props> = ({ num, min }) => (
  <Typography>{numberNormalizer(num, min)}</Typography>
);

export default NumberDisplay;
