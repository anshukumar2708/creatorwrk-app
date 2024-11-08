import React from "react";

const FeedSkeleton: React.FC = () => {
  return (
    <>
      <div className="bg-black sm:p-6 relative p-4 border border-lightGrey rounded-18 max-w-1140 w-full sm:mb-3 mb-2 flex flex-col sm:gap-4 gap-3">
        <div className="w-full flex justify-between">
          <div className="sm:w-80 w-150 h-3 rounded bg-skeletonBg"></div>
          <div className="w-10 h-3 rounded bg-skeletonBg sm:hidden block"></div>
        </div>

        <div className="sm:flex justify-start items-center gap-2 hidden">
          <div className="sm:w-32 w-20 h-10px rounded bg-skeletonBg"></div>
          <div className="sm:w-40 w-28 h-10px rounded bg-skeletonBg"></div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="w-80% h-10px rounded bg-skeletonBg"></div>
          <div className="w-50% h-10px rounded bg-skeletonBg"></div>
        </div>

        <div className="flex justify-start items-center gap-2">
          <div className="w-125 h-8 rounded bg-skeletonBg"></div>
          <div className="w-125 h-8 rounded bg-skeletonBg"></div>
        </div>

        <div className="flex gap-3 justify-between items-center">
          <div className="w-full flex flex-col gap-3">
            <div className="sm:w-18% w-40% h-10px rounded bg-skeletonBg"></div>
            <div className="sm:w-22% w-50% h-10px rounded bg-skeletonBg"></div>
          </div>
          <div className="justify-between gap-2 items-start hidden max-sm:flex">
            <div className="w-8 h-8 rounded-full bg-skeletonBg"></div>
            <div className="w-8 h-8 rounded-full bg-skeletonBg"></div>
          </div>
        </div>

        <div className="absolute top-4 right-4">
          <div className="sm:flex hidden gap-3 justify-between items-center">
            <div className="justify-between gap-2 items-start flex">
              <div className="sm:w-44 w-40 h-8 rounded-500 bg-skeletonBg"></div>
              <div className="w-8 h-8 rounded-full bg-skeletonBg"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedSkeleton;
