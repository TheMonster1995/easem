import React from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

import NumberDisplay from 'components/general/NumberDisplay';
import { TMenuItem } from 'components/hooks/useMenu';
import ToggleCmp from './ToggleCmp';

type Props = {
  item: TMenuItem;
  onAction: (itemId: string, action: string) => void;
};

const Item: React.FC<Props> = ({ item, onAction }) => {
  return (
    <Card className="mr-20 mb-10 w-56">
      <CardMedia
        component="img"
        className="h-42"
        image="logo.png" //must be dynamic item.img
        alt="item image"
      />
      <CardContent className="flex flex-col justify-start items-end pt-4 relative">
        <ToggleCmp itemId={item.item_id} isActive={!!item.active} />
        <Typography className="!text-lg font-semibold text-primary my-2">
          {item.label}
        </Typography>
        <Typography className="text-primaryLight my-2">{item.desc}</Typography>
        <Box className="flex justify-start items-center">
          <NumberDisplay num={item.price * 1000} className="text-base" />
          <Typography className="italic text-xs ml-2 font-semibold">
            T
          </Typography>
        </Box>
      </CardContent>
      <CardActions className="justify-around">
        <Button
          className="font-semibold text-light w-full bg-primary hover:text-primary"
          onClick={onAction.bind(this, item.item_id, 'delete')}
        >
          آرشیو
        </Button>
        <Button
          className="font-semibold text-light w-full bg-secondary hover:text-primary"
          onClick={onAction.bind(this, item.item_id, 'edit')}
        >
          ویرایش
        </Button>
      </CardActions>
    </Card>
  );
};

export default Item;
