import React, { useMemo } from 'react';
import { faFileText } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navOptions = useMemo(
    () => [
      { name: 'orders', title: 'Orders', route: '/', icon: faFileText },
      {
        name: 'itemManager',
        title: 'Items',
        route: '/items',
        icon: faFileText,
      },
    ],
    [],
  );

  const renderOptions = () =>
    navOptions.map((option) => (
      <Button
        className={classNames(
          'rounded-lg w-36 h-8 justify-start hover:border-primary mb-4',
          option.route === location.pathname
            ? 'bg-primary text-light border-primary hover:bg-primary hover:text-light'
            : 'bg-light text-primary border hover:bg-light',
        )}
        variant={option.name === location.pathname ? 'contained' : 'outlined'}
        key={option.name}
      >
        <FontAwesomeIcon icon={option.icon} className="mr-2" />
        <Typography className="font-semibold">{option.title}</Typography>
      </Button>
    ));

  return (
    <Box className="fixed left-0 top-48 h-screen w-6 pl-12 hover:w-24">
      {renderOptions()}
    </Box>
  );
};

export default Navbar;
