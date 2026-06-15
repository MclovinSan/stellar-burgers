import { FC, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { BurgerConstructorUI } from '@ui';
import { getConstructorItems, getUser } from '@selectors';
import { fetchFeed, fetchProfileOrders } from '@slices/ordersSlice';
import { closeOrderModal, createOrder } from '@slices/constructorSlice';
import { TConstructorIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(getUser);
  const constructorItems = useSelector(getConstructorItems);
  const { orderRequest, orderModalData } = constructorItems;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) {
      return;
    }

    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }

    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun._id
    ];

    dispatch(createOrder(ingredientIds))
      .unwrap()
      .then(() => {
        dispatch(fetchFeed());
        dispatch(fetchProfileOrders());
      })
      .catch(() => {});
  };

  const handleCloseOrderModal = () => {
    dispatch(closeOrderModal());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (sum: number, ingredient: TConstructorIngredient) =>
          sum + ingredient.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={handleCloseOrderModal}
    />
  );
};
