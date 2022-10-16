import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from './GeneralSnackbar';
import useStyle from './styles';

type Props = {
  message: string;
  open: boolean;
  onClose: () => void;
};

const Error: React.FC<Props> = ({ message, open, onClose }) => {
  const styles = useStyle();

  const Bar = () => {
    return <div className={`${styles.bar} bg-error`}></div>;
  };

  return (
    <Snackbar bar={<Bar />} message={message} open={open} onClose={onClose} />
  );
};

Error.defaultProps = {
  message: undefined,
  open: false,
  onClose: () => null,
};

Error.propTypes = {
  message: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.any,
};

export default Error;
