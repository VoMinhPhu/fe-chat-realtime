import { useQueryClient } from '@tanstack/react-query';

export const useInvalidateQueries = () => {
  const queryClient = useQueryClient();
  const execute = (queries: string[]) => {
    queryClient.invalidateQueries({ queryKey: queries });
  };
  return execute;
};
