'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { GetAllFriendType } from '@/types/friends';
import { useGetAllFriend } from '@/app/api/friends/friends';

import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FriendsDashboard = () => {
  const [unfriend, setUnfriend] = useState<string>('');
  const [listFriends, setListFriends] = useState<GetAllFriendType[]>();

  const { data, isSuccess } = useGetAllFriend();

  useEffect(() => {
    if (isSuccess && data) {
      setListFriends(data);
    }
  }, [isSuccess, data]);

  return (
    <Card className="w-full">
      <CardHeader className="p-4 pb-7 h-[66px]">
        <CardTitle>Friends</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="px-4 pb-5">
        <div className="mt-2 overflow-y-scroll no-scrollbar gap-1 flex flex-col w-full h-full max-h-[520px]">
          {listFriends?.map((item) => {
            return (
              <div
                key={item._id}
                className="p-2 hover:bg-[#ebebeb] dark:hover:bg-[#3a3a3a] rounded-lg flex items-center h-16 relative group"
              >
                <Image
                  src={item.avatar === null ? '/avt.svg' : `data:image/jpg;base64,${item.avatar}`}
                  width={40}
                  height={40}
                  alt="avt"
                  className="rounded-full w-10 h-10"
                />
                <div className="flex flex-col w-full ml-2">
                  <p className="font-semibold ml-1 mr-8">{item.name}</p>
                </div>
                <Button variant="ghost" className="absolute group/sub right-1 rounded-full p-1 w-8 h-8 hover:bg-card">
                  <MoreHorizontal size={28} strokeWidth={1.2} className="hidden group-hover:block rounded-full" />
                  <div
                    onClick={() => setUnfriend('123')}
                    className="absolute top-2 right-0 bg-card border rounded px-4 py-2 invisible group-hover/sub:visible"
                  >
                    unfriend
                  </div>
                </Button>
              </div>
            );
          })}
        </div>
        {(!listFriends || listFriends.length === 0) && (
          <div className="pt-2">
            <div className="flex items-center justify-center mt-5">
              <Image src="/no-friend.svg" width={200} height={100} alt="No friend" className="h-auto" />
            </div>
            <p className="font-semibold text-xl text-center mt-5">You don&apos;t have friends</p>
            <p className="text-center mt-3">Add some people to start a conversation.</p>
            <div className="flex items-center justify-center mt-5">
              <Button>Add Friend</Button>
            </div>
          </div>
        )}
      </CardContent>
      {unfriend ? (
        <div className="fixed z-10 flex items-center justify-center w-full left-0 top-0 bottom-0 animate-in bg-black/80">
          <div onClick={() => setUnfriend('')} className="w-full h-full"></div>
          <div className="border absolute bg-card rounded-lg shadow w-[500px] h-44">
            <p className="font-bold p-8 pt-6 text-3xl">Do you want to unfriend?</p>
            <div className="flex justify-between px-16">
              <Button onClick={() => console.log(123)} className="w-32 h-12">
                Unfriend
              </Button>
              <Button onClick={() => setUnfriend('')} className="w-32 h-12" variant="destructive">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </Card>
  );
};

export default FriendsDashboard;
