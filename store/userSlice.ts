import { CurrUser } from '@/types/userType';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  currUser: {
    id: string;
    name: string;
    gender: string;
    avatar: string;
    username: string;
    dateOfBirth: string;
    phoneNumber: string;
  };
  userSending: {
    id: string;
    name: string;
    avatar: string;
    chatId?: string;
  };
}

const initialState: UserState = {
  currUser: {
    id: '',
    name: '',
    gender: '',
    avatar: '',
    username: '',
    dateOfBirth: '',
    phoneNumber: '',
  },
  userSending: {
    id: '',
    name: '',
    avatar: '',
    chatId: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrUser: (state, action: PayloadAction<{ data: CurrUser }>) => {
      state.currUser.id = action.payload.data._id;
      state.currUser.name = action.payload.data.name;
      state.currUser.avatar = action.payload.data.avatar;
      state.currUser.username = action.payload.data.username;
      state.currUser.dateOfBirth = action.payload.data.dateOfBirth;
      state.currUser.gender = action.payload.data.gender;
      state.currUser.phoneNumber = action.payload.data.phoneNumber;
    },
    setSendingUser: (state, action: PayloadAction<{ _id: string; name: string; avatar: string; chatId: string }>) => {
      state.userSending.id = action.payload._id;
      state.userSending.name = action.payload.name;
      state.userSending.avatar = action.payload.avatar;
      state.userSending.chatId = action.payload.chatId;
    },
    resetUser: () => initialState,
  },
});

export const { setCurrUser, setSendingUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
