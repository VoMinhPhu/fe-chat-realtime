'use client';

import { z } from 'zod';
import { Card } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useChangePassword } from '@/utils/auth';

const formChangePassword = z
  .object({
    oldPassword: z.string().min(6, {
      message: 'Password must contain at least 6 characters.',
    }),
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

const TabChangePassword = () => {
  const { mutate: changePasswordFn } = useChangePassword();

  const form = useForm<z.infer<typeof formChangePassword>>({
    resolver: zodResolver(formChangePassword),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  function onSubmit(values: z.infer<typeof formChangePassword>) {
    console.log(values.newPassword);
    changePasswordFn({
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    });
  }
  return (
    <div>
      <div className="mb-[136px]">
        <p className="font-bold text-3xl mb-14">Change password</p>
        <Card>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-8">
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Old pasword <span className="text-red-500 font-semibold ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-9 w-4/5 mx-auto"
                        type="password"
                        placeholder="Enter your old password..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      New password <span className="text-red-500 font-semibold ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-9 w-4/5 mx-auto"
                        type="password"
                        placeholder="Enter new password..."
                        {...field}
                      />
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
                      <Input
                        className="h-9 w-4/5 mx-auto"
                        type="password"
                        placeholder="Confirm new password..."
                        {...field}
                      />
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
        </Card>
      </div>
    </div>
  );
};

export default TabChangePassword;
