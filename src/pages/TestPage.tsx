import React from 'react';
import Button from 'components/general/Button';
import { Typography } from '@mui/material';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const TestPage: React.FC = () => {
  return (
    <>
      <h1 className="">Test page</h1>
      <Button text="hi" />
      <Button>
        <Typography>This is a child</Typography>
      </Button>
      <Button
        icon={faTrashAlt}
        iconClassName="text-red-500 text-lg"
        className="p-0 w-auto block"
      />
    </>
  );
};

export default TestPage;
