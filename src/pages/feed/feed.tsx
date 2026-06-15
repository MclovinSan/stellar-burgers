import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { getFeedLoading, getFeedOrders } from '@selectors';
import { fetchFeed } from '@slices/ordersSlice';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(getFeedOrders);
  const isLoading = useSelector(getFeedLoading);

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(fetchFeed());
  };

  if (isLoading && !orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
