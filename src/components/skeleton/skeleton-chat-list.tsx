import React from "react";

const ChatListSkeleton: React.FC = () => {
  return (
    <>
      <div className="w-full h-full">
        <div className="flex justify-between flex-col h-full">
          <div className="flex gap-3 justify-center items-start w-full">
            <div className="w-20 h-6 rounded-[54px] bg-skeletonBg"></div>
          </div>

          <div className="flex flex-col gap-1 justify-end items-end">
            <div className="w-20 h-9 rounded-t-xl rounded-bl-xl py-5 px-4 gap-2 bg-skeletonBg "></div>
            <div className="w-10 h-2 rounded bg-skeletonBg"></div>
          </div>

          <div className="flex flex-col gap-1 justify-start items-start">
            <div className="w-20 h-9 rounded-b-xl rounded-tr-xl py-5 px-4 gap-2 bg-skeletonBg "></div>
            <div className="w-10 h-2 rounded bg-skeletonBg"></div>
          </div>

          <div className="flex flex-col gap-1 justify-end items-end">
            <div className="w-20 h-9 rounded-t-xl rounded-bl-xl py-5 px-4 gap-2 bg-skeletonBg "></div>
            <div className="w-10 h-2 rounded bg-skeletonBg"></div>
          </div>

          <div className="flex flex-col gap-1 justify-start items-start">
            <div className="w-20 h-9 rounded-b-xl rounded-tr-xl py-5 px-4 gap-2 bg-skeletonBg "></div>
            <div className="w-10 h-2 rounded bg-skeletonBg"></div>
          </div>

          <div className="flex flex-col gap-1 justify-start items-start">
            <div className="w-20 h-9 rounded-t-xl rounded-bl-xl py-5 px-4 gap-2 bg-skeletonBg "></div>
            <div className="w-10 h-2 rounded bg-skeletonBg"></div>
          </div>

          <div className="flex flex-col gap-2 justify-start items-start">
            <div className="w-20 h-9 rounded-b-xl rounded-tr-xl py-5 px-4 gap-2 bg-skeletonBg "></div>
            <div className="w-10 h-2 rounded bg-skeletonBg"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatListSkeleton;
