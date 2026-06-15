import { RootState } from '../store';

export const getIngredients = (state: RootState) => state.ingredients.items;
export const getIngredientsLoading = (state: RootState) =>
  state.ingredients.isLoading;
export const getIngredientsError = (state: RootState) =>
  state.ingredients.error;

export const getConstructorItems = (state: RootState) =>
  state.burgerConstructor;

export const getUser = (state: RootState) => state.user.user;
export const getIsAuthChecked = (state: RootState) => state.user.isAuthChecked;
export const getUserError = (state: RootState) => state.user.error;
export const getUpdateUserError = (state: RootState) =>
  state.user.updateUserError;

export const getFeed = (state: RootState) => state.orders.feed;
export const getFeedOrders = (state: RootState) => state.orders.feed.orders;
export const getFeedLoading = (state: RootState) => state.orders.isFeedLoading;
export const getProfileOrders = (state: RootState) =>
  state.orders.profileOrders;
export const getProfileOrdersLoading = (state: RootState) =>
  state.orders.isProfileOrdersLoading;
export const getCurrentOrder = (state: RootState) => state.orders.currentOrder;
export const getOrderLoading = (state: RootState) =>
  state.orders.isOrderLoading;
