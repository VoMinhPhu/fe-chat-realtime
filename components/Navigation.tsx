'use client';

import { cn } from '@/lib/utils';

import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { setDashboardPage, setIsOpenDashboard } from '@/store/dashboardSlice';

import UserMenu from './UserMenu';
import Dashboard from '@/app/dashboard/_components/Dashboard';

import { Separator } from './ui/separator';
import { ContactRound, MessageCircle, Users } from 'lucide-react';

const Navigation = () => {
  const dashNav = useSelector((state: RootState) => state.dashboard.page);
  const isOpen = useSelector((state: RootState) => state.dashboard.isOpen);
  const dispatch = useDispatch();
  const handleNavDashboard = (dashboard: string) => {
    dispatch(setDashboardPage(dashboard));
    if (dashboard === dashNav || !isOpen) dispatch(setIsOpenDashboard(!isOpen));
  };

  return (
    <div className="max-w-[580px] md:flex rounded-xl overflow-hidden md:m-4 md:mr-2">
      <div className="hidden md:flex flex-col items-center justify-between rounded-lg">
        <div className="w-12">
          <div
            onClick={() => handleNavDashboard('messages')}
            className={cn(
              'flex items-center justify-center p-3 dark:hover:bg-darkHover rounded-lg hover:bg-[#ebebeb]',
              dashNav === 'messages' && 'bg-[#ebebeb] dark:bg-darkHover',
            )}
          >
            <MessageCircle fill="#000" />
          </div>
          <div
            onClick={() => handleNavDashboard('requests')}
            className={cn(
              'flex items-center justify-center p-3 dark:hover:bg-darkHover rounded-lg hover:bg-[#ebebeb]',
              dashNav === 'requests' && 'bg-[#ebebeb] dark:bg-darkHover',
            )}
          >
            <ContactRound />
          </div>
          <div
            onClick={() => handleNavDashboard('friends')}
            className={cn(
              'flex items-center justify-center p-3 dark:hover:bg-darkHover rounded-lg hover:bg-[#ebebeb]',
              dashNav === 'friends' && 'bg-[#ebebeb] dark:bg-darkHover',
            )}
          >
            <Users />
          </div>
          <div className="mt-4">
            <Separator className="mb-3" />
          </div>
        </div>
        <div className="flex flex-col items-center justify-between w-full mb-4">
          <UserMenu sizeAvt={'w-9 h-9'} />
        </div>
      </div>
      <div
        className={cn(
          'flex bg-white rounded-lg md:ml-4 lg:min-w-[305px] lg:max-w-[350px] fixed md:left-16 left-0 right-0 top-0 bottom-0 z-10 lg:static',
          {
            'hidden lg:flex': !isOpen,
          },
        )}
      >
        <div className="fixed md:hidden w-full h-16">
          <div className="flex items-center justify-between">
            <div className="w-full h-16 mx-8 flex items-center justify-between">
              <div
                onClick={() => handleNavDashboard('messages')}
                className={cn(
                  'flex items-center justify-center p-3 dark:hover:bg-darkHover rounded-lg hover:bg-[#ebebeb]',
                  dashNav === 'messages' && 'bg-[#ebebeb] dark:bg-darkHover',
                )}
              >
                <MessageCircle fill="#000" />
              </div>
              <div
                onClick={() => handleNavDashboard('requests')}
                className={cn(
                  'flex items-center justify-center p-3 dark:hover:bg-darkHover rounded-lg hover:bg-[#ebebeb]',
                  dashNav === 'requests' && 'bg-[#ebebeb] dark:bg-darkHover',
                )}
              >
                <ContactRound />
              </div>
              <div
                onClick={() => handleNavDashboard('friends')}
                className={cn(
                  'flex items-center justify-center p-3 dark:hover:bg-darkHover rounded-lg hover:bg-[#ebebeb]',
                  dashNav === 'friends' && 'bg-[#ebebeb] dark:bg-darkHover',
                )}
              >
                <Users />
              </div>
              <UserMenu sizeAvt={'w-9 h-9'} />
            </div>
          </div>
        </div>
        <Dashboard />
      </div>
    </div>
  );
};

export default Navigation;
