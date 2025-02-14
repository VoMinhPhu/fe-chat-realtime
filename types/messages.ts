export type GetAllChatBoxResponseDataType = {
  _id: string;
  type: string;
  members: Array<string>;
  lastMessage: null | {
    content: string;
    fromUser: string;
    status: string;
    createdAt: string;
  };
  toUser: {
    _id: string;
    name: string;
    avatar: string;
  };
};

export type DetailChatMessageType = {
  _id: string;
  fromUser: string;
  toUser: string;
  chatId: string;
  content: string;
  type: string;
  status: string;
  createdAt: Date;
  updatedAt?: Date;
};

export type CurrentChatboxType = {
  chatId: string;
  detailChat: DetailChatMessageType[];
};

export type DataResponseFromSocketType = {
  status: string;
  message: DetailChatMessageType;
};

export type ReceiveMessagesFromSocketType = {
  chatId: string;
  data: DetailChatMessageType;
};
