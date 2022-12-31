import { faTimes, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Typography } from '@mui/material';
import classNames from 'classnames';
import React from 'react';

type Props = {
  onClick: () => void;
  title?: string;
  icon?: IconDefinition;
  bgColor?: string;
  color?: string;
  dir?: 'rtl' | 'ltr';
};

const Notice: React.FC<Props> = ({
  onClick,
  icon = faTimes,
  bgColor = 'red-600',
  title = 'New',
  color = 'primary',
  dir = 'ltr',
}) => {
  return (
    <Button
      onClick={onClick}
      className={classNames(
        'flex items-center justify-between bg-red-700 text-light rounded-full text-xs py-1 px-2',
      )}
      dir={dir}
    >
      <Typography className="text-xs mr-2">{title}</Typography>
      <FontAwesomeIcon icon={icon} />
    </Button>
  );
};

export default Notice;
