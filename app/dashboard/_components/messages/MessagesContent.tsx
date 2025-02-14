'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { cn } from '@/lib/utils';

import { useSocket } from '@/components/SocketIoProvider';

import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeItemInNeedFetch,
  setDetailChatInList,
  setListChatBox,
  updateLastMessage,
  setStatusSeenForChatBox,
} from '@/store/chatboxSlice';

import { useGetDetailChat } from '@/app/api/messages/messages';
import { DataResponseFromSocketType, DetailChatMessageType, ReceiveMessagesFromSocketType } from '@/types/messages';

import { SendHorizonal, MoreHorizontal } from 'lucide-react';

import SubmenuMessage from './SubmenuMessage';
import MessageContentLoading from './MessageContentLoading';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

const formMessageSchema = z.object({
  messages: z.string().trim().min(1),
  type: z.string(),
});

const MessagePage = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const bottomRef = useRef<HTMLSpanElement | null>(null);
  // const [openSettingChat, setOpenSettingChat] = useState(false);
  const [messages, setMessages] = useState<DetailChatMessageType[]>([]);
  const [receive, setReceive] = useState<ReceiveMessagesFromSocketType>();
  const { currUser, userSending } = useSelector((state: RootState) => state.user);
  const { listChatBox, needFetchMessage } = useSelector((state: RootState) => state.chatBox);
  const dispatch = useDispatch();

  const socket = useSocket();

  const { data, isSuccess, isLoading, refetch } = useGetDetailChat(userSending.chatId || '');

  useEffect(() => {
    if (isSuccess && data) {
      if (userSending.chatId) {
        if (needFetchMessage.includes(userSending.chatId)) {
          refetch();
          dispatch(setDetailChatInList({ chatId: userSending.chatId, detailChat: data }));
          dispatch(removeItemInNeedFetch(userSending.chatId));
          setMessages(data);
          return;
        }

        const f = listChatBox.find((item) => item.chatId === userSending.chatId);
        if (!f) {
          dispatch(setListChatBox({ chatId: userSending.chatId, detailChat: data }));
          setMessages(data);
        } else {
          setMessages(f.detailChat);
        }
      }
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (receive) {
      if (receive.data.toUser === currUser.id) {
        if (receive.data.fromUser === userSending.id) {
          socket?.emit('receivedMessage', {
            chatId: receive.data._id,
            status: 'seen',
          });
        } else {
          socket?.emit('receivedMessage', {
            chatId: receive.data._id,
            status: 'received',
          });
        }
      }

      const f = listChatBox.find((item) => item.chatId === receive.chatId);
      dispatch(setDetailChatInList({ chatId: receive.chatId, detailChat: [...(f?.detailChat || []), receive.data] }));
      if (receive.chatId === userSending.chatId) {
        setMessages((prev) => [...prev, receive.data]);
      }
      dispatch(
        updateLastMessage({
          _id: receive.chatId,
          lastMessage: {
            content: receive.data.content,
            fromUser: receive.data.fromUser,
            status: receive.data.status,
            createdAt: `${receive.data.createdAt}`,
          },
        }),
      );
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [receive]);

  useEffect(() => {
    if (!socket) return;
    const handleReceiveMessage = (data: DataResponseFromSocketType) => {
      setReceive({
        chatId: data.message.chatId,
        data: data.message,
      });
    };
    socket.on('receiveMessage', handleReceiveMessage);

    return () => {
      socket.off('receiveMessage', handleReceiveMessage);
    };
  }, [socket]);

  useEffect(() => {
    listChatBox.forEach((item) => {
      if (item.chatId === userSending.chatId) {
        const notSeen = item.detailChat.filter((mess) => mess.status !== 'seen').map((mess) => mess._id);
        if (notSeen.length > 0) {
          socket?.emit('seenMultipleMessages', {
            chatIds: notSeen,
            status: 'seen',
          });

          // update status seen for last message
          socket?.emit('seenLastMessage', userSending.chatId);
        }
      }
    });
    dispatch(setStatusSeenForChatBox({ chatId: userSending.chatId }));
    bottomRef.current?.scrollIntoView({ behavior: 'instant' });
  }, [messages]);

  const form = useForm<z.infer<typeof formMessageSchema>>({
    resolver: zodResolver(formMessageSchema),
    defaultValues: {
      messages: '',
      type: 'text',
    },
  });

  const handleOptionClick = (option: string) => {
    console.log(`You clicked: ${option}`);
  };

  const onSubmit = (values: z.infer<typeof formMessageSchema>) => {
    socket?.emit('sendMessage', {
      content: values.messages,
      toUser: userSending.id,
      chatId: userSending.chatId,
      fromUser: currUser.id,
    });
    form.reset();

    if (textareaRef.current) {
      if (textareaRef.current.style.height !== '40px') textareaRef.current.style.height = '40px';
    }
  };
  return (
    <>
      <Card className="w-full flex flex-col m-4 ml-0 rounded-lg">
        <CardHeader className="border-b px-3 py-2 flex flex-row items-center justify-between">
          <div className="flex items-center hover:bg-[#ebebeb] dark:hover:bg-darkHover py-2 px-3 rounded-lg">
            <Image
              src={
                userSending.avatar === '' || userSending.avatar === null
                  ? '/avt.svg'
                  : `data:image/jpg;base64,${userSending.avatar}`
              }
              width={36}
              height={36}
              alt="username"
              className="rounded-full"
            />
            <p className="ml-2 font-semibold">{userSending.name}</p>
          </div>
          <div>
            <Button variant="ghost" className="rounded-full p-3 dark:hover:bg-darkHover">
              <MoreHorizontal />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col justify-start flex-1 overflow-y-scroll no-scrollbar">
          {isLoading && <MessageContentLoading />}

          {messages?.map((item: DetailChatMessageType, index) => {
            const prevUserISending = messages[index - 1]?.fromUser !== currUser.id;
            let nextUserISending = messages[index + 1]?.fromUser !== currUser.id;
            if (index + 1 === messages.length) nextUserISending = false;

            if (item.fromUser === currUser.id) {
              return (
                <div key={item._id}>
                  <div className="w-full min-h-10 text-white group flex justify-end">
                    <div className="flex items-center bg-white">
                      <SubmenuMessage
                        className="hidden group-hover:flex"
                        options={['Pin', 'Share', 'Delete']}
                        onOptionClick={handleOptionClick}
                      />
                    </div>

                    <span
                      className={cn(
                        'px-3 py-2 my-[2px] max-w-[calc(100%-120px)] bg-blue-600 border rounded-xl leading-5 whitespace-pre-line',
                        {
                          'rounded-tr-md': !prevUserISending,
                          'rounded-br-md': !nextUserISending,
                        },
                      )}
                    >
                      {item.content}
                    </span>
                  </div>
                  {index === messages.length - 1 && (
                    <span ref={index === messages.length - 1 ? bottomRef : null} className="w-full h-10"></span>
                  )}
                </div>
              );
            } else {
              return (
                <div key={item._id}>
                  <div className="flex justify-start group]">
                    <div className="min-w-10 h-10 flex items-center justify-center mr-1 cursor-pointer">
                      {!nextUserISending && (
                        <Image
                          src={
                            userSending.avatar === '' || userSending.avatar === null
                              ? '/avt.svg'
                              : `data:image/jpg;base64,${userSending.avatar}`
                          }
                          width={28}
                          height={28}
                          alt="username"
                          className="rounded-full"
                        />
                      )}
                    </div>
                    <span
                      className={cn(
                        'px-3 bg-[#f6f6f6] py-2 my-[2px] max-w-[calc(100%-120px)] border dark:bg-darkHover rounded-2xl leading-5 whitespace-pre-line',
                        {
                          'rounded-tl-md': prevUserISending,
                          'rounded-bl-md': nextUserISending,
                        },
                      )}
                    >
                      {item.content}
                    </span>
                  </div>
                  {index === messages.length - 1 && (
                    <span ref={index === messages.length - 1 ? bottomRef : null} className="w-full h-10"></span>
                  )}
                </div>
              );
            }
          })}
        </CardContent>
        <CardFooter>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full">
              <FormField
                control={form.control}
                name="messages"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <textarea
                        {...field}
                        ref={textareaRef}
                        onInput={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                          const textarea = e.target as HTMLTextAreaElement;
                          textarea.style.height = `${textarea.scrollHeight}px`;
                        }}
                        onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            form.handleSubmit(onSubmit)();
                          }
                        }}
                        onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => {
                          if (e.target.value === '') {
                            e.target.style.height = '40px';
                          }
                        }}
                        placeholder="Type your messages..."
                        className="w-full p-2 min-h-10 h-10 max-h-20 border-2 border-gray-300 rounded-lg text-sm font-sans focus:outline-none focus:border-blue-500 resize-none bg-input placeholder-gray-400 disabled:bg-gray-100 disabled:border-gray-200 overflow-auto"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button variant="outline" className="ml-1">
                <SendHorizonal color="#c4c4c4" className="w-10 h-10 scale-125" />
              </Button>
            </form>
          </Form>
        </CardFooter>
      </Card>
      {/* <Card className={`my-4 max-w-80 ${openSettingChat ? 'hidden' : 'w-full'}`}>
        <CardHeader className="justify-center items-center">
          <Image src="/avt.svg" width={60} height={60} alt="username" className="rounded-full" />
          <CardTitle className="mt-1">{userSending.name}</CardTitle>
          <div className="flex items-center justify-center text-xs gap-2 pt-4">
            <div className="flex flex-col items-center justify-center cursor-pointer">
              <CircleUser />
              <p>Personal page</p>
            </div>
            <div className="flex flex-col items-center justify-center cursor-pointer">
              <BellOff />
              <p>Turn off notifications</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Accordion type="single" className="w-full">
            <AccordionItem value="item-1" className="border-b-0">
              <AccordionTrigger className="text-[15px] font-semibold py-2 hover:bg-[#ebebeb] dark:hover:bg-darkHover px-1 rounded-sm">
                Message infomation
              </AccordionTrigger>
              <AccordionContent className="flex ml-2 items-center cursor-pointer hover:bg-[#ebebeb] dark:hover:bg-darkHover py-2 px-2 rounded-md">
                <Pin fill="#000" />
                <p className="ml-2">View pinned messages</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-b-0">
              <AccordionTrigger className="text-[15px] font-semibold py-2 hover:bg-[#ebebeb] dark:hover:bg-darkHover px-1 rounded-sm">
                Customize chat
              </AccordionTrigger>
              <AccordionContent className="flex ml-2 items-center cursor-pointer hover:bg-[#ebebeb] dark:hover:bg-darkHover py-2 px-2 rounded-md">
                <Disc color="#2563eb" />
                <p className="ml-2">Change the subject</p>
              </AccordionContent>
              <AccordionContent className="flex ml-2 items-center cursor-pointer hover:bg-[#ebebeb] dark:hover:bg-darkHover py-2 px-2 rounded-md">
                <CaseSensitive />
                <p className="ml-2">Edit nickname</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-b-0">
              <AccordionTrigger className="text-[15px] font-semibold py-2 hover:bg-[#ebebeb] dark:hover:bg-darkHover px-1 rounded-sm">
                Media files, files and links
              </AccordionTrigger>
              <AccordionContent className="flex ml-2 items-center cursor-pointer hover:bg-[#ebebeb] dark:hover:bg-darkHover py-2 px-2 rounded-md">
                <Images />
                <p className="ml-2">Media files</p>
              </AccordionContent>
              <AccordionContent className="flex ml-2 items-center cursor-pointer hover:bg-[#ebebeb] dark:hover:bg-darkHover py-2 px-2 rounded-md">
                <Files />
                <p className="ml-2">Files</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-b-0">
              <AccordionTrigger className="text-[15px] font-semibold py-2 hover:bg-[#ebebeb] dark:hover:bg-darkHover px-1 rounded-sm">
                More options
              </AccordionTrigger>
              <AccordionContent className="flex ml-2 items-center cursor-pointer hover:bg-[#ebebeb] dark:hover:bg-darkHover py-2 px-2 rounded-md">
                <MessageCircleOff />
                <p className="ml-2">Block</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card> */}
    </>
  );
};

export default MessagePage;
