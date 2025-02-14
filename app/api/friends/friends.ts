import { AxiosError } from 'axios';
import axiosInstance from '@/lib/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { showToast } from '@/lib/toast';

const addFriendFnc = async (payload: { username: string }) => {
  try {
    const { data } = await axiosInstance.post('/request/add-friend', payload);
    return data;
  } catch (error: unknown) {
    handleApiError(error as AxiosError);
  }
};

export const useAddFriend = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addFriendFnc,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['request'] });
      queryClient.invalidateQueries({ queryKey: ['requestSent'] });
      showToast('Send a request to add friends', data.message);
    },
    onError: (error) => {
      console.log('error', error);
      showToast('', error.message, 'error');
    },
  });
};

const getAllFriends = async () => {
  try {
    const { data } = await axiosInstance.get('/friends/get-all-friends');
    return data;
  } catch (error: unknown) {
    handleApiError(error as AxiosError);
  }
};

export const useGetAllFriend = () => {
  return useQuery({
    queryKey: ['friends'],
    queryFn: getAllFriends,
    staleTime: 60 * 1000 * 60,
  });
};

const handleApiError = (error: AxiosError) => {
  if (error.response) {
    throw error.response.data;
  } else {
    throw { message: 'Unexpected error occurred', statusCode: 500 };
  }
};
