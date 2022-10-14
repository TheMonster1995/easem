import { createTheme, Theme } from '@mui/material';
import { palette } from './palette';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    titleBar: true;
  }
}

declare module '@mui/material/Divider' {
  interface DividerPropsVariantOverrides {
    titleBar: true;
  }
}

export const getTheme = (currentTheme?: Theme): Theme => {
  return createTheme({
    ...currentTheme,
    palette: {
      ...palette,
    },
    typography: {
      fontFamily: "'nexa', sans-serif !important",
      body1: {
        fontSize: '14px !important',
      },
      h2: {
        fontSize: 28,
        fontFamily: "'nexa-bold', sans-serif !important",
        lineHeight: '36px',
        fontWeight: 600,
      },
    },
    components: {
      ...currentTheme.components,
      MuiButtonGroup: {
        styleOverrides: {
          grouped: { '&:not(:last-of-type)': { borderColor: '#989898' } },
          root: {
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: 'white',
              borderRadius: '999px',
            },
          },
        },
      },
      MuiTablePagination: {
        styleOverrides: {
          selectLabel: {
            display: 'none',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          colorSecondary: {
            backgroundColor: '#863ADE',
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            marginLeft: 0,
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            '&.Mui-selected': {
              backgroundColor: 'transparent',
            },
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            '&:not(.Mui-checked) svg': {
              fill: '#F4F4F4',
            },
            '& svg': {
              backgroundColor: '#F4F4F4',
              borderRadius: '4px',
              width: '18px',
              height: '18px',
              '& path': {
                transform: 'scale(1.5) translate(-4px, -4px)',
              },
            },
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            '&.Mui-disabled': {
              cursor: 'not-allowed',
            },
          },
        },
      },
      MuiDivider: {
        variants: [
          {
            props: {
              variant: 'titleBar',
            },
            style: {
              height: 'auto',
              borderRightWidth: 'thin',
              alignSelf: 'stretch',
              borderColor: 'white',
              marginRight: '6px !important',
            },
          },
        ],
      },
      MuiButton: {
        variants: [
          {
            props: { variant: 'contained', color: 'primary' },
            style: {
              boxShadow: 'unset',
              backgroundColor: currentTheme.palette.primary.main,
              color: 'white',
              '&:hover': {
                boxShadow: 'unset',
                backgroundColor: currentTheme.palette.primary.light,
                color: currentTheme.palette.primary.main,
              },
            },
          },
          {
            props: { variant: 'titleBar' },
            style: {
              fontSize: '14px',
              textTransform: 'none',
              padding: '0.5rem 1.2rem',
              borderRadius: '9999px',
              backgroundColor: 'white',
              fontWeight: 'bold',
              color: currentTheme.palette.primary.main,
              '&: hover': {
                backgroundColor: '#FDF6EE',
              },
              [currentTheme.breakpoints.down('md')]: {
                fontSize: '12px',
                padding: '8px 20px',
                '& span.MuiButton-startIcon': {
                  marginRight: '4px',
                  '& svg.svg-inline--fa': {
                    width: '18px',
                  },
                },
              },
            },
          },
        ],
        styleOverrides: {
          ...currentTheme.components.MuiButton.styleOverrides,
          root: {
            backgroundColor: 'transparent',
            textTransform: 'none',
            // '&:hover': {
            //   color: '#FFA700',
            // },
          },
        },
      },
      MuiList: {
        styleOverrides: {
          root: {
            paddingTop: 4,
            paddingBottom: 4,
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            fontSize: '14px',
            color: '#545454',
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            minWidth: '30px',
          },
        },
      },
      MuiInputLabel: {
        defaultProps: {
          shrink: true,
        },
        styleOverrides: {
          root: {
            fontSize: '14px',
          },
          outlined: {
            position: 'static',
            transform: 'none',
          },
        },
      },
      MuiTable: {
        styleOverrides: {
          root: {
            '& .MuiDataGrid-columnHeadertitle': {
              fontWeight: 'bold !important',
            },
          },
        },
      },
      MuiSelect: {
        variants: [
          {
            props: { variant: 'filled' },
            style: {
              '& .MuiFilledInput-root': {
                transition: currentTheme.transitions.create('all'),
                backgroundColor: '#F4F4F4',
                '&::placeholder': {
                  color: '#CFCFCF',
                  opacity: '1',
                },
                '&:focus-within': {
                  backgroundColor: 'white',
                  borderColor: currentTheme.palette.primary.main,
                },
                '&:hover': {
                  borderColor: currentTheme.palette.primary.main,
                },
              },
            },
          },
        ],
        defaultProps: {
          MenuProps: {
            PaperProps: {
              className: 'mt-0.5',
              style: {
                boxShadow: '0px 3px 6px #00000029 !important',
              },
            },
            MenuListProps: {
              sx: {
                '& .MuiMenuItem-root': {
                  padding: '8px 16px',
                },
              },
            },
          },
        },
        styleOverrides: {},
      },

      MuiTextField: {
        variants: [
          {
            props: { variant: 'filled' },
            style: {
              '& .MuiFilledInput-root': {
                transition: currentTheme.transitions.create('all'),
                '& input:placeholder': {
                  color: '#CFCFCF',
                  opacity: '1',
                },
                '&:focus-within': {
                  backgroundColor: 'white',
                  borderColor: currentTheme.palette.primary.main,
                },
                '&:hover': {
                  borderColor: currentTheme.palette.primary.main,
                },
              },
            },
          },
        ],
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            width: '100%',
            fontSize: '14px',
            transition: currentTheme.transitions.create('all'),
            backgroundColor: 'transparent',
            padding: '0.55rem 0.8rem !important',
            color: '#626262  !important',
            '&:hover': {
              borderColor: currentTheme.palette.primary.main,
            },
          },
          root: {
            height: 'auto !important',
            transition: currentTheme.transitions.create('all'),
            borderRadius: '5px',
            border: '1px solid',
            borderColor: '#CFCFCF',
            color: '#CFCFCF',
            '&:focus-within': {
              backgroundColor: 'white',
              borderColor: currentTheme.palette.primary.main,
            },
            '&.Mui-focused': {
              borderColor: currentTheme.palette.primary.main,
            },
            '&:hover': {
              borderColor: currentTheme.palette.primary.main,
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'transparent !important',
            },
            '& .MuiInputAdornment-root': {
              margin: '0 !important',
            },
          },
        },
      },
    },
  });
};
