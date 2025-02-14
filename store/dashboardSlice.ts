import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface DashboardState {
  page: string;
  messagesId: string;
}

const initialState: DashboardState = {
  page: 'messages',
  messagesId: '',
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
  },
});

// Action creators are generated for each case reducer function
export const { setDashboardPage, setMessageId, resetDashboard } = dashboardSlice.actions;

export default dashboardSlice.reducer;
