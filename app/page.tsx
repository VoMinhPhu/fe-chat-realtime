'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useLogin } from '@/utils/auth';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

const formLoginSchema = z.object({
  username: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters long.',
  }),
});

type LoginFormValues = z.infer<typeof formLoginSchema>;

export default function Home() {
  const router = useRouter();
  const { mutate: loginFunc } = useLogin();

  useEffect(() => {
    const login = localStorage.getItem('isLogin');
    const isActive = localStorage.getItem('isActive');

    if (login === 'true') {
      if (!isActive) setTimeout(() => router.push('/verify'), 500);
      setTimeout(() => router.push('/dashboard'), 500);
    }
  }, [router]);

  const form = useForm<z.infer<typeof formLoginSchema>>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    loginFunc(values);
  };

  return (
    <div className="no-scrollbar overflow-y-scroll">
      <div className="fixed top-0 h-24 w-full flex items-center justify-center border-b shadow-md bg-primary-foreground dark:bg-[#020817]">
        <div className="max-w-[1200px] h-full w-full flex items-center justify-between mx-2">
          <Image priority src="/logo.svg" width={50} height={39} alt="logo" className="w-auto" />
          <div className="flex">
            <div className="hidden md:flex">
              <Button size="sm" variant="link" className="md:text-xs lg:text-lg">
                Features
              </Button>
              <Button size="sm" variant="link" className="md:text-xs lg:text-lg">
                Desktop App
              </Button>
              <Button size="sm" variant="link" className="md:text-xs lg:text-lg">
                For Developers
              </Button>
              <Button size="sm" variant="link" className="md:text-xs lg:text-lg">
                Help Centre
              </Button>
            </div>
            <div>
              <Link href="/sign-up">
                <Button>Sign up</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-24 flex justify-center">
        <div className="lg:flex lg:flex-cols-2 justify-between max-w-[1200px] w-full mx-20">
          <div className="flex flex-col justify-start mt-10 min-w-1/2">
            <h1 className="flex gradient-text md:text-[75px] w-auto leading-[50px] md:leading-[85px] mb-8">
              A place for meaningful conversations
            </h1>
            <p className="my-5">
              Connect with your friends and family, build your community, and deepen your interests.
            </p>
            <div className="flex items-center justify-center lg:justify-start mt-5 mb-8">
              <div className="w-80 md:w-96">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input className="bg-primary-foreground" placeholder="Enter your username" {...field} />
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
                          <FormControl>
                            <Input
                              className="bg-primary-foreground"
                              type="password"
                              placeholder="Password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-between items-center">
                      <Button type="submit" className="w-32">
                        Login
                      </Button>
                      <Button variant="link">
                        <Link href="/forgot-password">Forgot password?</Link>
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
          <div className="w-full">
            <Image src="/banner.png" width={500} height={500} priority alt="banner" className="w-full" />
          </div>
        </div>
      </div>

      <div className="py-8 lg:px-32 flex flex-col items-center lg:flex-row justify-between">
        <p className="font-semibold text-xs flex items-center justify-center">@Võ Minh Phú</p>
        <div className="flex flex-col items-center lg:flex-row justify-center">
          <div className="flex items-center w-full pt-12 lg:pt-0 justify-center lg:justify-between lg:w-80 text-sm">
            <Link href="/" className="hover:underline text-blue-600 mx-4" target="_blank">
              Privacy Policy
            </Link>
            <Link href="/" className="hover:underline text-blue-600 mx-4">
              Cookie Policy
            </Link>
            <Link href="/" className="hover:underline text-blue-600 mx-4">
              Terms
            </Link>
          </div>
          <div className="lg:pl-28 flex items-center justify-center mt-6 lg:mt-0 lg:justify-end">
            <p className="pr-3 text-sm text-blue-400">from</p>
            <Image src="/logo.svg" width={50} height={39} alt="credential" className="w-10 h-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
