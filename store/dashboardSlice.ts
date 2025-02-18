import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface DashboardState {
  page: string;
  messagesId: string;
  isOpen: boolean;
}

const initialState: DashboardState = {
  page: 'messages',
  messagesId: '',
  isOpen: true,
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setDashboardPage: (state, action: PayloadAction<string>) => {
      state.page = action.payload;
    },
    setMessageId: (state, action: PayloadAction<string>) => {
      state.messagesId = action.payload;
    },
    resetDashboard: () => initialState,
    setIsOpenDashboard: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDashboardPage, setMessageId, resetDashboard, setIsOpenDashboard } = dashboardSlice.actions;

export default dashboardSlice.reducer;
