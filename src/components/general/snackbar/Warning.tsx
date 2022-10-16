import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from './GeneralSnackbar';
import useStyle from './styles';

type Props = {
  message: string;
  open: boolean;
  onClose: () => void;
};

const Warning: React.FC<Props> = ({ message, open, onClose }) => {
  const styles = useStyle();

  const Bar = () => {
    return <div className={`${styles.bar} bg-warning`}></div>;
  };

  return (
    <Snackbar bar={<Bar />} message={message} open={open} onClose={onClose} />
  );
};

Warning.defaultProps = {
  message: undefined,
  open: false,
  onClose: () => null,
};

Warning.propTypes = {
  message: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.any,
};

export default Warning;
