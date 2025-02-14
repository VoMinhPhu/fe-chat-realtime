import { CurrentChatboxType, GetAllChatBoxResponseDataType } from '@/types/messages';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  needFetchMessage: string[];
  chatBoxJoined: string[];
  allChatBox: GetAllChatBoxResponseDataType[];
  listChatBox: CurrentChatboxType[];
}

const initialState: UserState = {
  needFetchMessage: [],
  chatBoxJoined: [],

  // message dashboard
  allChatBox: [],

  //  render message
  listChatBox: [],
};

export const chatBoxJoinedSlice = createSlice({
  name: 'chatBoxJoined',
  initialState,
  reducers: {
    setChatBoxJoined: (state, action: PayloadAction<string>) => {
      state.chatBoxJoined = [...state.chatBoxJoined, action.payload];
    },

    setListChatBox: (state, action: PayloadAction<CurrentChatboxType>) => {
      state.listChatBox.push(action.payload);
    },
    setDetailChatInList: (state, action: PayloadAction<CurrentChatboxType>) => {
      state.listChatBox = state.listChatBox.map((chatBox) => {
        return chatBox.chatId === action.payload.chatId
          ? { ...chatBox, detailChat: action.payload.detailChat }
          : chatBox;
      });
    },
    setStatusSeenForChatBox: (state, action: PayloadAction<{ chatId: string | undefined }>) => {
      state.listChatBox = state.listChatBox.map((chatBox) => {
        if (chatBox.chatId === action.payload.chatId) {
          chatBox.detailChat = chatBox.detailChat.map((mess) => ({
            ...mess,
            status: 'seen',
          }));
        }
        return chatBox;
      });
      state.allChatBox = state.allChatBox.map((chatBox) => {
        if (chatBox._id === action.payload.chatId) {
          chatBox.lastMessage = {
            ...chatBox.lastMessage,
            content: chatBox.lastMessage?.content || '',
            fromUser: chatBox.lastMessage?.fromUser || '',
            createdAt: chatBox.lastMessage?.createdAt || '',
            status: 'seen',
          };
        }
        return chatBox;
      });
    },

    setAllChatBox: (state, action: PayloadAction<GetAllChatBoxResponseDataType[]>) => {
      state.allChatBox = action.payload;
    },
    updateLastMessage: (
      state,
      action: PayloadAction<{
        _id: string;
        lastMessage: {
          content: string;
          fromUser: string;
          status: string;
          createdAt: string;
        };
      }>,
    ) => {
      state.allChatBox = state.allChatBox.map((item) => {
        return item._id === action.payload._id
          ? {
              ...item,
              lastMessage: action.payload.lastMessage,
            }
          : item;
      });
    },

    setNeedFetchMessage: (state, action: PayloadAction<string[]>) => {
      state.needFetchMessage.push(...action.payload);
    },
    removeItemInNeedFetch: (state, action: PayloadAction<string>) => {
      state.needFetchMessage = state.needFetchMessage.filter((item) => item !== action.payload);
    },

    resetChat: () => initialState,

    resetChatBoxJoined: (state) => {
      state.chatBoxJoined = [];
    },

    resetListChatBox: (state) => {
      state.listChatBox = [];
    },
  },
});

export const {
  setChatBoxJoined,
  setListChatBox,
  setDetailChatInList,
  setAllChatBox,
  resetChat,
  resetChatBoxJoined,
  resetListChatBox,
  setNeedFetchMessage,
  removeItemInNeedFetch,
  updateLastMessage,
  setStatusSeenForChatBox,
} = chatBoxJoinedSlice.actions;

export default chatBoxJoinedSlice.reducer;
