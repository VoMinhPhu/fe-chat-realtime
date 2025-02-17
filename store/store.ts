import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './dashboardSlice';
import userReducer from './userSlice';
import chatBoxJoinedSlice from './chatboxSlice';
import settingStoreSlice from './settingStoreSlice';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    user: userReducer,
    chatBox: chatBoxJoinedSlice,
    settingTab: settingStoreSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
