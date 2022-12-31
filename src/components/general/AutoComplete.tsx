import React from 'react';
import { Autocomplete as MAutocomplete, TextField } from '@mui/material';

type Props = {
  options: TOption[];
  title?: string;
  group?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  muiProps?: any;
};

const Autocomplete: React.FC<Props> = ({
  options,
  title,
  muiProps = null,
  group = false,
}) => {
  return (
    <MAutocomplete
      disablePortal
      autoHighlight
      blurOnSelect
      disableClearable
      classes={{ inputRoot: '!py-0 rounded-none border-0 border-b' }}
      id="combo-box-demo"
      options={options}
      getOptionLabel={(option: TOption) =>
        option.label
          ? `${option.label}${option.desc ? ` - ${option.desc}` : ''}`
          : ''
      }
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={title} />}
      {...muiProps}
      groupBy={!group ? null : (option: TOption) => option.cat}
    />
  );
};

export default Autocomplete;

export type TOption = {
  label: string;
  cat?: string;
  price?: number;
  item_id?: string;
  desc?: string;
};
