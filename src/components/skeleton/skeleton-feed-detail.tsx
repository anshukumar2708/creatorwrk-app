import React from "react";

const FeedDetailSkeleton: React.FC = () => {
  return (
    <>
      <div className="relative rounded-18 w-full flex flex-col sm:gap-4 gap-3">
        <div className="w-full flex justify-between">
          <div className="sm:w-80 w-150 h-3 rounded bg-skeletonBg"></div>
        </div>

        <div className="sm:flex justify-start items-center gap-2 hidden">
          <div className="sm:w-28 w-20 h-10px rounded bg-skeletonBg"></div>
          <div className="sm:w-32 w-28 h-10px rounded bg-skeletonBg"></div>
          <div className="sm:w-32 w-28 h-10px rounded bg-skeletonBg"></div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="w-80% h-10px rounded bg-skeletonBg"></div>
          <div className="w-50% h-10px rounded bg-skeletonBg"></div>
        </div>

        <div className="flex justify-start items-center gap-2">
          <div className="w-125 h-8 rounded bg-skeletonBg"></div>
          <div className="w-125 h-8 rounded bg-skeletonBg"></div>
        </div>

        <div className="sm:hidden max-sm:flex gap-3 justify-between items-center">
          <div className="w-full flex flex-col gap-3">
            <div className="sm:w-18% w-40% h-10px rounded bg-skeletonBg"></div>
            <div className="sm:w-22% w-50% h-10px rounded bg-skeletonBg"></div>
          </div>
        </div>

        <div className="sm:hidden max-sm:flex gap-3 justify-between items-center w-full">
          <div className="justify-between gap-2 items-start flex w-full">
            <div className="w-full h-8 rounded-500 bg-skeletonBg"></div>
            <div className="w-8 h-8 rounded-full bg-skeletonBg"></div>
          </div>
        </div>

        <div className="absolute top-0 right-0">
          <div className="sm:flex hidden gap-3 justify-between items-center">
            <div className="justify-between gap-2 items-start flex">
              <div className="sm:w-44 w-28 h-8 rounded-500 bg-skeletonBg"></div>
              <div className="w-8 h-8 rounded-full bg-skeletonBg"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedDetailSkeleton;
