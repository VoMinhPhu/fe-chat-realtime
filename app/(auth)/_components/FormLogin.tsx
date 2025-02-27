'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useLogin } from '@/utils/auth';
import { login } from '@/lib/actions/auth';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const formSignIn = z.object({
  username: z.string().email({
    message: 'Username must be email',
  }),
  password: z.string().min(6, {
    message: 'Password must contain at least 6 character(s)',
  }),
});

const FormLogin = () => {
  const router = useRouter();
  const { mutate: loginFunc } = useLogin();

  useEffect(() => {
    const isLogin = localStorage.getItem('isLogin');
    if (isLogin === 'true') {
      setTimeout(() => router.push('/dashboard'), 500);
    }
  }, [router]);

  const form = useForm<z.infer<typeof formSignIn>>({
    resolver: zodResolver(formSignIn),
    defaultValues: {
      username: '',
      password: '',
    },
  });
  function onSubmit(values: z.infer<typeof formSignIn>) {
    loginFunc(values);
  }
  return (
    <Card className="flex flex-col mt-6 w-full sm:w-[580px] h-auto py-10 px-6 sm:p-8 rounded-3xl sm:rounded-lg shadow-md">
      <CardHeader>
        <CardTitle className="text-center mb-2">Login</CardTitle>
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-right text-[#2563eb] text-sm font-semibold">
              <Link href="/forgot-password">Forgot password?</Link>
            </div>
            <div className="text-center">
              <Button className="mt-4 w-full" type="submit">
                Login
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="px-7 flex flex-col">
        <p className="text-sm mb-5">
          You don&apos;t have an account?
          <Link href="/sign-up" className="text-primary font-semibold ml-2 hover:underline">
            Register now!
          </Link>
        </p>
        <Button onClick={() => login()} variant="outline" className="w-full h-12">
          <Image className="w-7" src="/logo-google.svg" width={49} height={49} alt="Continute with Google" />
          Continute with Google
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FormLogin;
