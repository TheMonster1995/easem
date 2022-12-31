import React from 'react';
import PropTypes, { any } from 'prop-types';
import { Typography, Snackbar, Button, Paper } from '@mui/material';
import useStyle from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Slide from '@mui/material/Slide';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

type Props = {
  message: string;
  open: boolean;
  bar: React.ReactElement;
  onClose: () => void;
};

const GeneralSnackbar: React.FC<Props> = ({ message, open, bar, onClose }) => {
  const styles = useStyle();

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      TransitionComponent={Slide}
      message="Note archived"
    >
      <Paper className={styles.paper}>
        <div className={styles.snackbar}>
          <div className={styles.leftSection}>
            {bar}
            <div className={styles.messageContainer}>
              <Typography className={'text-[#626262]'}>{message}</Typography>
            </div>
          </div>
        </div>
      </Paper>
    </Snackbar>
  );
};

GeneralSnackbar.defaultProps = {
  message: undefined,
  open: false,
  bar: <></>,
  onClose: () => null,
};

GeneralSnackbar.propTypes = {
  message: PropTypes.string,
  open: PropTypes.bool,
  bar: any,
  onClose: PropTypes.any,
};

export default GeneralSnackbar;
