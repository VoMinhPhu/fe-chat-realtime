'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import { getTimeAgo } from '@/utils/time';

import { RootState } from '@/store/store';
import { setSendingUser } from '@/store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setAllChatBox, setChatBoxJoined } from '@/store/chatboxSlice';
import { setIsOpenDashboard, setMessageId } from '@/store/dashboardSlice';

import { useSocket } from '@/components/SocketIoProvider';
import { useGetAllChatBox } from '@/app/api/messages/messages';
import { GetAllChatBoxResponseDataType } from '@/types/messages';

import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MessagesDashboard = () => {
  const { chatBoxJoined, allChatBox } = useSelector((state: RootState) => state.chatBox);
  const { currUser } = useSelector((state: RootState) => state.user);
  const isOpen = useSelector((state: RootState) => state.dashboard.isOpen);

  const dispatch = useDispatch();
  const [refreshKey, setRefreshKey] = useState(0);

  const { data, isSuccess } = useGetAllChatBox();
  const socket = useSocket();

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setAllChatBox(data));
    }
  }, [data, isSuccess]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshKey((prevKey) => prevKey + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [refreshKey]);

  const handleChatClick = (item: GetAllChatBoxResponseDataType) => {
    if (!chatBoxJoined.includes(item._id)) {
      socket?.emit('joinRoom', item._id);
      dispatch(setChatBoxJoined(item._id));
    }
    dispatch(setMessageId(item._id));
    dispatch(setIsOpenDashboard(!isOpen));
    dispatch(setSendingUser({ ...item.toUser, chatId: item._id }));
  };

  return (
    <Card className="w-full mt-16 md:mt-0 rounded-none lg:rounded-lg">
      <CardHeader className="p-4 h-[66px] hidden md:block">
        <CardTitle>Messages</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="px-4 pb-5">
        <div className="mt-2 overflow-y-scroll no-scrollbar gap-1 flex flex-col w-full h-full max-h-[520px]">
          {!allChatBox || allChatBox.length === 0 ? (
            <div className="flex flex-col items-center p-4">
              <Image src="/no-chat.svg" width={200} height={100} alt="no chat" className="h-auto" />
              <p className="font-bold text-2xl text-center mt-10">You don&apos;t have any conversations.</p>
            </div>
          ) : (
            allChatBox.map((item) => (
              <div
                key={item._id}
                onClick={() => handleChatClick(item)}
                className="p-2 hover:bg-[#ebebeb] dark:hover:bg-[#3a3a3a] rounded-lg flex items-center h-16 group"
              >
                <Image
                  src={item.toUser.avatar === null ? '/avt.svg' : `data:image/jpg;base64,${item.toUser.avatar}`}
                  width={40}
                  height={40}
                  alt="avt"
                  className="rounded-full w-10 h-10"
                />
                <div className="flex flex-col w-full ml-2">
                  <p className="font-semibold">{item.toUser.name}</p>
                  <div
                    className={cn('flex items-center justify-between text-xs ', {
                      'font-bold': item.lastMessage?.fromUser !== currUser.id && item.lastMessage?.status !== 'seen',
                    })}
                  >
                    <span className="truncate max-w-36">
                      <span
                        className={cn('pr-1.5', {
                          hidden: !item.lastMessage?.content || item.lastMessage?.fromUser === currUser.id,
                        })}
                      >
                        {item.toUser.name + ':'}
                      </span>
                      <span
                        className={cn('pr-1.5', {
                          hidden: !item.lastMessage?.content || item.lastMessage?.fromUser !== currUser.id,
                        })}
                      >
                        You:
                      </span>
                      {item.lastMessage?.content}
                    </span>
                    <span className="text-right truncate w-14">
                      {item.lastMessage?.createdAt && getTimeAgo(item.lastMessage?.createdAt)}
                    </span>
                  </div>
                </div>
                <div className="w-16 h-full flex items-center">
                  <Button
                    onClick={(event) => {
                      event.stopPropagation();
                      console.log('show submenu: ', item._id);
                    }}
                    variant="ghost"
                    className="rounded-full p-1 w-8 h-8 hover:bg-card"
                  >
                    <MoreHorizontal size={28} strokeWidth={1.2} className="hidden group-hover:block rounded-full" />
                  </Button>
                  <span
                    className={cn('h-3 w-3 bg-sky-400 rounded-full', {
                      hidden:
                        item.lastMessage?.fromUser === currUser.id ||
                        !item.lastMessage ||
                        item.lastMessage.status === 'seen',
                    })}
                  ></span>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MessagesDashboard;
