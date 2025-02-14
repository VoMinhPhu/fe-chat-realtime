import { AxiosError } from 'axios';
import axiosInstance from '@/lib/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { showToast } from '@/lib/toast';

const handleApiError = (error: AxiosError) => {
  if (error.response) {
    throw error.response.data;
  } else {
    throw { message: 'Unexpected error occurred', statusCode: 500 };
  }
};

const getAllRequestWithMe = async () => {
  try {
    const { data } = await axiosInstance.get('/request/get-all-request-with-me');
    return data;
  } catch (error: unknown) {
    handleApiError(error as AxiosError);
  }
};

export const useGetAllRequestWithMe = () => {
  return useQuery({
    queryKey: ['request'],
    queryFn: getAllRequestWithMe,
    staleTime: 5 * 1000 * 60,
  });
};

const handleRequest = async (data: { requestId: string; status: string }) => {
  try {
    const { data: responseData } = await axiosInstance.post('/request/handle-request', data);
    return responseData;
  } catch (error: unknown) {
    handleApiError(error as AxiosError);
  }
};

export const useHandleRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: handleRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['request'] });
      queryClient.invalidateQueries({ queryKey: ['chat'] });
      showToast('Handle Request', 'Successfully!');
    },
    onError: () => {
      showToast('Handle Request', 'Have some error from server, try again!', 'error');
    },
  });
};

const getRequestSent = async () => {
  try {
    const { data } = await axiosInstance.get('/request/get-request-sent');
    return data;
  } catch (error: unknown) {
    handleApiError(error as AxiosError);
  }
};

export const useGetRequestSent = () => {
  return useQuery({
    queryKey: ['requestSent'],
    queryFn: getRequestSent,
    staleTime: 5 * 1000 * 60,
  });
};

const cancelRequest = async (data: { requestId: string }) => {
  try {
    const { data: responseData } = await axiosInstance.post('/request/cancel-request', data);
    return responseData;
  } catch (error: unknown) {
    handleApiError(error as AxiosError);
  }
};

export const useCancelRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cancelRequest,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['requestSent'] });
      showToast('Cancel Request', data.message);
    },
    onError: () => {
      showToast('Cancel Request', 'Have some error from server, try again!', 'error');
    },
  });
};
