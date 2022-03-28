import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { AppComponentSlice } from './reducers/app-components-reducer';
import { CurrentUserSlice } from './reducers/current-user-reducer';

const store = configureStore({
  reducer: {
    appComponent: AppComponentSlice.reducer,
    currentUser: CurrentUserSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;