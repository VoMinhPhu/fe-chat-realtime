'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useRegister } from '@/utils/auth';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const formSignUp = z.object({
  username: z.string().email({
    message: 'Username must be email',
  }),
  name: z
    .string()
    .min(1, {
      message: 'Name is not empty!',
    })
    .max(50),
  password: z.string().min(6, {
    message: 'Password must contain at least 6 character(s)',
  }),
});

const Page = () => {
  const router = useRouter();
  const { mutate: signUpFunc, isPending } = useRegister();

  useEffect(() => {
    const isLogin = localStorage.getItem('isLogin');
    if (isLogin) router.push('/dashboard');
  }, [router]);

  const form = useForm<z.infer<typeof formSignUp>>({
    resolver: zodResolver(formSignUp),
    defaultValues: {
      username: '',
      name: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSignUp>) {
    signUpFunc(values);
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
                <Button>Sign in</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-start justify-center h-[calc(100vh-96px)] mt-24 bg-[#f7f9fc] dark:bg-[#121212]">
        <Card className="flex flex-col mt-6 w-full sm:w-[520px] shadow-md">
          <CardHeader>
            <CardTitle className="text-center mb-2">Register an account</CardTitle>
          </CardHeader>
          <CardContent className="px-7">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Username</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Enter your username..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Name</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Enter your name..." {...field} />
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
                <div className="text-center">
                  <Button className="mt-4 w-full h-12" type="submit" disabled={isPending}>
                    {isPending ? 'Registering...' : 'Register'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="px-7 flex flex-col">
            <p className="text-sm mb-5">
              You already have an account?
              <Link href="/sign-in" className="text-primary font-semibold ml-2 hover:underline">
                Login now!
              </Link>
            </p>
            <Button variant="outline" className="w-full h-12">
              <Image className="w-7" src="/logo-google.svg" width={49} height={49} alt="Continute with Google" />
              Continute with Google
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Page;
