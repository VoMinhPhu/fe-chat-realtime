'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { CancelRequestResponseDataType } from '@/types/requestType';
import { useCancelRequest, useGetRequestSent } from '@/app/api/requests/requests';

import { Button } from '@/components/ui/button';

const SentRequest = () => {
  const [requestsSentData, setRequestsSentData] = useState<CancelRequestResponseDataType[]>();
  const { data, isSuccess } = useGetRequestSent();
  const { mutate: cancelMutate } = useCancelRequest();

  useEffect(() => {
    if (isSuccess && data) {
      setRequestsSentData(data);
    }
  }, [isSuccess, data]);
  return (
    <>
      {requestsSentData?.map((item) => {
        return (
          <div
            key={item._id}
            className="p-2 group hover:bg-[#ebebeb] dark:hover:bg-[#3a3a3a] rounded-lg flex items-center h-16 relative my-0.5"
          >
            <Image src="/avt.svg" width={40} height={40} alt="avt" className="rounded-full w-10 h-10" />
            <div className="flex w-full h-full ml-2">
              <p className="font-semibold flex-1">{item.toUser.name}</p>
              <div className="flex items-center justify-center h-full w-20 gap-2 text-xs">
                <Button onClick={() => cancelMutate({ requestId: item._id })} variant="outline">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        );
      })}

      {(!requestsSentData || requestsSentData.length === 0) && (
        <>
          <div className="flex items-center justify-center mt-10 min-w-[300.4px]">
            <Image src="/request.svg" width={200} height={100} alt="request" className=" h-auto" />
          </div>
          <p className="font-semibold text-xl text-center mt-5">There are no Request sent</p>
          <div className="text-center mt-4">
            <Button className="w-full">Add some people to start a conversation</Button>
          </div>
        </>
      )}
    </>
  );
};

export default SentRequest;
