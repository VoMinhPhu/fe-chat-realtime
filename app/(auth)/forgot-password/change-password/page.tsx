'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

import { useResendOtpToChangePassword, useVerifyForgotPassword } from '@/utils/auth';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { LogIn } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import FormChangePassword from './_components/FormChangePassword';

const formVerify = z.object({
  activeCode: z.string(),
});

const Page = () => {
  const [changePassword, setChangePassword] = useState(false);
  const { mutate: verifyFunc } = useVerifyForgotPassword();
  const { mutate: resendOtpFn } = useResendOtpToChangePassword();
  const userForgotPassword = useSelector((state: RootState) => state.user.userForgotPassword);

  const form = useForm<z.infer<typeof formVerify>>({
    resolver: zodResolver(formVerify),
    defaultValues: {
      activeCode: '',
    },
  });

  const resenOtp = () => {
    resendOtpFn(userForgotPassword);
  };

  function onSubmit(values: z.infer<typeof formVerify>) {
    verifyFunc({
      username: userForgotPassword,
      activeCode: values.activeCode,
    });
    setChangePassword(true);
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
              <Link href="/sign-in">
                <Button>
                  <LogIn />
                  <span className="mr-1">Log in</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-start justify-center h-[calc(100vh-96px)] mt-24 bg-[#f7f9fc] dark:bg-[#121212]">
        {!changePassword && (
          <Card className="flex flex-col mt-6 w-full sm:w-[580px] h-auto py-10 px-6 sm:p-8 rounded-3xl sm:rounded-lg shadow-md">
            <CardHeader>
              <CardTitle className="text-center mb-2">Confirm OTP to change password</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="font-semibold mb-1">Username</div>
                <div className="border p-2 rounded-sm bg-[#f2f2f2]">{userForgotPassword}</div>
              </div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="activeCode"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex justify-between items-center pb-2">
                          <FormLabel className="font-semibold text-base">Verify code</FormLabel>
                          <Button onClick={resenOtp} variant="outline" type="button">
                            Send OTP again
                          </Button>
                        </div>
                        <FormControl>
                          <Input placeholder="Enter your verify code..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="text-center gap-4">
                    <Button className="mt-4 w-full" type="submit">
                      Verify
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}
        {changePassword && <FormChangePassword />}
      </div>
    </div>
  );
};

export default Page;
