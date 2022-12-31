import React from 'react';
import { faCircleDot, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Typography } from '@mui/material';

import useLoader from 'components/hooks/useLoader';
import useMenu from 'components/hooks/useMenu';

type Props = {
  itemId: string;
  isActive: boolean;
};

const ToggleCmp: React.FC<Props> = ({ itemId, isActive }) => {
  const { LoadingWrapper, isLoading, toggleLoading } = useLoader({
    text: '',
  });

  const { toggleItem } = useMenu();

  const handleClick = async () => {
    if (isLoading) return;

    toggleLoading();

    await toggleItem(itemId, !isActive);

    toggleLoading();
  };

  const renderContent = () =>
    isLoading ? (
      <LoadingWrapper />
    ) : (
      <>
        <FontAwesomeIcon
          icon={isActive ? faCircleCheck : faCircleDot}
          size="2x"
          className={isActive ? 'text-primary' : 'text-primaryLight'}
        />
        <Typography className="font-semibold mt-2 text-secondary">
          {isActive ? 'فعال' : 'غیرفعال'}
        </Typography>
      </>
    );

  return (
    <Box
      className="flex flex-col justify-center items-center p-4 hover:cursor-pointer absolute top-0 left-0"
      onClick={handleClick}
    >
      {renderContent()}
    </Box>
  );
};

export default ToggleCmp;
