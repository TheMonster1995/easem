import React, { useMemo } from 'react';
import { TNavOption } from './Navbar';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

type Props = {
  data: TNavOption;
  onClick?: () => void;
};

const NavButton: React.FC<Props> = ({ data, onClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const btnClasses = useMemo(
    () => ({
      default: 'rounded-lg w-36 h-8 justify-start hover:border-primary mb-4',
      active:
        'bg-primary text-light border-primary hover:bg-primary hover:text-light',
      notActive: 'bg-light text-primary border hover:bg-light',
    }),
    [],
  );

  const handleNavClick = () => {
    // eslint-disable-next-line no-extra-boolean-cast
    if (!onClick) return navigate(data.route);

    return onClick();
  };

  return (
    <Button
      className={classNames(
        btnClasses.default,
        data.route === location.pathname
          ? btnClasses.active
          : btnClasses.notActive,
      )}
      variant={data.name === location.pathname ? 'contained' : 'outlined'}
      key={data.name}
      onClick={handleNavClick}
    >
      <FontAwesomeIcon icon={data.icon} className="mr-2" />
      <Typography className="font-semibold">{data.title}</Typography>
    </Button>
  );
};

export default NavButton;
