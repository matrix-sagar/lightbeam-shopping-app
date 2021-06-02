import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productsSlice'

const store=configureStore({
  reducer: {
    shop: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
