import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Box } from '@mui/material';
import classNames from 'classnames';
import { TMenuCat } from 'components/hooks/useMenu';
import React from 'react';

type Props = {
  onAction: (catId: string, action: string) => void;
  selected: boolean;
  cat: TMenuCat;
};

const Category: React.FC<Props> = ({ onAction, selected, cat }) => {
  return (
    <Box
      className={classNames(
        'flex justify-between items-center border-0 border-solid p-4',
        selected ? 'border-b-2 border-primary' : 'border-b border-gray-300',
      )}
    >
      <Box className="flex justify-end">
        <Button
          className="rounded-full bg-red-800 text-light hover:bg-light hover:text-red-800 text-sm mx-2 !min-w-0 !w-8 !h-8"
          onClick={onAction.bind(this, cat.cat_id, 'delete')}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
        <Button
          className="rounded-full bg-secondary text-light hover:bg-light hover:text-secondary text-sm mx-2 !min-w-0 !w-8 !h-8"
          onClick={onAction.bind(this, cat.cat_id, 'edit')}
        >
          <FontAwesomeIcon icon={faPencil} />
        </Button>
      </Box>
      <Button
        onClick={onAction.bind(this, cat.cat_id, 'click')}
        className="!text-base text-start"
      >
        {cat.label}
      </Button>
    </Box>
  );
};

export default Category;
