import { configureStore } from '@reduxjs/toolkit';
import {
  useDispatch as useDefaultDispatch,
  useSelector as useDefaultSelector
} from 'react-redux';
import ingredientsReducer from './slices/ingredientsSlice';
import userReducer from './slices/userSlice';
import constructorReducer from './slices/constructorSlice';
import ordersReducer from './slices/ordersSlice';

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    user: userReducer,
    burgerConstructor: constructorReducer,
    orders: ordersReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = useDefaultDispatch.withTypes<AppDispatch>();
export const useSelector = useDefaultSelector.withTypes<RootState>();

export default store;
