import React from "react";

const BoMyJobCardSkeleton: React.FC = () => {
  return (
    <>
      <div className="bg-black sm:p-6 relative p-4 border border-lightGrey rounded-18 max-w-1140 w-full sm:mb-3 mb-2 flex flex-col sm:gap-4 gap-3">
        <div className="w-full flex justify-between">
          <div className="sm:w-80 w-150 h-3 rounded bg-skeletonBg"></div>
          <div className="flex justify-center gap-2 absolute top-3 right-3">
            <div className="w-8 h-8 rounded-full bg-skeletonBg sm:block hidden"></div>
            <div className="w-8 h-8 rounded-full bg-skeletonBg sm:block hidden"></div>
            <div className="w-8 h-8 rounded-full bg-skeletonBg"></div>
          </div>
        </div>

        <div className="sm:flex justify-start items-center gap-2 hidden">
          <div className="sm:w-125 w-20 h-2.5 rounded bg-skeletonBg"></div>
          <div className="sm:w-150 w-100px h-2.5 rounded bg-skeletonBg"></div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="w-80% h-2.5 rounded bg-skeletonBg"></div>
          <div className="w-50% h-2.5 rounded bg-skeletonBg"></div>
        </div>

        <div className="flex justify-start items-center gap-2">
          <div className="w-125 h-8 rounded bg-skeletonBg"></div>
          <div className="w-125 h-8 rounded bg-skeletonBg"></div>
        </div>

        <div className="sm:w-18% w-40% h-2.5 rounded bg-skeletonBg"></div>
        <div className="sm:w-22% w-50% h-2.5 rounded bg-skeletonBg sm:hidden block"></div>

        <div className="sm:flex hidden justify-center items-center gap-3 absolute right-3 bottom-4">
          <div className="flex justify-center items-center relative gap-2">
            <div className="w-9 h-9 rounded-full bg-skeletonBg z-0"></div>
            <div className="w-9 h-9  rounded-full bg-skeletonBg z-1 absolute top-0 left-5"></div>
            <div className="w-9 h-9 rounded-full bg-skeletonBg z-10"></div>
          </div>
          <div className="w-9 h-9 rounded-full bg-skeletonBg"> </div>
        </div>

        <div className="w-full hidden max-sm:flex justify-between items-center">
          <div className="flex justify-center items-center gap-3">
            <div className="flex justify-center items-center relative gap-2">
              <div className="w-9 h-9 rounded-full bg-skeletonBg z-0"></div>
              <div className="w-9 h-9 rounded-full bg-skeletonBg z-1 absolute top-0 left-5"></div>
              <div className="w-9 h-9 rounded-full bg-skeletonBg z-10"></div>
            </div>
            <div className="w-9 h-9 rounded-full bg-skeletonBg"> </div>
          </div>

          <div className="sm:hidden max-sm:flex justify-center gap-3">
            <div className="w-8 h-8 rounded-full bg-skeletonBg"></div>
            <div className="w-8 h-8 rounded-full bg-skeletonBg"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BoMyJobCardSkeleton;
