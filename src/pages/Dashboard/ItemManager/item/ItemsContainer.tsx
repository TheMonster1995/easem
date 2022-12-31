import React from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Paper, Box } from '@mui/material';
import { TMenuItem } from 'components/hooks/useMenu';
import { TWhichForm } from '../ItemManager';
import Item from 'components/wrapper/Item';

type Props = {
  openForm: (ioi: string, which: TWhichForm) => void;
  items: TMenuItem[];
  onArchive: (itemId: string, which: 'item') => void;
  load: { LoadingWrapper: () => JSX.Element; isLoading: boolean };
};

const ItemsContainer: React.FC<Props> = ({
  openForm,
  items,
  onArchive,
  load: { isLoading, LoadingWrapper },
}) => {
  const onAction = (itemId: string, action: string) => {
    switch (action) {
      case 'edit':
        return openForm(itemId, 'item');

      case 'delete':
        return onArchive(itemId, 'item');
    }
  };

  const renderItems = () => {
    if (!(items?.length !== 0)) return null;

    return items.map((item) =>
      item.status !== 'archived' ? (
        <Item key={item.item_id} item={item} onAction={onAction} />
      ) : null,
    );
  };

  return (
    <Paper className="w-full px-8 py-4 rounded-none">
      <Button
        className="text-primary rounded-full m-4 mt-0 text-base"
        variant="outlined"
        onClick={openForm.bind(this, '', 'item')}
      >
        <FontAwesomeIcon icon={faPlus} className="mr-2" />
        New Item
      </Button>
      {isLoading ? (
        <Box className="w-full bg-primaryLight flex items-center justify-center py-4">
          <LoadingWrapper />
        </Box>
      ) : (
        <Box className="flex flex-wrap">{renderItems()}</Box>
      )}
    </Paper>
  );
};

export default ItemsContainer;
