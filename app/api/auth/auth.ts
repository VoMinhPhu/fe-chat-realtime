import { AxiosError } from 'axios';
import axiosInstance from '@/lib/axios';
import { loginData, signUpData } from '@/types/userType';

export const signUpFn = async (account: signUpData) => {
  try {
    const { data } = await axiosInstance.post('/auth/sign-up', account);
    return data;
  } catch (error: unknown) {
    handleApiError(error as AxiosError);
  }
};

export const loginFn = async (account: loginData) => {
  try {
    const { data } = await axiosInstance.post('/auth/sign-in', account);
    return data;
  } catch (error: unknown) {
    handleApiError(error as AxiosError);
  }
};

export const verifyFn = async (dataOtp: { activeCode: string }) => {
  try {
    const { data } = await axiosInstance.post('/auth/verify', dataOtp);
    return data;
  } catch (error: unknown) {
    handleApiError(error as AxiosError);
  }
};

export const resendOtpFn = async () => {
  try {
    const { data } = await axiosInstance.post('/auth/new-otp');
    return data;
  } catch (error: unknown) {
    handleApiError(error as AxiosError);
  }
};

const handleApiError = (error: AxiosError) => {
  if (error.response) {
    throw error.response.data;
  } else {
    throw { message: 'Unexpected error occurred', statusCode: 500 };
  }
};
