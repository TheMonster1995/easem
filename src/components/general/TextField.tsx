import React from 'react';
import { TextField as MTextField } from '@mui/material';
import classNames from 'classnames';

export type TTFProps = {
  title: string;
  placeholder?: string;
  className?: string;
  error?: boolean;
  onChange?: (e) => void;
  onEnterClick?: () => void;
  type?: string;
  name?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
  numberType?: {
    min?: number;
    max?: number;
  };
};

const TextField: React.FC<TTFProps> = ({
  title,
  placeholder,
  className,
  error,
  onChange,
  onEnterClick,
  type = 'text',
  name,
  value,
  numberType = {},
}) => {
  const maybeProps = {};

  if (name) maybeProps['name'] = name;
  if (value !== undefined) maybeProps['value'] = value;

  return (
    <MTextField
      title={title}
      placeholder={placeholder ?? title}
      className={classNames('w-full', className)}
      error={error ?? false}
      classes={{ root: 'text-placeholder' }}
      onChange={onChange}
      onKeyPress={(e) => {
        if (e.key === 'Enter')
          if (!onEnterClick) return e.preventDefault();
          else return onEnterClick();
      }}
      type={type}
      required
      {...maybeProps}
      {...numberType}
    />
  );
};

export default TextField;
