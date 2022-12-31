import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box } from '@mui/material';

import useMenu, { TMenuCat, TMenuItem } from 'components/hooks/useMenu';
import TextField from 'components/general/TextField';
import useLoader from 'components/hooks/useLoader';
import Modal from 'components/general/Modal';
import { renderField } from 'pages/Login';

type Props = {
  defaultData: TMenuItem;
  open: boolean;
  onClose: () => void;
  cat: TMenuCat;
};

const ItemForm: React.FC<Props> = ({ defaultData, open, onClose, cat }) => {
  const [catSet, setCatSet] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<TMenuItem>({ defaultValues: defaultData });

  useEffect(() => {
    if (catSet) return;

    if (!cat) return;

    setValue('cat', cat.cat_id);
    setValue('cat_label', cat.label);
    setCatSet(true);
  }, [cat, catSet, setValue]);

  const { updateItem, createItem } = useMenu();
  const { isLoading, LoadingWrapper, toggleLoading } = useLoader({
    text: 'ثبت',
  });

  const onSubmit = async (formValues) => {
    let itemCall;
    toggleLoading();

    if (!defaultData) itemCall = await createItem({ ...formValues });
    else itemCall = await updateItem({ ...formValues });

    if (itemCall) return onClose();

    toggleLoading();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={!defaultData ? 'دسته بندی جدید' : 'ویرایش دسته بندی'}
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isLoading}
      submitWrapper={LoadingWrapper}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col justify-start"
        dir="rtl"
      >
        <Box className="my-4">
          {renderField(
            { title: 'نام', error: errors.label ? true : null },
            {
              required: true,
              name: 'label',
              control,
              render: ({ field: { onChange, value } }) => (
                <TextField
                  title="نام"
                  placeholder="اسپرسو دراکولا"
                  error={!!errors['label']}
                  onChange={onChange}
                  value={value || ''}
                />
              ),
            },
          )}
        </Box>
        <Box className="my-4">
          {renderField(
            { title: 'توضیحات' },
            {
              required: false,
              name: 'desc',
              control,
              render: ({ field: { onChange, value } }) => (
                <TextField
                  title="توضیحات"
                  placeholder="اسپرسو وارداتی دراکولا با طعم پرتقال"
                  onChange={onChange}
                  value={value || ''}
                />
              ),
            },
          )}
        </Box>
        <Box className="my-4">
          {renderField(
            { title: 'قیمت - هزار تومان', error: errors.price ? true : null },
            {
              required: true,
              name: 'price',
              control,
              render: ({ field: { onChange, value } }) => (
                <TextField
                  title="قیمت"
                  placeholder="42"
                  error={!!errors['price']}
                  onChange={onChange}
                  type="number"
                  numberType={{ min: 0 }}
                  value={value || 0}
                />
              ),
            },
          )}
        </Box>
      </form>
    </Modal>
  );
};

export default ItemForm;
