import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from './GeneralSnackbar';
import useStyle from './styles';

type Props = {
  message: string;
  open: boolean;
  onClose: () => void;
};

const Success: React.FC<Props> = ({ message, open, onClose }) => {
  const styles = useStyle();

  const Bar = () => {
    return <div className={`${styles.bar} bg-success`}></div>;
  };

  return (
    <Snackbar bar={<Bar />} message={message} open={open} onClose={onClose} />
  );
};

Success.defaultProps = {
  message: undefined,
  open: false,
  onClose: () => null,
};

Success.propTypes = {
  message: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.any,
};

export default Success;
