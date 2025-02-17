import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface TabState {
  currTab: string;
}

const initialState: TabState = {
  currTab: 'profile',
};

export const tabSettingSlice = createSlice({
  name: 'tabSetting',
  initialState,
  reducers: {
    setCurrTab: (state, action: PayloadAction<{ data: string }>) => {
      state.currTab = action.payload.data;
    },
  },
});

export const { setCurrTab } = tabSettingSlice.actions;

export default tabSettingSlice.reducer;
