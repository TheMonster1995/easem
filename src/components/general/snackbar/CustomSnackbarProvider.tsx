/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { SnackbarProvider } from 'notistack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@mui/material';

type Props = { children?: JSX.Element };

const CustomSnackbarProvider: React.FC<Props> = (props): React.ReactElement => {
  const notistackRef = React.createRef();
  const onClickDismiss = (key) => () => {
    //@ts-ignore
    notistackRef.current.closeSnackbar(key);
  };
  return (
    <SnackbarProvider
      maxSnack={4}
      //@ts-ignore
      ref={notistackRef}
      action={(key) => (
        <Button size={'medium'} onClick={onClickDismiss(key)}>
          <FontAwesomeIcon icon={faTimes} className="text-light mt-1.5" />
        </Button>
      )}
      iconVariant={{
        success: '',
        error: '',
        warning: '',
        info: '',
      }}
      classes={{
        variantError:
          'bg-white  border-error border-l-[6px] text-secondaryTextLight text-sm h-[60px]',
        variantSuccess:
          'bg-white  border-success border-l-[6px] text-secondaryTextLight text-sm h-[60px]',
        variantWarning:
          'bg-white  border-warning border-l-[6px] text-secondaryTextLight text-sm h-[60px]',
        variantInfo:
          'bg-white  border-secondary border-l-[6px] text-secondaryTextLight text-sm h-[60px]',
      }}
    >
      {props.children}
    </SnackbarProvider>
  );
};

export default CustomSnackbarProvider;
