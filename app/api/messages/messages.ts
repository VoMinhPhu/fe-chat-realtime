import axiosInstance from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const handleApiError = (error: AxiosError) => {
  if (error.response) {
    throw error.response.data;
  } else {
    throw { message: 'Unexpected error occurred', statusCode: 500 };
  }
};

const getAllchatBox = async () => {
  try {
    const { data } = await axiosInstance.get('/chat/get-all-chats');
    return data;
  } catch (error: unknown) {
    handleApiError(error as AxiosError);
  }
};

export const useGetAllChatBox = () => {
  return useQuery({
    queryKey: ['chat'],
    queryFn: getAllchatBox,
    staleTime: 30 * 1000 * 60,
  });
};

const getDetailchat = async (chatId: string) => {
  try {
    const { data } = await axiosInstance.get(`/chat/get-detail-chats/${chatId}`);
    return data;
  } catch (error: unknown) {
    handleApiError(error as AxiosError);
  }
};

export const useGetDetailChat = (chatId: string) => {
  return useQuery({
    queryKey: ['chat', chatId],
    queryFn: () => getDetailchat(chatId),
    staleTime: 30 * 1000 * 60,
  });
};
