'use client';

import Heading from '@/components/Heading';
import Status from '@/components/Status';
import { formatPrice } from '@/lib/formatPrice';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import {
  MdAccessTimeFilled,
  MdCancel,
  MdDeliveryDining,
  MdDone,
} from 'react-icons/md';
import { useEffect, useState } from 'react';
import orderApi from '@/apis/orderApi';
import OrderItem from './OrderItem';

interface OrderDetailProps {
  order?: Order;
  orderId: string | undefined;
}

const OrderDetail = ({ orderId }: OrderDetailProps) => {
  const [order, setOrder] = useState<Order>();

  useEffect(() => {
    const getOrderById = async () => {
      const response = await orderApi.getOrderById(orderId);
      console.log('-------------------->', response);
      setOrder(response.data);
    };
    getOrderById();
  }, []);
  console.log('-------------------->', order);

  return (
    <>
      <div className="max-w-[1150px] m-auto flex flex-col gap-2">
        <div className="mt-8">
          <Heading title="Order Detail" />
        </div>
        <div>Order ID: {order?.id}</div>
        <div>
          Total Amount:{' '}
          <span className="font-bold">{formatPrice(order?.totalPrice)}</span>
        </div>
        <div className="flex gap-2 items-center ">
          <div>Payment status</div>
          <div>
            {order?.status === 'PENDING' ? (
              <Status
                text="pending"
                icon={MdAccessTimeFilled}
                bg="bg-slate-200"
                color="text-slate-700"
              />
            ) : order?.status === 'COMPLEATE' ? (
              <Status
                text="completed"
                icon={MdDone}
                bg="bg-green-200"
                color="text-green-700"
              />
            ) : order?.status === 'CANCEL' ? (
              <Status
                text="cancel"
                icon={MdCancel}
                bg="bg-green-200"
                color="text-green-700"
              />
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="flex gap-2 items-center ">
          <div>Delivery status</div>
          <div>
            {order?.deliveryStatus === 'PENDING' ? (
              <Status
                text="pending"
                icon={MdAccessTimeFilled}
                bg="bg-slate-200"
                color="text-slate-700"
              />
            ) : order?.deliveryStatus === 'DISPATCHED' ? (
              <Status
                text="dispatch"
                icon={MdDeliveryDining}
                bg="bg-purple-200"
                color="text-purple-700"
              />
            ) : order?.deliveryStatus === 'DELIVERED' ? (
              <Status
                text="delivered"
                icon={MdDone}
                bg="bg-green-200"
                color="text-green-700"
              />
            ) : (
              <></>
            )}
          </div>
        </div>
        <div>Date: {moment(order?.orderDate).fromNow()}</div>
        <div>
          <h2 className="font-semibold mt-4 mb-2">Product ordered</h2>
          <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center">
            <div className="col-span-2 justify-self-start">PRODUCT</div>
            <div className=" justify-self-center">PRICE</div>
            <div className=" justify-self-center">QTY</div>
            <div className=" justify-self-end">TOTAL</div>
          </div>
          {order?.orderItems &&
            order.orderItems.map((item) => {
              return (
                <OrderItem
                  productId={item.productId}
                  key={item.productId}
                  qty={item.quantity}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
