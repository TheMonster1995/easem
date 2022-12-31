import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Dialog,
  DialogTitle,
  Typography,
  Button,
  DialogContent,
  DialogActions,
} from '@mui/material';
import React from 'react';

type Props = {
  open: boolean;
  title: string;
  onClose: () => void;
  onSubmit?: () => void;
  actionsCmp?: () => JSX.Element;
  isLoading?: boolean;
  submitWrapper?: () => JSX.Element;
};

const Modal: React.FC<Props> = ({
  title,
  open,
  onClose,
  onSubmit,
  actionsCmp: ActionCmp,
  children,
  isLoading,
  submitWrapper: SubmitWrapper,
}) => {
  const renderActions = () => {
    if (ActionCmp) return <ActionCmp />;

    return (
      <DialogActions>
        <Button
          className="rounded-full bg-secondary text-light hover:bg-light hover:text-secondary hover:border hover:border-solid hover:border-secondary"
          onClick={onClose}
        >
          لغو
        </Button>
        <Button
          className="rounded-full bg-primary text-light hover:bg-light hover:text-primary hover:border hover:border-solid hover:border-primary"
          onClick={onSubmit}
          disabled={!!isLoading}
        >
          {!SubmitWrapper ? 'ثبت' : <SubmitWrapper />}
        </Button>
      </DialogActions>
    );
  };

  return (
    <Dialog
      open={open}
      onClose={(event, reason) =>
        reason === 'escapeKeyDown' ? onClose() : null
      }
      fullWidth={true}
      maxWidth="sm"
      scroll="paper"
    >
      <DialogTitle className="flex justify-between items-center">
        <Button
          className="text-primary hover:text-primaryLight text-base"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faTimes} />
        </Button>
        <Typography className="!text-lg">{title}</Typography>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      {renderActions()}
    </Dialog>
  );
};

export default Modal;
