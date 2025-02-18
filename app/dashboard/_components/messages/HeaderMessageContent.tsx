'use client';

import Image from 'next/image';

import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { setIsOpenDashboard } from '@/store/dashboardSlice';

import { Button } from '@/components/ui/button';
import { CardHeader } from '@/components/ui/card';

import { ArrowLeft, MoreHorizontal } from 'lucide-react';

const HeaderMessageContent = () => {
  const userSending = useSelector((state: RootState) => state.user.userSending);

  const dispatch = useDispatch();

  const openDashboard = () => {
    dispatch(setIsOpenDashboard(true));
  };

  return (
    <CardHeader className="border-b px-3 py-2 flex flex-row items-center justify-between">
      <div
        onClick={openDashboard}
        className="h-10 md:hidden w-10 flex items-center justify-center rounded-full hover:bg-[#ebebeb]"
      >
        <ArrowLeft />
      </div>
      <div className="flex items-center hover:bg-[#ebebeb] dark:hover:bg-darkHover py-2 px-3 rounded-lg">
        <Image
          src={
            userSending.avatar === '' || userSending.avatar === null
              ? '/avt.svg'
              : `data:image/jpg;base64,${userSending.avatar}`
          }
          width={36}
          height={36}
          alt="username"
          className="rounded-full"
        />
        <p className="ml-2 font-semibold">{userSending.name}</p>
      </div>
      <div>
        <Button variant="ghost" className="rounded-full p-3 dark:hover:bg-darkHover">
          <MoreHorizontal />
        </Button>
      </div>
    </CardHeader>
  );
};

export default HeaderMessageContent;
