'use client';

import { showToast } from '@/lib/toast';
import { useRouter } from 'next/navigation';
import { errorResponse } from '@/types/errorRes';
import {
  changePasswordFn,
  changePasswordWithOutPassFn,
  forgotPasswordFn,
  loginFn,
  resendOtpFn,
  resendOtpToChangePasswordFn,
  signUpFn,
  verifyFn,
  verifyForgotPasswordFn,
} from '@/app/api/auth/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { resetUser } from '@/store/userSlice';
import { resetDashboard } from '@/store/dashboardSlice';
import { resetChat } from '@/store/chatboxSlice';

const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isLogin');
    localStorage.removeItem('isActive');
    queryClient.invalidateQueries({ queryKey: ['user'] });
    queryClient.invalidateQueries({ queryKey: ['chat'] });
    queryClient.invalidateQueries({ queryKey: ['friends'] });
    queryClient.invalidateQueries({ queryKey: ['request'] });
    queryClient.invalidateQueries({ queryKey: ['requestSent'] });
    dispatch(resetUser());
    dispatch(resetDashboard());
    dispatch(resetChat());
    router.push('/');
  };

  return logout;
};

const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginFn,
    onSuccess: (data) => {
      localStorage.setItem('isLogin', 'true');
      localStorage.setItem('isActive', data.isActive);
      localStorage.setItem('token', data.access_token);

      queryClient.invalidateQueries({ queryKey: ['user'] });
      showToast('Login', 'Login Successfully!');
      if (data.isActive) {
        setTimeout(() => router.push('/dashboard'), 500);
      } else setTimeout(() => router.push('/verify'), 500);
    },
    onError: (error: errorResponse) => {
      if (error.statusCode === 401) {
        showToast('Login fail', error.message, 'error');
      } else {
        showToast('Login fail', 'Can not login', 'error');
      }
    },
  });
};

const useRegister = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signUpFn,
    onSuccess: (data) => {
      localStorage.setItem('isLogin', 'true');
      localStorage.setItem('isActive', data.isActive);
      localStorage.setItem('token', data.access_token);

      queryClient.invalidateQueries({ queryKey: ['signUp'] });
      showToast('Sign Up Account', 'Sign up Successfully!');
      setTimeout(() => router.push('/verify'), 1000);
    },
    onError: (error: errorResponse) => {
      if (error.statusCode === 409) {
        showToast('Sign Up Account', error.message, 'error');
      } else {
        showToast('Sign Up Account', 'Can not create account', 'error');
      }
    },
  });
};

const useVerify = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: verifyFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['verify'] });
      showToast('Verify Account', 'Verify Successfully!');
      localStorage.setItem('isActive', 'true');
      setTimeout(() => router.push('/sign-in'), 1000);
    },
    onError: (error: errorResponse) => {
      showToast('Verify Account', error.message, 'error');
    },
  });
};

const useResendOtp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resendOtpFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resendOtp'] });
      showToast('Resend OTP', 'Resend OTP Successfully!');
    },
    onError: (error: errorResponse) => {
      showToast('Resend OTP', error.message, 'error');
    },
  });
};

const useResendOtpToChangePassword = () => {
  return useMutation({
    mutationFn: resendOtpToChangePasswordFn,
    onSuccess: () => {
      showToast('Resend OTP', 'Resend OTP Successfully!');
    },
    onError: (error: errorResponse) => {
      showToast('Resend OTP', error.message, 'error');
    },
  });
};

const useChangePassword = () => {
  return useMutation({
    mutationFn: changePasswordFn,
    onSuccess: () => {
      showToast('Change password', 'Successfully!');
    },
    onError: (error: errorResponse) => {
      showToast('Change password', error.message, 'error');
    },
  });
};

const useChangePasswordWithoutOldPass = () => {
  return useMutation({
    mutationFn: changePasswordWithOutPassFn,
    onSuccess: () => {
      showToast('Change password', 'Successfully!');
    },
    onError: (error: errorResponse) => {
      showToast('Change password', error.message, 'error');
    },
  });
};

const useVerifyForgotPassword = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: verifyForgotPasswordFn,
    onSuccess: (data) => {
      localStorage.setItem('isLogin', 'true');
      localStorage.setItem('isActive', data.isActive);
      localStorage.setItem('token', data.access_token);

      queryClient.invalidateQueries({ queryKey: ['user'] });
      showToast('Verify', 'Successfully!');
    },
    onError: (error: errorResponse) => {
      showToast('Verify', error.message, 'error');
    },
  });
};

const useForgotPassword = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: forgotPasswordFn,
    onSuccess: () => {
      showToast('Forgot password', 'Sent OTP to email!');
      setTimeout(() => router.push('/forgot-password/change-password'), 500);
    },
    onError: (error: errorResponse) => {
      showToast('Forgot password', error.message, 'error');
    },
  });
};

export {
  useLogin,
  useLogout,
  useRegister,
  useVerify,
  useResendOtp,
  useChangePassword,
  useChangePasswordWithoutOldPass,
  useForgotPassword,
  useResendOtpToChangePassword,
  useVerifyForgotPassword,
};
