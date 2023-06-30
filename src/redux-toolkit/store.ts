import { configureStore } from '@reduxjs/toolkit';
import dataSliceReducer from './dataSlice';

import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { combineReducers } from 'redux';

const persistConfig = {
  key: 'root',
  storage,
}

const reducer = combineReducers({
  data: dataSliceReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ยกเว้นการตรวจสอบค่าที่ไม่สามารถ serialize ได้
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
