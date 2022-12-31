import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  snackbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    minWidth: 250,
    height: 60,
    borderRadius: 10,
  },
  bar: {
    width: 8,
    height: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  leftSection: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 10,
  },
  messageContainer: {
    marginLeft: 16,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  paper: {
    borderRadius: 10,
  },
}));

export default useStyles;
