import { palette } from './palette';
import { createTheme, Theme } from '@mui/material/styles';

const getDefualtTheme = (): Theme => {
  return createTheme({
    palette: {
      ...palette,
    },
    spacing: (number: number): number => {
      return number * 2;
    },
    typography: {
      fontFamily: "'nexa', sans-serif !important",
      h1: {
        fontSize: 36,
        fontWeight: 500,
        lineHeight: '46px',
      },
      h2: {
        fontSize: 28,
        fontFamily: "'nexa-bold', sans-serif !important",
        lineHeight: '36px',
        fontWeight: 600,
      },
      h3: {
        fontSize: 24,
        lineHeight: '30px',
        fontWeight: 500,
      },
      h4: {
        fontSize: 18,
        lineHeight: '28px',
        fontWeight: 500,
      },
      h5: {
        fontSize: 16,
        lineHeight: '20px',
        fontWeight: 400,
      },
      h6: {
        fontSize: 20,
        lineHeight: '28px',
        fontWeight: 400,
      },
      body1: {
        fontSize: 16,
        lineHeight: '24px',
        fontWeight: 400,
      },
      body2: {
        fontSize: 14,
        lineHeight: '20px',
        fontWeight: 400,
      },
      caption: {
        fontSize: 12,
        lineHeight: '18px',
        fontWeight: 400,
      },
    },
    components: {
      MuiTypography: {
        styleOverrides: {
          h1: {
            fontSize: 36,
            fontWeight: 500,
            lineHeight: '46px',
            fontFamily: "'nexa', sans-serif !important",
            // color: palette?.mono['300'],
          },
          h2: {
            fontSize: 28,
            lineHeight: '36px',
            fontWeight: 600,
            fontFamily: "'nexa-bold', sans-serif !important",
            // color: palette?.mono['300'],
          },
          h3: {
            fontSize: 24,
            lineHeight: '30px',
            fontWeight: 500,
            fontFamily: "'nexa', sans-serif !important",
            // color: palette?.mono['300'],
          },
          h4: {
            fontSize: 18,
            lineHeight: '28px',
            fontWeight: 500,
            fontFamily: "'nexa', sans-serif !important",
            // color: palette?.mono['300'],
          },
          h5: {
            fontSize: 16,
            lineHeight: '20px',
            fontWeight: 400,
            fontFamily: "'nexa', sans-serif !important",
            // color: palette?.mono['300'],
          },
          h6: {
            fontSize: 20,
            lineHeight: '28px',
            fontWeight: 400,
            fontFamily: "'nexa', sans-serif !important",
            // color: palette?.mono['300'],
          },
          body1: {
            fontSize: 16,
            lineHeight: '24px',
            fontWeight: 400,
            fontFamily: "'nexa', sans-serif !important",
            // color: palette?.mono['300'],
          },
          body2: {
            fontSize: 14,
            lineHeight: '20px',
            fontWeight: 400,
            fontFamily: "'nexa', sans-serif !important",
            // color: palette?.mono['300'],
          },
          caption: {
            fontSize: 12,
            lineHeight: '18px',
            fontWeight: 400,
            fontFamily: "'nexa', sans-serif !important",
            // color: palette?.mono['300'],
          },
        },
      },
      MuiInput: {
        defaultProps: {
          disableUnderline: true,
        },
        styleOverrides: {
          root: {
            color: palette.primary?.['main'],
          },
          input: {
            '&::placeholder': {
              textTransform: 'capitalize',
            },
            color: '#000',
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            //color: palette.primary.themeText,
            height: 32,
          },
          notchedOutline: {
            color: palette.primary?.['main'],
            '&:hover': {},
          },
          input: {
            '&::placeholder': {
              textTransform: 'capitalize',
            },
            color: '#000',
            padding: '6.5px 8px',
            fontSize: 14,
          },
          multiline: {
            height: 'auto',
            color: '#000',
            padding: '6.5px 8px',
            fontSize: 14,
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            height: 32,
            borderRadius: 4,
          },
          input: {
            padding: '6.5px 8px',
          },
          underline: {
            '&&&:before': {
              borderBottom: 'none',
            },
            '&&:after': {
              borderBottom: 'none',
            },
          },
        },
      },

      MuiBackdrop: {
        styleOverrides: {
          root: {},
        },
      },

      MuiInputLabel: {
        styleOverrides: {
          outlined: {
            // color: palette.primary?.['main'],
            transform: 'translate(14px, 12.5px) scale(1)',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            height: 24,
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {},
        },
      },
      MuiSelect: {
        styleOverrides: {
          outlined: {},
          select: {},
        },
      },
      MuiButton: {
        styleOverrides: {
          endIcon: {
            marginLeft: 4,
            marginRight: 0,
          },
          textPrimary: {
            // color: palette.primary.contrastText,
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          popper: {
            textTransform: 'capitalize',
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {},
          colorPrimary: {
            color: palette.primary?.['main'],
          },
          colorInherit: {
            color: '#000000',
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            color: palette.primary?.['main'],
            '&:hover': { color: palette.primary?.['main'] },
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          colorSecondary: {
            color: palette.primary?.['main'],
          },
        },
      },
    },
  });
};

export default getDefualtTheme;
