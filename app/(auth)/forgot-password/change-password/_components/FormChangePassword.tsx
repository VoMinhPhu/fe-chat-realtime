'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useChangePasswordWithoutOldPass } from '@/utils/auth';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const formChangePassword = z
  .object({
    newPassword: z
      .string()
      .min(6, {
        message: 'Password must contain at least 6 characters.',
      })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter.',
      })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter.',
      })
      .regex(/[^A-Za-z0-9]/, {
        message: 'Password must contain at least one special character.',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const FormChangePassword = () => {
  const { mutate: changePasswordFn } = useChangePasswordWithoutOldPass();
  const userForgotPassword = useSelector((state: RootState) => state.user.userForgotPassword);

  const form = useForm<z.infer<typeof formChangePassword>>({
    resolver: zodResolver(formChangePassword),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  function onSubmit(values: z.infer<typeof formChangePassword>) {
    console.log(values);
    changePasswordFn({
      newPassword: values.newPassword,
    });
  }
  return (
    <div>
      <div className="mb-[136px] mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-center ">Change password</CardTitle>
          </CardHeader>
          <CardContent className="px-16 sm:w-[580px] min-w-[400px]">
            <div className="mb-4">
              <div className="font-semibold mb-1">Username</div>
              <div className="border p-2 rounded-sm bg-[#f2f2f2]">{userForgotPassword}</div>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        New password <span className="text-red-500 font-semibold ml-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input className="h-9" type="password" placeholder="Enter new password..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        Confirm password <span className="text-red-500 font-semibold ml-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input className="h-9" type="password" placeholder="Confirm new password..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="text-center">
                  <Button className="mt-4 w-3/5" type="submit">
                    Change pasword
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FormChangePassword;
