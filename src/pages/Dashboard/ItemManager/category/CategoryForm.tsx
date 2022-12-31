import React, { useState, useEffect } from 'react';
import useMenu, { TMenuCat } from 'components/hooks/useMenu';
import { Box, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import TextField from 'components/general/TextField';
import Modal from 'components/general/Modal';
import useLoader from 'components/hooks/useLoader';

type Props = {
  defaultData: TMenuCat;
  open: boolean;
  onClose: () => void;
};

type TError = {
  name?: boolean;
  index?: boolean;
};

const CategoryForm: React.FC<Props> = ({ defaultData, open, onClose }) => {
  const [cat, setCat] = useState<TMenuCat>({ label: '' });
  const [error, setError] = useState<TError>(null);

  const { updateCategory, createCategory } = useMenu();
  const { isLoading, toggleLoading, LoadingWrapper } = useLoader({
    text: 'ثبت',
  });

  useEffect(() => {
    if (!defaultData) return;

    setCat(defaultData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (event = null) => {
    event?.preventDefault();
    if (cat?.label?.trim() === '') return setError({ name: true });

    saveCat(!defaultData ? 'new' : '');
  };

  const saveCat = async (t?: string) => {
    let catCall;

    toggleLoading();

    if (t === 'new') catCall = await createCategory(cat.label);
    else catCall = await updateCategory({ ...cat });

    if (catCall) {
      return onClose();
    }

    return toggleLoading();
  };

  const updateInput = (e) =>
    setCat((lastCat) => {
      if (error !== null) setError(null);
      return { ...lastCat, label: e.target.value };
    });

  const closeForm = () => {
    setCat({ label: '' });
    setError(null);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={closeForm}
      title={!defaultData ? 'دسته بندی جدید' : 'ویرایش دسته بندی'}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      submitWrapper={LoadingWrapper}
    >
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col justify-start h-36 "
        dir="rtl"
      >
        <Box>
          <Typography
            className={classNames(
              'font-semibold text-sm mb-2',
              error && 'text-red-800',
            )}
          >
            نام دسته بندی
            {error && (
              <FontAwesomeIcon icon={faTriangleExclamation} className="ml-2" />
            )}
          </Typography>
          <TextField
            title="catname"
            placeholder="نام دسته بندی"
            error={!!error?.name}
            value={cat?.label ?? ''}
            onChange={updateInput}
            name="catname"
          />
        </Box>
      </form>
    </Modal>
  );
};

export default CategoryForm;
