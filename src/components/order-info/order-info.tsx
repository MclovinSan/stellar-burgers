import { FC, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  getCurrentOrder,
  getFeedOrders,
  getIngredients,
  getOrderLoading,
  getProfileOrders
} from '@selectors';
import { fetchOrderByNumber } from '@slices/ordersSlice';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';

export const OrderInfo: FC = () => {
  const { number } = useParams();
  const orderNumber = Number(number);
  const dispatch = useDispatch();
  const ingredients = useSelector(getIngredients);
  const feedOrders = useSelector(getFeedOrders);
  const profileOrders = useSelector(getProfileOrders);
  const currentOrder = useSelector(getCurrentOrder);
  const isOrderLoading = useSelector(getOrderLoading);
  const [requestedNumber, setRequestedNumber] = useState<number | null>(null);

  const orderData =
    feedOrders.find((order) => order.number === orderNumber) ||
    profileOrders.find((order) => order.number === orderNumber) ||
    (currentOrder?.number === orderNumber ? currentOrder : null);

  useEffect(() => {
    if (
      !Number.isNaN(orderNumber) &&
      !orderData &&
      requestedNumber !== orderNumber
    ) {
      setRequestedNumber(orderNumber);
      dispatch(fetchOrderByNumber(orderNumber));
    }
  }, [dispatch, orderData, orderNumber, requestedNumber]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) {
      return null;
    }

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (Number.isNaN(orderNumber)) {
    return <p className='text text_type_main-medium pt-10'>Заказ не найден</p>;
  }

  if (!orderInfo) {
    if (
      requestedNumber === orderNumber &&
      !isOrderLoading &&
      orderData === null
    ) {
      return (
        <p className='text text_type_main-medium pt-10'>Заказ не найден</p>
      );
    }

    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
