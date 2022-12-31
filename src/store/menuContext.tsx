import React, { useState, createContext, useCallback } from 'react';
import { TMenu } from 'components/hooks/useMenu';

export const MenuContext = createContext<{ getMenu: () => TMenu }>({
  getMenu: () => null,
});
export const MenuContextUpdate = createContext((newMenu: TMenu) => null);

export const MenuProvider: React.FC = ({ children }): JSX.Element => {
  const [menu, setMenu] = useState<TMenu>(null);
  const MenuProviderLoc = MenuContext.Provider;
  const MenuUpdateProvider = MenuContextUpdate.Provider;

  const updateMenu = (newMenu: TMenu) => {
    setMenu(newMenu);
    return null;
  };

  const getMenu = useCallback(() => (menu ? [...menu] : null), [menu]);

  return (
    <MenuProviderLoc value={{ getMenu }}>
      <MenuUpdateProvider value={updateMenu}>{children}</MenuUpdateProvider>
    </MenuProviderLoc>
  );
};
