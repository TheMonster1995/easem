/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { SnackbarProvider } from 'notistack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

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
        <button onClick={onClickDismiss(key)} className="ml-20 pl-20 pr-2">
          <FontAwesomeIcon icon={faTimes} size="lg" className="mt-1.5" />
        </button>
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
