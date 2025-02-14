'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { RootState } from '@/store/store';
import { setCurrUser } from '@/store/userSlice';
import { useDispatch, useSelector } from 'react-redux';

import { useGetInfoCurrUser } from '@/app/api/user/user';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import HeaderSetting from './_components/HeaderSetting';
import FormUpdateAvt from './_components/FormUpdateAvt';
import FormUpdateInfoUser from './_components/FormUpdateInfoUser';

const Page = () => {
  const router = useRouter();
  const [updateInfo, setUpdateInfo] = useState<boolean>(false);

  const { data, isSuccess, refetch } = useGetInfoCurrUser();

  const currUser = useSelector((state: RootState) => state.user.currUser);
  const dispatch = useDispatch();

  const cancelUpdateInfo = () => setUpdateInfo(false);

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
      <div className="pt-16 flex justify-center">
        <div className="max-w-[1200px] w-full h-full grid grid-cols-4 gap-4 mt-6">
          <Card className="p-4">
            <div className="flex gap-4 mb-4">
              <Avatar className="w-14 h-14">
                <AvatarImage
                  src={currUser.avatar === null ? '/avt.svg' : `data:image/jpg;base64,${currUser.avatar}`}
                  alt="avt"
                />
                <AvatarFallback>avt</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{currUser.name}</p>
                <p className="text-[#007aff] text-sm">{currUser.username}</p>
              </div>
            </div>
            <Separator />
          </Card>
          <div className="col-span-2">
            <div>
              <div className="mb-6 flex justify-between">
                <p className="font-bold text-3xl">Profile</p>
                {!updateInfo ? (
                  <div onClick={() => setUpdateInfo(true)} className="text-primary font-bold cursor-pointer flex gap-2">
                    Update
                    <span>
                      <Image src="/pen.svg" width={20} height={20} alt="update"></Image>
                    </span>
                  </div>
                ) : (
                  <div>
                    <Button variant="outline" className="text-primary" onClick={cancelUpdateInfo}>
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
              <FormUpdateAvt />
              {!updateInfo ? (
                <Card className="p-4">
                  <div>
                    <p className="text-xs font-semibold opacity-40">Name</p>
                    <p className="my-4 ml-2">{currUser.name}</p>
                  </div>
                  <Separator />
                  <div className="mt-4">
                    <p className="text-xs font-semibold opacity-40">Username</p>
                    <p className="my-4 ml-2">{currUser.username}</p>
                  </div>
                  <Separator />
                  <div className="mt-4">
                    <p className="text-xs font-semibold opacity-40">Gender</p>
                    <p className="my-4 ml-2">{currUser.gender || '--'}</p>
                  </div>
                  <Separator />
                  <div className="mt-4">
                    <p className="text-xs font-semibold opacity-40">Date of birth</p>
                    <p className="my-4 ml-2">
                      {currUser.dateOfBirth ? new Date(currUser.dateOfBirth).toLocaleDateString('vi-VN') : '--'}
                    </p>
                  </div>
                  <Separator />
                  <div className="mt-4">
                    <p className="text-xs font-semibold opacity-40">Phone number</p>
                    <p className="my-4 ml-2">{currUser.phoneNumber || '--'}</p>
                  </div>
                </Card>
              ) : (
                <div>
                  <FormUpdateInfoUser cancelUpdateInfo={cancelUpdateInfo} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="h-10">footer</div>
    </div>
  );
};

export default Page;
