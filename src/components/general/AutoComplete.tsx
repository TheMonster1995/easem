import React from 'react';
import { Autocomplete as MAutocomplete, TextField } from '@mui/material';

type Props = {
  options: TOption[];
  title: string;
};

const Autocomplete: React.FC<Props> = ({ options, title }) => {
  return (
    <MAutocomplete
      disablePortal
      id="combo-box-demo"
      options={options}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={title} />}
    />
  );
};

export default Autocomplete;

type TOption = {
  label: string;
  id: number;
};
