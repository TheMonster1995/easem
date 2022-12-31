/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react';
import easemApi from 'axios/easemApi';
import { useSnackbar } from 'notistack';
import useAuth from './useAuth';
import { MenuContext, MenuContextUpdate } from 'store/menuContext';

type ReturnType = {
  getMenu: () => Promise<boolean>;
  getItems: () => TMenuItem[];
  createCategory: (title: string) => Promise<boolean>;
  createItem: (itemData: TMenuInput) => Promise<boolean>;
  updateCategory: (catData: TMenuCat) => Promise<boolean>;
  updateItem: (itemData: TMenuItem) => Promise<boolean>;
  archiveCategory: (catId: string) => Promise<boolean>;
  archiveItem: (itemId: string) => Promise<boolean>;
  toggleItem: (itemId: string, stat: boolean) => Promise<boolean>;
};

export type TMenu = Array<{
  cat_id: string;
  label: string;
  index: string;
  children: TMenuItem[];
  cafe_id?: string;
  status?: string;
}>;

export type TMenuItem = {
  item_id?: string;
  label: string;
  desc?: string;
  price: number;
  cat_label?: string;
  cat?: string;
  active?: boolean;
  status?: string;
  index?: string;
  cafe_id?: string;
};

export type TMenuCat = {
  label: string;
  cat_id?: string;
  children?: string[] | TMenuItem[];
  index?: string;
  status?: string;
  cafe_id?: string;
};

export type TMenuInput = {
  label: string;
  desc?: string;
  price: string;
  cat: string;
  cat_label: string;
};

export type TCatInput = { label: string };

const useMenu = (): ReturnType => {
  const { getMenu: getCtxMenu } = useContext(MenuContext);
  const updateMenu = useContext(MenuContextUpdate);
  const { isAuthorized } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const menuCtx = getCtxMenu();

  const getMenu = async (): Promise<boolean> => {
    if (!isAuthorized()) return false;

    try {
      const menu = await easemApi.get(
        `/menu/${localStorage.getItem('cafe_id__easem')}`,
        {
          headers: { accesstoken: localStorage.getItem('accesstoken') },
        },
      );

      const newMenu = menu.data?.payload;

      if (newMenu) updateMenu(newMenu);
      return true;
    } catch (err: any) {
      enqueueSnackbar('There was a problem getting the menu', {
        variant: 'warning',
      });
      return false;
    }
  };

  const getItems = (): TMenuItem[] => {
    if (!isAuthorized()) return [];
    if (menuCtx === null) return [];

    let items = [];

    menuCtx.forEach((element) => {
      items = [...items, ...element.children];
    });

    return items;
  };

  const createCategory = async (input: string) => {
    if (!isAuthorized()) return false;

    try {
      const newCatCall = await easemApi.post(
        `/cat/new/${localStorage.getItem('cafe_id__easem')}`,
        {
          label: input,
          status: 'created',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            accesstoken: localStorage.getItem('accesstoken'),
          },
        },
      );

      const newCat = {
        label: input,
        status: 'created',
        cat_id: `${newCatCall.data?.payload?.catId ?? ''}`,
        index: `${menuCtx.length}`,
        children: [],
      };

      const newMenu: TMenu = [...menuCtx, newCat];

      updateMenu(newMenu);
    } catch (err: any) {
      enqueueSnackbar('There was a problem creating the category', {
        variant: 'error',
      });
      return false;
    }

    return true;
  };

  const createItem = async ({
    label,
    desc = '',
    price,
    cat,
    cat_label,
  }: TMenuInput) => {
    if (!isAuthorized()) return false;

    const itemData: TMenuItem = {
      label,
      desc,
      price: +price,
      cat,
      cat_label,
      active: true,
      status: 'created',
    };

    try {
      const newItemCall = await easemApi.post(
        `/item/new/${localStorage.getItem('cafe_id__easem')}`,
        { ...itemData },
        {
          headers: {
            'Content-Type': 'application/json',
            accesstoken: localStorage.getItem('accesstoken'),
          },
        },
      );

      itemData['item_id'] = `${newItemCall.data?.payload?.itemId ?? ''}`;

      const newMenu = menuCtx.map((cat) =>
        cat.cat_id !== itemData.cat
          ? cat
          : {
              ...cat,
              children: [...cat.children, itemData],
            },
      );

      updateMenu(newMenu);
    } catch (err: any) {
      enqueueSnackbar('There was a problem creating item', {
        variant: 'error',
      });
      return false;
    }

    return true;
  };

  const updateCategory = async (data) => {
    if (!isAuthorized()) return false;

    try {
      await easemApi.put(
        `/cat/${localStorage.getItem('cafe_id__easem')}`,
        {
          catid: data.cat_id,
          catdata: data,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            accesstoken: localStorage.getItem('accesstoken'),
          },
        },
      );

      const newMenu = menuCtx.map((cat) =>
        cat.cat_id !== data.cat_id ? cat : data,
      );

      updateMenu(newMenu);
    } catch (err: any) {
      enqueueSnackbar('There was a problem updating the category', {
        variant: 'error',
      });
      return false;
    }

    return true;
  };

  const updateItem = async (data: TMenuItem) => {
    if (!isAuthorized()) return false;

    try {
      await easemApi.put(
        `/item/${localStorage.getItem('cafe_id__easem')}`,
        { itemid: data.item_id, itemdata: data },
        {
          headers: {
            'Content-Type': 'application/json',
            accesstoken: localStorage.getItem('accesstoken'),
          },
        },
      );

      const newMenu = menuCtx.map((cat) =>
        cat.cat_id !== data.cat
          ? cat
          : {
              ...cat,
              children: cat.children.map((item) =>
                item.item_id !== data.item_id ? item : data,
              ),
            },
      );

      updateMenu(newMenu);
    } catch (err: any) {
      enqueueSnackbar('There was a problem updating item', {
        variant: 'error',
      });
      return false;
    }

    return true;
  };

  const toggleItem = async (itemid: string, stat: boolean) => {
    if (!isAuthorized()) return false;

    try {
      await easemApi.put(
        `/item/${localStorage.getItem('cafe_id__easem')}`,
        { itemid, itemdata: { active: stat } },
        {
          headers: {
            'Content-Type': 'application/json',
            accesstoken: localStorage.getItem('accesstoken'),
          },
        },
      );

      const newMenu = menuCtx.map((cat) =>
        cat.cat_id !== itemid.slice(0, 3)
          ? cat
          : {
              ...cat,
              children: cat.children.map((item) =>
                item.item_id !== itemid ? item : { ...item, active: stat },
              ),
            },
      );

      updateMenu(newMenu);
    } catch (err: any) {
      enqueueSnackbar('There was a problem updating item', {
        variant: 'error',
      });
      return false;
    }

    return true;
  };

  const archiveCategory = async (catId: string) => {
    if (!isAuthorized()) return;

    // const cat = menuCtx.find((catt) => catt.cat_id === catId);

    // if (cat.children.length > 0) {
    //   enqueueSnackbar('This category has items and cannot be archived', {
    //     variant: 'warning',
    //   });

    //   return false;
    // }

    try {
      await easemApi.put(
        `/cat/${localStorage.getItem('cafe_id__easem')}`,
        { catid: catId, catdata: { status: 'archived' } },
        {
          headers: {
            'Content-Type': 'application/json',
            accesstoken: localStorage.getItem('accesstoken'),
          },
        },
      );

      const newMenu = menuCtx.filter((cat) => cat.cat_id !== catId);

      updateMenu(newMenu);
    } catch (err: any) {
      enqueueSnackbar('There was a problem archiving category', {
        variant: 'error',
      });
      return false;
    }

    return true;
  };

  const archiveItem = async (itemid: string) => {
    if (!isAuthorized()) return false;

    try {
      await easemApi.put(
        `/item/${localStorage.getItem('cafe_id__easem')}`,
        { itemid, itemdata: { status: 'archived' } },
        {
          headers: {
            'Content-Type': 'application/json',
            accesstoken: localStorage.getItem('accesstoken'),
          },
        },
      );

      const newMenu = menuCtx.map((cat) =>
        cat.cat_id !== itemid.slice(0, 3)
          ? cat
          : {
              ...cat,
              children: cat.children.filter((item) => item.item_id !== itemid),
            },
      );

      updateMenu(newMenu);
    } catch (err: any) {
      enqueueSnackbar('There was a problem archiving item', {
        variant: 'error',
      });
      return false;
    }

    return true;
  };

  return {
    getMenu,
    getItems,
    createCategory,
    createItem,
    updateCategory,
    updateItem,
    archiveCategory,
    archiveItem,
    toggleItem,
  };
};

export default useMenu;
