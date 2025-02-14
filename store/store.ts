import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './dashboardSlice';
import userReducer from './userSlice';
import chatBoxJoinedSlice from './chatboxSlice';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    user: userReducer,
    chatBox: chatBoxJoinedSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
