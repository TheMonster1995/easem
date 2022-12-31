import React, { useMemo } from 'react';
import {
  faFileText,
  faSignIn,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { Box } from '@mui/material';
import useAuth from 'components/hooks/useAuth';

import NavButton from './NavButton';

const Navbar: React.FC = () => {
  const navOptions = useMemo<TNavOption[]>(
    () => [
      { name: 'orders', title: 'Orders', route: '/', icon: faFileText },
      {
        name: 'itemManager',
        title: 'Menu',
        route: '/easem',
        icon: faFileText,
      },
    ],
    [],
  );
  const { logout } = useAuth();

  const renderOptions = () =>
    navOptions.map((option) => <NavButton data={option} key={option.name} />);

  return (
    <Box className="fixed left-0 top-40 h-screen w-6 pl-12 hover:w-24">
      {renderOptions()}
      <NavButton
        data={{
          name: 'signout',
          title: 'Sign out',
          route: '',
          icon: faSignIn,
        }}
        onClick={logout}
      />
    </Box>
  );
};

export default Navbar;

export type TNavOption = {
  name: string;
  title: string;
  route: string;
  icon: IconDefinition;
};
