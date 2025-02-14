'use client';

import { cn } from '@/lib/utils';

import UserMenu from './UserMenu';
import Dashboard from '@/app/dashboard/_components/Dashboard';

import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { setDashboardPage } from '@/store/dashboardSlice';

import { Separator } from './ui/separator';
import { ContactRound, MessageCircle, Users } from 'lucide-react';

const Navigation = () => {
  const dashNav = useSelector((state: RootState) => state.dashboard.page);
  const dispatch = useDispatch();

  return (
    <div className="max-w-[580px] flex rounded-xl overflow-hidden m-4 mr-2">
      <div className="flex flex-col items-center justify-between rounded-lg">
        <div className="w-12">
          <div
            onClick={() => dispatch(setDashboardPage('messages'))}
            className={cn(
              'flex items-center justify-center p-3 dark:hover:bg-darkHover rounded-lg hover:bg-[#ebebeb]',
              dashNav === 'messages' && 'bg-[#ebebeb] dark:bg-darkHover',
            )}
          >
            <MessageCircle fill="#000" />
          </div>
          <div
            onClick={() => dispatch(setDashboardPage('requests'))}
            className={cn(
              'flex items-center justify-center p-3 dark:hover:bg-darkHover rounded-lg hover:bg-[#ebebeb]',
              dashNav === 'requests' && 'bg-[#ebebeb] dark:bg-darkHover',
            )}
          >
            <ContactRound />
          </div>
          <div
            onClick={() => dispatch(setDashboardPage('friends'))}
            className={cn(
              'flex items-center justify-center p-3 dark:hover:bg-darkHover rounded-lg hover:bg-[#ebebeb]',
              dashNav === 'friends' && 'bg-[#ebebeb] dark:bg-darkHover',
            )}
          >
            <Users />
          </div>
          <div className="mt-4">
            <Separator className="mb-3" />
            {/* <div>
              <Link
                href="/dashboard"
                className="flex items-center p-1.5 dark:hover:bg-darkHover rounded-lg hover:bg-[#ebebeb]"
              >
                <Image src="/avt.svg" width={40} height={40} alt="group" className="rounded-md" />
              </Link>
            </div> */}
          </div>
        </div>
        <div className="flex flex-col items-center justify-between w-full mb-4">
          <UserMenu sizeAvt={'w-9 h-9'} />
        </div>
      </div>
      <div className="flex bg-white rounded-lg ml-4 min-w-[305px] max-w-[350px]">
        <Dashboard />
      </div>
    </div>
  );
};

export default Navigation;
