import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface TabState {
  currTab: string;
  openNav: boolean;
}

const initialState: TabState = {
  currTab: 'profile',
  openNav: false,
};

export const tabSettingSlice = createSlice({
  name: 'tabSetting',
  initialState,
  reducers: {
    setCurrTab: (state, action: PayloadAction<{ data: string }>) => {
      state.currTab = action.payload.data;
    },
    setOpenNav: (state, action: PayloadAction<boolean>) => {
      state.openNav = action.payload;
    },
  },
});

export const { setCurrTab, setOpenNav } = tabSettingSlice.actions;

export default tabSettingSlice.reducer;
