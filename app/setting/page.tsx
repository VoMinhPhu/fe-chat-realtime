'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { RootState } from '@/store/store';
import { setCurrUser } from '@/store/userSlice';
import { useDispatch, useSelector } from 'react-redux';

import { useGetInfoCurrUser } from '@/app/api/user/user';

import HeaderSetting from './_components/HeaderSetting';
import DashboardSetting from './_components/DashboardSetting';
import TabProfile from './_components/TabProfile';
import { cn } from '@/lib/utils';
import TabChangePassword from './_components/TabChangePassword';
import TabDeleteAccount from './_components/TabDeleteAccount';

const Page = () => {
  const router = useRouter();

  const { data, isSuccess, refetch } = useGetInfoCurrUser();

  const currUser = useSelector((state: RootState) => state.user.currUser);
  const currTab = useSelector((state: RootState) => state.settingTab.currTab);

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
  }, [data, isSuccess, dispatch]);

  return (
    <div className="bg-[#f8f9fc] dark:bg-[#121212]">
      <HeaderSetting />
      <div className="pt-16 pb-4 flex justify-center">
        <div className="max-w-[1200px] w-full grid grid-cols-4 gap-4 mt-6">
          <div>
            <DashboardSetting />
          </div>
          <div className="col-span-2">
            <div
              className={cn('', {
                hidden: currTab !== 'profile',
              })}
            >
              <TabProfile />
            </div>
            <div
              className={cn('', {
                hidden: currTab !== 'changePassword',
              })}
            >
              <TabChangePassword />
            </div>
            <div
              className={cn('', {
                hidden: currTab !== 'deleteAccount',
              })}
            >
              <TabDeleteAccount />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
