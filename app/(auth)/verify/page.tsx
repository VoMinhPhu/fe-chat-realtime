'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useResendOtp, useVerify } from '@/utils/auth';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const formVerify = z.object({
  activeCode: z.string(),
});

const Page = () => {
  const router = useRouter();
  const { mutate: verifyFunc } = useVerify();
  const { mutate: resendOtpFn } = useResendOtp();

  useEffect(() => {
    const isLogin = localStorage.getItem('isLogin');
    const isActive = localStorage.getItem('isActive');
    if (isLogin === 'true') {
      if (isActive === 'true') setTimeout(() => router.push('/dashboard'), 500);
    } else {
      setTimeout(() => router.push('/sign-in'), 500);
    }
  }, [router]);

  const form = useForm<z.infer<typeof formVerify>>({
    resolver: zodResolver(formVerify),
    defaultValues: {
      activeCode: '',
    },
  });

  const resenOtp = () => {
    resendOtpFn();
  };

  function onSubmit(values: z.infer<typeof formVerify>) {
    verifyFunc({
      activeCode: values.activeCode,
    });
  }

  return (
    <div>
      <div className="fixed top-0 h-24 w-full flex items-center justify-center border-b shadow-md bg-primary-foreground dark:bg-[#1e1e1e]">
        <div className="max-w-[1200px] h-full w-full flex items-center justify-between mx-2">
          <Link href="/">
            <Image priority src="/logo.svg" width={50} height={39} alt="logo" className="w-auto" />
          </Link>
        </div>
      </div>
      <div className="flex items-start justify-center h-[calc(100vh-96px)] mt-24 bg-[#f7f9fc] dark:bg-[#121212]">
        <Card className="flex flex-col mt-6 w-full sm:w-[580px] h-auto py-10 px-6 sm:p-8 rounded-3xl sm:rounded-lg shadow-md">
          <CardHeader>
            <CardTitle className="text-center mb-2">Verify your account</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="activeCode"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between items-center pb-2">
                        <FormLabel className="font-semibold text-base">Active code</FormLabel>
                        <Button onClick={resenOtp} variant="outline" type="button">
                          Send OTP again
                        </Button>
                      </div>
                      <FormControl>
                        <Input placeholder="Enter your active code..." {...field} />
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
      </div>
    </div>
  );
};

export default Page;
