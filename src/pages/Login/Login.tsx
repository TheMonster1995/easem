import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

type TLoginForm = {
  username: string;
  password: string;
};

const Login: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: errors,
    getValues,
    setValue,
  } = useForm<TLoginForm>();

  const onSubmit = (formValues) => {
    console.log('submitLogin:   ', { ...formValues });
    return;
  };

  return (
    <section className="h-96">
      <Box className="flex flex-col items-start justify-around pl-12 h-full">
        <Typography variant="h1">Login</Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="h-48 flex flex-col justify-between w-96"
        >
          <Controller
            control={control}
            rules={{ required: true }}
            name={'username'}
            render={({ field: { onChange } }) => (
              <TextField
                title="Username"
                placeholder="John"
                className="w-full"
                error={errors.errors['username']?.type === 'required'}
                classes={{ root: 'text-placeholder' }}
                onChange={onChange}
                onKeyPress={(e) => {
                  e.key === 'Enter' && e.preventDefault();
                }}
              />
            )}
          />
          <Controller
            control={control}
            rules={{ required: true }}
            name={'password'}
            render={({ field: { onChange } }) => (
              <TextField
                title="Password"
                placeholder="********"
                className="w-full"
                type="password"
                error={errors.errors['password']?.type === 'required'}
                classes={{ root: 'text-placeholder' }}
                onChange={onChange}
                onKeyPress={(e) => {
                  e.key === 'Enter' && e.preventDefault();
                }}
              />
            )}
          />
          <Button variant="contained" color="primary" className="w-full">
            Login
          </Button>
        </form>
        <Button variant="text" color="secondary">
          Reset password
        </Button>
      </Box>
    </section>
  );
};

export default Login;
