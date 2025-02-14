export type signUpData = {
  username: string;
  name: string;
  password: string;
};

export type loginData = {
  username: string;
  password: string;
};

export type CurrUser = {
  _id: string;
  name: string;
  gender: string;
  avatar: string;
  username: string;
  dateOfBirth: string;
  phoneNumber: string;
};

export type UpdateCurrUserInfo = {
  name?: string;
  gender?: string;
  dateOfBirth?: string;
  phoneNumber?: string;
};
