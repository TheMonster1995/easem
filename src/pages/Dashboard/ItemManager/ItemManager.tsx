import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography } from '@mui/material';
import Modal from 'components/general/Modal';
import { CategoriesContainer, CategoryForm } from './category';
import { ItemsContainer, ItemForm } from './item';
import useMenu, { TMenuCat } from 'components/hooks/useMenu';
import useLoader from 'components/hooks/useLoader';
import { MenuContext } from 'store/menuContext';
import DndWrapper from 'components/Dnd/DndWrapper';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

export type TWhichForm = 'item' | 'category';

const ItemManager: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isWarningOpen, setIsWarningOpen] = useState<TWhichForm>(null);
  const [idOfInterest, setIdOfInterest] = useState<string>(null);
  const [selectedCat, setSelectedCat] = useState('');
  const [whichForm, setWhichForm] = useState<TWhichForm>(null);
  const { archiveCategory, archiveItem } = useMenu();
  const { getMenu } = useContext(MenuContext);
  const { LoadingWrapper, isLoading, toggleLoading } = useLoader({
    text: 'ثبت',
  });
  const {
    LoadingWrapper: ArchiveWrapper,
    isLoading: isArchiving,
    toggleLoading: toggleArchiveLoading,
  } = useLoader({ text: 'آرشیو' });

  const menu = getMenu();

  useEffect(() => {
    if (menu !== null && !isLoading) return;

    if (menu === null && !isLoading) return toggleLoading();

    if (menu !== null && isLoading) return toggleLoading();
  }, [menu, isLoading, toggleLoading]);

  useEffect(() => {
    if (selectedCat === '' && menu !== null)
      setSelectedCat(menu.find((cat) => cat.status !== 'archived').cat_id);
  }, [menu, selectedCat]);

  const closeForm = () => {
    setIsFormOpen(false);
    setWhichForm(null);
    setIdOfInterest(null);
  };

  const findItem = () => {
    if (idOfInterest === '') return null;

    const cat = findCat();

    return cat.children.find((item) => item.item_id === idOfInterest);
  };

  const findCat = () => {
    if (idOfInterest === '') return null;
    return menu.find((cat) => cat.cat_id === idOfInterest.slice(0, 3));
  };

  const openForm = (ioi: string, ft: TWhichForm) => {
    setIdOfInterest(ioi);
    setWhichForm(ft);
    setIsFormOpen(true);
  };

  const findCatWithId = (catId: string): TMenuCat => {
    const cat = menu.find((cat) => cat.cat_id === catId);

    if (!cat) return null;

    return cat;
  };

  const renderForm = () => {
    if (whichForm === null) return null;

    if (whichForm === 'item')
      return (
        <ItemForm
          defaultData={menu?.length > 0 ? findItem() : null}
          cat={menu?.length > 0 ? findCatWithId(selectedCat) : null}
          open={isFormOpen && whichForm === 'item'}
          onClose={closeForm}
        />
      );

    return (
      <CategoryForm
        defaultData={findCat()}
        open={isFormOpen && whichForm === 'category'}
        onClose={closeForm}
      />
    );
  };

  const selectCat = (catId: string) => setSelectedCat(catId);

  const archiveAction = (id: string, which: 'category' | 'item') => {
    setIdOfInterest(id);
    setIsWarningOpen(which);
  };

  const closeWarning = () => {
    setIsWarningOpen(null);
    setIdOfInterest(null);
  };

  const getCats = (): TMenuCat[] =>
    menu.map((cat) => ({
      label: cat.label,
      cat_id: cat.cat_id,
      index: cat.index,
      status: cat.status,
    }));

  const getItems = () =>
    menu.find((cat) => cat.cat_id === selectedCat)?.children ?? [];

  const handleArchive = async () => {
    toggleArchiveLoading();

    let archived;

    if (isWarningOpen === 'category')
      archived = await archiveCategory(idOfInterest);
    else archived = await archiveItem(idOfInterest);

    toggleArchiveLoading();

    if (archived) return closeWarning();
  };

  return (
    <section className="pl-64">
      {renderForm()}
      <Modal
        open={!!isWarningOpen}
        onClose={closeWarning}
        title=""
        isLoading={isArchiving}
        submitWrapper={ArchiveWrapper}
        onSubmit={() => {
          handleArchive();
        }}
      >
        <Typography className="!text-base text-center mx-auto">
          Archive {isWarningOpen}?!
        </Typography>
      </Modal>
      <Typography variant="h1" className="text-primary mb-4">
        Menu
      </Typography>
      <Box className="flex justify-end">
        <DndWrapper>
          <SortableContext
            items={
              menu?.length > 0
                ? menu
                    .filter((cat) => cat.status !== 'archived')
                    .map((cat) => ({
                      id: cat.cat_id,
                    }))
                : []
            }
            strategy={verticalListSortingStrategy}
          >
            <CategoriesContainer
              openForm={openForm}
              cats={menu?.length > 0 ? getCats() : []}
              selected={selectedCat}
              selectCat={selectCat}
              onArchive={archiveAction}
              load={{ LoadingWrapper, isLoading }}
            />
          </SortableContext>
          <SortableContext
            items={
              menu?.length > 0
                ? menu
                    .find((cat) => cat.cat_id === selectedCat)
                    .children.filter((item) => item.status !== 'archived')
                    .map((item) => ({
                      id: item.item_id,
                    }))
                : []
            }
            strategy={verticalListSortingStrategy}
          >
            <ItemsContainer
              openForm={openForm}
              items={menu?.length > 0 ? getItems() : []}
              onArchive={archiveAction}
              load={{ LoadingWrapper, isLoading }}
            />
          </SortableContext>
        </DndWrapper>
      </Box>
    </section>
  );
};

export default ItemManager;
