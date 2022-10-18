import { Dialog, DialogTitle } from '@mui/material';
import React from 'react';

type Props = {
  open: boolean;
  title: string;
  onClose: () => void;
  onSubmit?: () => void;
  actionsCmp?: JSX.Element;
};

const Modal: React.FC<Props> = ({
  title,
  open,
  onClose,
  onSubmit,
  actionsCmp,
  children,
}) => {
  return (
    <Dialog open={open}>
      <DialogTitle>{}</DialogTitle>
    </Dialog>
  );
};

export default Modal;
