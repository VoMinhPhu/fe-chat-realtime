import React from 'react';

const MessageContentLoading = () => {
  return (
    <div className="flex flex-col space-y-1">
      <div className="flex item-center">
        <div className="w-8 h-8 bg-[#f6f6f6] rounded-full mr-1 animate-pulse"></div>
        <div className="bg-[#f6f6f6] h-10 w-[60%] rounded-lg animate-pulse"></div>
      </div>
      <div className="flex item-center">
        <div className="w-8 h-8 mr-1 "></div>
        <div className="bg-[#f6f6f6] h-20 w-[70%] rounded-lg animate-pulse"></div>
      </div>
      <div className="bg-[#f6f6f6] h-10 w-[70%] rounded-lg animate-pulse ml-auto"></div>
      <div className="bg-[#f6f6f6] h-10 w-[50%] rounded-lg animate-pulse ml-auto"></div>
      <div className="flex item-center">
        <div className="w-8 h-8 bg-[#f6f6f6] rounded-full mr-1 animate-pulse"></div>
        <div className="bg-[#f6f6f6] h-10 w-[70%] rounded-lg animate-pulse"></div>
      </div>
      <div className="bg-[#f6f6f6] h-10 w-[70%] rounded-lg animate-pulse ml-auto"></div>
      <div className="bg-[#f6f6f6] h-10 w-[30%] rounded-lg animate-pulse ml-auto"></div>
    </div>
  );
};

export default MessageContentLoading;
