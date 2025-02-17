'use client';

import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';

import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { KeyRound, Trash2, UserPen } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { setCurrTab } from '@/store/settingStoreSlice';

const DashboardSetting = () => {
  const currUser = useSelector((state: RootState) => state.user.currUser);
  const dispatch = useDispatch();

  return (
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
      <div className="mt-4 px-4">
        <p className="font-semibold">Account</p>
        <p
          onClick={() => dispatch(setCurrTab({ data: 'profile' }))}
          className="text-sm my-2 p-2 rounded-sm ml-4 hover:cursor-pointer flex items-center gap-4 hover:bg-slate-100"
        >
          <span>
            <UserPen color="#007aff" />
          </span>
          Profile
        </p>
        <p
          onClick={() => dispatch(setCurrTab({ data: 'changePassword' }))}
          className="text-sm my-2 p-2 rounded-sm ml-4 hover:cursor-pointer flex items-center gap-4 hover:bg-slate-100"
        >
          <span>
            <KeyRound color="#007aff" />
          </span>
          Change password
        </p>
        <p
          // onClick={() => dispatch(setCurrTab({ data: 'deleteAccount' }))}
          className="text-sm my-2 p-2 rounded-sm ml-4 hover:cursor-pointer flex items-center gap-4 hover:bg-slate-100 text-[#f33535]"
        >
          <span>
            <Trash2 color="#f33535" />
          </span>
          Delete account
        </p>
      </div>
    </Card>
  );
};

export default DashboardSetting;
