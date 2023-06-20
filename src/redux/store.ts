import { configureStore } from '@reduxjs/toolkit';
import dataSliceReducer from './dataSlice';

const store = configureStore({
  reducer: {
    data: dataSliceReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;