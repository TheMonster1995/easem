import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from '@mui/material';
import React from 'react';
import { TOrder } from 'store/ordersContext';
import { totalCal } from 'utils';
import OrderRow from './OrderRow';
import Notice from 'components/general/Notice';
import useOrder from 'components/hooks/useOrder';
import useLoader from 'components/hooks/useLoader';

type Props = {
  data: TOrder;
  onEdit: (orderId: string) => void;
};

const Order: React.FC<Props> = ({ data, onEdit }) => {
  const { setSeen, archiveOrder } = useOrder();
  const { LoadingWrapper, isLoading, toggleLoading } = useLoader({
    text: 'تحویل',
  });

  const renderOrderRows = () =>
    data.orders.map((row) => <OrderRow data={row} key={row.label} />);
  const renderTotal = () => {
    const total = totalCal(data.orders);

    return (
      <OrderRow
        data={{
          label: 'مجموع',
          price: total,
          count: 0,
          item_id: `total${data.order_id}`,
        }}
        total={true}
        className="border-t border-primary border-solid pt-2 border-b-0"
      />
    );
  };

  const handleArchive = async () => {
    toggleLoading();

    const gone = await archiveOrder(data.order_id);

    if (gone) return;

    toggleLoading();
  };

  return (
    <Card className="mr-20 mb-10">
      <CardHeader
        title={`میز شماره ${data.table}`}
        subheader={`#${data.order_id}`}
        action={
          !data.new ? null : (
            <Notice
              onClick={setSeen.bind(this, data.order_id)}
              dir="rtl"
              title="جدید"
            />
          )
        }
        dir="rtl"
        titleTypographyProps={{ className: 'font-semibold text-xl' }}
      />
      <CardContent>
        {data.orders ? renderOrderRows() : null}
        {data.orders ? renderTotal() : null}
      </CardContent>
      <CardActions className="justify-around">
        <Button
          className="font-semibold text-light w-full bg-green-600 hover:text-primary"
          onClick={handleArchive}
          disabled={isLoading}
        >
          <LoadingWrapper />
        </Button>
        <Button
          className="font-semibold text-light w-full bg-secondary hover:text-primary"
          onClick={onEdit.bind(this, data.order_id)}
        >
          ویرایش
        </Button>
      </CardActions>
    </Card>
  );
};

export default Order;
