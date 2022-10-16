import React from 'react';
import { Routes } from 'router';
import { StyledEngineProvider } from '@mui/material/styles';
import { Theme, ThemeProvider } from '@mui/material';
import { SnackBarProvider } from 'components';
import getDefualtTheme from './theme/DefualtTheme';
import { getTheme } from './theme';

const App: React.FC = () => {
  const defualttheme = getDefualtTheme();

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={defualttheme}>
        <ThemeProvider theme={(theme: Theme): Theme => getTheme(theme)}>
          <SnackBarProvider>
            <Routes />
          </SnackBarProvider>
        </ThemeProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
