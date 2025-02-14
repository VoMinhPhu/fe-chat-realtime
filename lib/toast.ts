'use client';

import { toast } from '@/hooks/use-toast';

export const showToast = (title: string, description: string, status?: string) => {
  toast({
    title,
    status,
    description,
    duration: 2000,
  });
};
