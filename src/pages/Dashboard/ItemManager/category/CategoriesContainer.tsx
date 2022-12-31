import React from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Paper, Box } from '@mui/material';
import { TMenuCat } from 'components/hooks/useMenu';
import { TWhichForm } from '../ItemManager';
import Category from 'components/wrapper/Category';

type Props = {
  openForm: (ioi: string, which: TWhichForm) => void;
  cats: TMenuCat[];
  selected: string;
  selectCat: (catId: string) => void;
  onArchive: (catId: string, which: 'category') => void;
  load: { LoadingWrapper: () => JSX.Element; isLoading: boolean };
};

const CategoriesContainer: React.FC<Props> = ({
  openForm,
  cats,
  selected,
  selectCat,
  onArchive,
  load: { isLoading, LoadingWrapper },
}) => {
  const onAction = (catId: string, action: string) => {
    switch (action) {
      case 'click':
        return selectCat(catId);

      case 'edit':
        return openForm(catId, 'category');

      case 'delete':
        return onArchive(catId, 'category');
    }
  };

  const renderCats = () => {
    if (!(cats?.length !== 0)) return null;

    return cats.map((cat) =>
      cat.status !== 'archived' ? (
        <Category
          key={cat.cat_id}
          cat={cat}
          onAction={onAction}
          selected={cat.cat_id === selected}
        />
      ) : null,
    );
  };

  return (
    <Paper className="w-96 rounded-none">
      <Button
        className="text-primary rounded-full m-4 text-base"
        variant="outlined"
        onClick={openForm.bind(this, '', 'category')}
      >
        <FontAwesomeIcon icon={faPlus} className="mr-2" />
        New category
      </Button>
      {isLoading ? (
        <Box className="w-full bg-primaryLight flex items-center justify-center py-4">
          <LoadingWrapper />
        </Box>
      ) : (
        renderCats()
      )}
    </Paper>
  );
};

export default CategoriesContainer;
