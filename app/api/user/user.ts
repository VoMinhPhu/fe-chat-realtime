import { AxiosError } from "axios";
import axiosInstance from "@/lib/axios";
import { CurrUser, UpdateCurrUserInfo } from "@/types/userType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const handleApiError = (error: AxiosError) => {
    if (error.response) {
        throw error.response.data
    } else {
        throw { message: 'Unexpected error occurred', statusCode: 500 };
    }
}


const getInfoCurrUser = async (): Promise<CurrUser | undefined> => {
    try {
        const { data } = await axiosInstance.get('/user/detail');
        return data;
    } catch (error: unknown) {
        handleApiError(error as AxiosError);
    }
};

export const useGetInfoCurrUser = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: getInfoCurrUser,
        staleTime: 30 * 1000 * 60,
    })
}

const updateAvatar = async (avt: FormData) => {
    try {
        const { data } = await axiosInstance.post('/user/update-avatar', avt, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return data
    } catch (error: unknown) {
        handleApiError(error as AxiosError);
    }
}

export const useUpdateAvatar = () => {
    return useMutation({
        mutationFn: updateAvatar,
    })
}

export const updateInfoUser = async (data: UpdateCurrUserInfo) => {
    try {
        const { data: responseData } = await axiosInstance.post('/user/update', data);
        return responseData;
    } catch (error: unknown) {
        handleApiError(error as AxiosError);
    }
}

export const useUpdateInfoUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateInfoUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
        }
    })
}