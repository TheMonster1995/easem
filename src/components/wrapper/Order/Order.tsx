import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import React from 'react';
import { TOrder } from 'store/ordersContext';
import { totalCal } from 'utils';
import OrderRow from './OrderRow';

type Props = {
  data: TOrder;
  onEdit: (orderId: string) => void;
};

const Order: React.FC<Props> = ({ data, onEdit }) => {
  const renderOrderRows = () =>
    data.orders.map((row) => <OrderRow data={row} key={row.label} />);
  const renderTotal = () => {
    const total = totalCal(data.orders);

    return (
      <OrderRow
        data={{ label: 'مجموع', price: total, count: 0 }}
        total={true}
      />
    );
  };
  return (
    <Card>
      <CardHeader className="relative">
        <Button
          className="absolute top-4 left-4 rounded-full font-semibold text-sm bg-red-600 hover:bg-red-300 text-primary"
          variant="outlined"
        >
          <FontAwesomeIcon icon={faTimes} className="mr-2" />
          جدید
        </Button>
        <Typography className="font-semibold text-primary">
          میز شماره {data.table}
        </Typography>
        <Typography className="text-sm font-semibold text-gray-500">
          سفارش شماره {data.order_id}
        </Typography>
      </CardHeader>
      <CardContent>
        {data.orders ? renderOrderRows() : null}
        {data.orders ? renderTotal() : null}
      </CardContent>
      <CardActionArea>
        <Button>تحویل</Button>
        <Button onClick={onEdit.bind(this, data.order_id)}>ویرایش</Button>
      </CardActionArea>
    </Card>
  );
};

export default Order;
