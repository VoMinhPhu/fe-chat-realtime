import Link from 'next/link';
import { useEffect } from 'react';
import { useTheme } from 'next-themes';

import { useLogout } from '@/utils/auth';
import { useGetInfoCurrUser } from '@/app/api/user/user';

import { RootState } from '@/store/store';
import { setCurrUser } from '@/store/userSlice';
import { useDispatch, useSelector } from 'react-redux';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { Flag, HelpCircle, LogOut, MessageCircleOff, Moon, Settings, Sun } from 'lucide-react';

type Props = {
  sizeAvt?: string;
};

const UserMenu = ({ sizeAvt = '' }: Props) => {
  const { data, isSuccess } = useGetInfoCurrUser();
  const logOutFunc = useLogout();

  const { setTheme } = useTheme();
  const currUser = useSelector((state: RootState) => state.user.currUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && data) dispatch(setCurrUser({ data }));
  }, [data, dispatch, isSuccess]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {isSuccess ? (
          <Avatar className={`${sizeAvt}`}>
            <AvatarImage
              src={currUser.avatar === null ? '/avt.svg' : `data:image/jpg;base64,${currUser.avatar}`}
              alt="avatar"
            />
            <AvatarFallback>avt</AvatarFallback>
          </Avatar>
        ) : (
          <div className="w-10 h-10 border rounded-full flex items-center justify-center bg-slate-400 animate-pulse"></div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60 ml-16">
        <DropdownMenuLabel className="p-4">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="p-0">
            <Link href="/setting" className="flex p-3 pl-3 w-full">
              <Settings />
              <span className="ml-2">Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Button variant="ghost" size="icon" className="h-8 justify-start w-full px-1">
                <Sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <p>Theme</p>
              </Button>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="p-3">
            <MessageCircleOff />
            <span>Account has been restricted</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
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
  );
};

export default UserMenu;
