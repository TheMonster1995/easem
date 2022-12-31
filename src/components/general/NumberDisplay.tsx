import { Typography } from '@mui/material';
import React from 'react';
import { numberNormalizer } from 'utils';

type Props = {
  num: number;
  min?: number;
  className?: string;
};

const NumberDisplay: React.FC<Props> = ({ num, min, className }) => (
  <Typography className={className} fontSize="unset!important">
    {numberNormalizer(num, min)}
  </Typography>
);

export default NumberDisplay;
