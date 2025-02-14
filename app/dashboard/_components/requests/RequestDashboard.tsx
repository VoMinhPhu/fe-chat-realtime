'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { RequestResponseDataType } from '@/types/requestType';
import { useGetAllRequestWithMe, useHandleRequest } from '@/app/api/requests/requests';

import FormAddNewFriend from './FormAddNewFriend';

import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SentRequest from './SentRequest';
import { Separator } from '@/components/ui/separator';

const RequestDashboard = () => {
  const [requestsData, setRequestsData] = useState<RequestResponseDataType[]>();
  const { data, isSuccess } = useGetAllRequestWithMe();
  const { mutate: handleReqMutate } = useHandleRequest();

  useEffect(() => {
    if (isSuccess) {
      setRequestsData(data);
    }
  }, [isSuccess, data]);

  const handleRequest = (requestId: string, status: 'accept' | 'reject') => {
    handleReqMutate(
      { requestId, status },
      {
        onSuccess: () => {
          setRequestsData((prev) => prev?.filter((item) => item._id !== requestId));
        },
      },
    );
  };

  return (
    <Card className="w-full">
      <CardHeader className="px-4 pt-2 h-[66px] flex-row items-center justify-between">
        <CardTitle>Request</CardTitle>
        <FormAddNewFriend />
      </CardHeader>
      <Separator />
      <CardContent className="pt-2">
        <Tabs defaultValue="requests">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="requests">Request</TabsTrigger>
            <TabsTrigger value="sent">Sent Request</TabsTrigger>
          </TabsList>
          <TabsContent value="requests">
            {(!requestsData || requestsData.length === 0) && (
              <>
                <div className="flex items-center justify-center mt-10">
                  <Image src="/request.svg" width={200} height={100} alt="request" className=" h-auto" />
                </div>
                <p className="font-semibold text-xl text-center mt-5">There are no Request waiting</p>
                <div className="text-sm font-thin text-center opacity-60 mt-5">
                  <p> You &apos;ll control who can send you waiting messages.</p>
                </div>
                <div className="text-center mt-4">
                  <Button className="w-full">See who can send you requests</Button>
                </div>
              </>
            )}
            {requestsData?.map((item) => {
              return (
                <div
                  key={item._id}
                  className="p-2 group hover:bg-[#ebebeb] dark:hover:bg-[#3a3a3a] rounded-lg flex items-center h-16 relative group"
                >
                  <Image src="/avt.svg" width={40} height={40} alt="avt" className="rounded-full w-10 h-10" />
                  <div className="flex w-full h-full ml-2">
                    <p className="font-semibold flex-1">{item.fromUser.name}</p>
                    <div className="group-hover:flex top-0 right-3 items-center justify-center flex h-full w-20 gap-2 text-xs">
                      <Button onClick={() => handleRequest(item._id, 'accept')} className="w-18 h-8 mr-4">
                        {/* <Check /> */}
                        Accept
                      </Button>
                      <Button
                        onClick={() => handleRequest(item._id, 'reject')}
                        variant="destructive"
                        className="absolute group-hover:flex hidden w-3 h-3 p-2 top-0 right-0"
                      >
                        <X />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </TabsContent>
          <TabsContent value="sent">
            <SentRequest />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RequestDashboard;
