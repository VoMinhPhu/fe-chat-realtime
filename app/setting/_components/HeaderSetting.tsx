'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { RootState } from '@/store/store';
import { setCurrUser } from '@/store/userSlice';
import { useDispatch, useSelector } from 'react-redux';

import { useGetInfoCurrUser } from '@/app/api/user/user';

import { Button } from '@/components/ui/button';
import { Flag, HelpCircle, LogOut, Menu } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLogout } from '@/utils/auth';
import { setOpenNav } from '@/store/settingStoreSlice';

const HeaderSetting = () => {
  const router = useRouter();
  const logOutFunc = useLogout();
  const { data, isSuccess, refetch } = useGetInfoCurrUser();
  const currUser = useSelector((state: RootState) => state.user.currUser);
  const openNav = useSelector((state: RootState) => state.settingTab.openNav);
  const dispatch = useDispatch();

  useEffect(() => {
    const isLogin = localStorage.getItem('isLogin');
    if (isLogin !== 'true') {
      setTimeout(() => router.push('/'), 500);
    } else {
      if (currUser.username === '') {
        refetch();
      }
    }
  }, [currUser.username, refetch, router]);

  useEffect(() => {
    if (isSuccess && data) dispatch(setCurrUser({ data }));
  }, [data, dispatch, isSuccess]);

  const handleOpenNav = () => {
    dispatch(setOpenNav(!openNav));
  };

  return (
    <div className="fixed z-50 top-0 h-16 w-full flex items-center justify-center border-b shadow-md bg-primary-foreground dark:bg-[#020817]">
      <div className="max-w-[1200px] h-full w-full flex items-center justify-between mx-2">
        <div className="flex">
          <div onClick={handleOpenNav} className="md:hidden p-2 rounded-full hover:bg-[#dad8d8]">
            <Menu />
          </div>
          <Image priority src="/logo.svg" width={50} height={39} alt="logo" className="w-auto h-9" />
        </div>
        <div className="flex gap-4">
          <Link href="/dashboard">
            <Button> Go to Dashboard </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage
                  src={currUser.avatar === null ? '/avt.svg' : `data:image/jpg;base64,${currUser.avatar}`}
                  alt="avt"
                />
                <AvatarFallback>avt</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60 ml-16">
              <DropdownMenuLabel className="p-4">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="p-3">
                  <HelpCircle />
                  <span>Help</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-3">
                  <Flag />
                  <span>Report</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logOutFunc} className="p-3">
                <LogOut />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default HeaderSetting;
