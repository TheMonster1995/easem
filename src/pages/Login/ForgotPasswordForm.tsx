import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import classNames from 'classnames';
import { useSnackbar } from 'notistack';

import TextField, { TTFProps } from 'components/general/TextField';
// import easemApi from 'axios/easemApi';

type Props = {
  onBack: (input: string, status: string) => void;
  defaultUsername?: string;
};

const ForgotPasswordForm: React.FC<Props> = ({ onBack, defaultUsername }) => {
  const {
    handleSubmit,
    control,
    formState: errors,
    getValues,
    setValue,
  } = useForm<TLoginForm>();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setValue('username', defaultUsername ?? '');
  }, [defaultUsername, setValue]);

  const onSubmit = (formValues) => {
    console.log('submitResetPassword:   ', { ...formValues });
    enqueueSnackbar(
      'We have sent you an email with instructions to reset your password. Good luck :)',
      { variant: 'success' },
    );
    return;
  };

  const handleBack = () => onBack(getValues('username'), 'login');

  const renderInput = (inputProps: TTFProps) => <TextField {...inputProps} />;

  const renderField = (
    { displayTitle = true, titleClassName = '', title },
    { required = false, name, render, control },
  ): JSX.Element => (
    <Box>
      {displayTitle ? (
        <Typography
          className={classNames(titleClassName, 'font-semibold text-sm')}
        >
          {title}
        </Typography>
      ) : null}
      <Controller
        control={control}
        rules={{ required }}
        name={name}
        render={render}
      />
    </Box>
  );

  return (
    <Box className="flex flex-col items-start justify-around pl-12 h-full">
      <Typography variant="h1">Reset password</Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="h-24 flex flex-col justify-between w-96"
      >
        {renderField(
          { title: 'Username/Email' },
          {
            required: true,
            name: 'username',
            control,
            render: () =>
              renderInput({
                title: 'Username',
                placeholder: 'John',
                error: errors.errors['username']?.type === 'required',
              }),
          },
        )}
        <Button
          variant="contained"
          color="primary"
          className="w-full"
          type="submit"
        >
          Submit
        </Button>
      </form>
      <Button variant="text" color="secondary" onClick={handleBack}>
        Back to login
      </Button>
    </Box>
  );
};

export default ForgotPasswordForm;

type TLoginForm = {
  username: string;
  password: string;
};
