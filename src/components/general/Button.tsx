import React from 'react';
import { Typography, Button as MuiButton } from '@mui/material';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';

type Props = {
  children?: JSX.Element;
  text?: string;
  type?: string;
  variant?: 'text' | 'outlined' | 'contained' | 'titleBar';
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning';
  icon?: IconDefinition;
  iconPlacement?: 'start' | 'end';
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  dir?: 'trl' | 'ltr';
  onClick?: () => void;
};

const Button: React.FC<Props> = ({
  children,
  text,
  type,
  icon,
  iconPlacement,
  className,
  iconClassName,
  textClassName,
  dir,
  variant,
  color,
}) => {
  const renderIcon = () =>
    icon ? (
      <FontAwesomeIcon icon={icon} className={classnames(iconClassName)} />
    ) : null;

  const renderContent = () => {
    if (!text && !children && !icon) return 'ERROR';

    if (!text && !children) return renderIcon();

    if (!children)
      return (
        <>
          {iconPlacement === 'start' && renderIcon()}
          <Typography className={classnames(textClassName)}>{text}</Typography>
          {iconPlacement === 'end' && renderIcon()}
        </>
      );

    return children;
  };

  return (
    <MuiButton
      className={classnames(className, 'rounded-full')}
      dir={dir ?? 'ltr'}
      variant={variant ?? 'outlined'}
      color={color ?? 'primary'}
    >
      {renderContent()}
    </MuiButton>
  );
};

export default Button;
