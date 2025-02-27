'use client';

import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';

import FormLogin from '../_components/FormLogin';

const Page = () => {
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
        <FormLogin />
      </div>
    </div>
  );
};

export default Page;
