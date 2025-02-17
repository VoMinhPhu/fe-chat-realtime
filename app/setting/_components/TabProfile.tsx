'use client';

import Image from 'next/image';
import { useState } from 'react';

import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

import FormUpdateAvt from './FormUpdateAvt';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import FormUpdateInfoUser from './FormUpdateInfoUser';

const TabProfile = () => {
  const [updateInfo, setUpdateInfo] = useState<boolean>(false);
  const cancelUpdateInfo = () => setUpdateInfo(false);
  const currUser = useSelector((state: RootState) => state.user.currUser);

  return (
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
  );
};

export default TabProfile;
