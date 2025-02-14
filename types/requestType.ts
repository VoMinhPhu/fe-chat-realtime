export type RequestResponseDataType = {
  _id: string;
  toUser: string;
  fromUser: {
    _id: string;
    name: string;
    avatar: string;
  };
};

export type CancelRequestResponseDataType = {
  _id: string;
  fromUser: string;
  toUser: {
    _id: string;
    name: string;
    avatar: string;
  };
};
