'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useSocket } from '@/components/SocketIoProvider';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';

import NoOneDashboard from './_components/NoOneDashboard';
import MessagePage from './_components/messages/MessagesContent';
import { useInvalidateQueries } from '@/utils/messages';
import { resetChatBoxJoined, resetListChatBox, setChatBoxJoined, setNeedFetchMessage } from '@/store/chatboxSlice';

const Dashboard = () => {
  const router = useRouter();
  const userSending = useSelector((state: RootState) => state.user.userSending);
  const joinedRooms = useSelector((state: RootState) => state.chatBox.chatBoxJoined);
  const socket = useSocket();
  const reNewMessage = useInvalidateQueries();
  const dispatch = useDispatch();
  useEffect(() => {
    const isLogin = localStorage.getItem('isLogin');
    const isActive = localStorage.getItem('isActive');

    if (isLogin === 'true') {
      if (isActive !== 'true') setTimeout(() => router.push('/verify'), 500);
    } else {
      setTimeout(() => router.push('/sign-in'), 500);
    }

    if (joinedRooms.length > 0) {
      joinedRooms.map((item) => {
        socket?.emit('joinRoom', item);
      });
      reNewMessage(['chat']);

      dispatch(setNeedFetchMessage(joinedRooms));
      dispatch(resetChatBoxJoined());
      if (userSending.chatId) dispatch(setChatBoxJoined(userSending.chatId));

      dispatch(resetListChatBox());
    }
  }, [router, socket]);

  if (userSending.chatId === '') return <NoOneDashboard />;

  return (
    <div className="flex h-full w-full">
      <MessagePage />
    </div>
  );
};

export default Dashboard;
