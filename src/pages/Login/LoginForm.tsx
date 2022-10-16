import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

import TextField, { TTFProps } from 'components/general/TextField';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
// import easemApi from 'axios/easemApi';

type Props = {
  onForgotPassword: (input: string, status: string) => void;
  defaultUsername?: string;
};

const LoginForm: React.FC<Props> = ({ onForgotPassword, defaultUsername }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<TLoginForm>();

  useEffect(() => {
    setValue('username', defaultUsername ?? '');
  }, [defaultUsername, setValue]);

  const onSubmit: SubmitHandler<TLoginForm> = (formValues) => {
    console.log('submitLogin:   ', { ...formValues });
    return;
  };

  const handleResetPassword = () =>
    onForgotPassword(getValues('username'), 'forgotPassword');

  const renderInput = (inputProps: TTFProps) => <TextField {...inputProps} />;

  const renderField = (
    { displayTitle = true, titleClassName = '', title, error = null },
    { required = false, name, render, control },
  ): JSX.Element => (
    <Box>
      {displayTitle ? (
        <Typography
          className={classNames(
            titleClassName,
            'font-semibold text-sm mb-2',
            error && 'text-red-800',
          )}
        >
          {title}
          {error && (
            <FontAwesomeIcon icon={faTriangleExclamation} className="ml-2" />
          )}
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
      <Typography variant="h1">Login</Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="h-48 flex flex-col justify-between w-96"
      >
        {renderField(
          { title: 'Username', error: errors.username ? true : null },
          {
            required: true,
            name: 'username',
            control,
            render: ({ field: { onChange } }) =>
              renderInput({
                title: 'Username',
                placeholder: 'John',
                error: !!errors['username'],
                onChange,
              }),
          },
        )}
        {renderField(
          { title: 'Password', error: errors.password ? true : null },
          {
            required: true,
            name: 'password',
            control,
            render: ({ field: { onChange } }) =>
              renderInput({
                title: 'Password',
                placeholder: '********',
                error: !!errors['password'],
                type: 'password',
                onChange,
              }),
          },
        )}
        <Button
          variant="contained"
          color="primary"
          className="w-full"
          onClick={() => handleSubmit(onSubmit)()}
        >
          Login
        </Button>
      </form>
      <Button variant="text" color="secondary" onClick={handleResetPassword}>
        {
          'Have a good day :)' //Reset Password
        }
      </Button>
    </Box>
  );
};

export default LoginForm;

type TLoginForm = {
  username: string;
  password: string;
};
