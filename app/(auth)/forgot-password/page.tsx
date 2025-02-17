'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useDispatch } from 'react-redux';
import { setUserForgotPassword } from '@/store/userSlice';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForgotPassword } from '@/utils/auth';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const formForgotPassword = z.object({
  username: z.string().email({
    message: 'Username must be email',
  }),
});

const Page = () => {
  const router = useRouter();
  const { mutate: forgotPasswordFn } = useForgotPassword();
  const dispatch = useDispatch();

  useEffect(() => {
    const isLogin = localStorage.getItem('isLogin');
    if (isLogin === 'true') {
      setTimeout(() => router.push('/dashboard'), 500);
    }
  }, [router]);

  const form = useForm<z.infer<typeof formForgotPassword>>({
    resolver: zodResolver(formForgotPassword),
    defaultValues: {
      username: '',
    },
  });

  function onSubmit(values: z.infer<typeof formForgotPassword>) {
    dispatch(setUserForgotPassword(values.username));
    forgotPasswordFn({ username: values.username });
  }

  return (
    <div>
      <div className="fixed top-0 h-24 w-full flex items-center justify-center border-b shadow-md bg-primary-foreground dark:bg-[#1e1e1e]">
        <div className="max-w-[1200px] h-full w-full flex items-center justify-between mx-2">
          <Link href="/">
            <Image priority src="/logo.svg" width={50} height={39} alt="logo" className="w-auto" />
          </Link>
          <div className="flex">
            <div>
              <Link href="/sign-up">
                <Button>Sign up</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-start justify-center h-[calc(100vh-96px)] mt-24 bg-[#f7f9fc] dark:bg-[#121212]">
        <Card className="flex flex-col mt-6 w-full sm:w-[580px] h-auto py-10 px-6 sm:p-8 rounded-3xl sm:rounded-lg shadow-md">
          <CardHeader>
            <CardTitle className="text-center mb-2">Forgot password</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your username..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="text-center">
                  <Button className="mt-4 w-full" type="submit">
                    Change password
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

export default Page;
