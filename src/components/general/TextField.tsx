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
};

const TextField: React.FC<TTFProps> = ({
  title,
  placeholder,
  className,
  error,
  onChange,
  onEnterClick,
  type = 'text',
}) => {
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
    />
  );
};

export default TextField;
