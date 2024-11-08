import React from "react";

const TreadListSkeleton: React.FC = () => {
  return (
    <>
      <div className="w-full flex justify-between items-center p-4 max-lg:border-1 border-lightGrey rounded-xl">
        <div className="w-full flex gap-3 justify-between items-start">
          <div className="flex flex-row justify-start items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-skeletonBg"></div>
            <div className="flex flex-col gap-2 items-start w-[calc(100%-112px)]">
              <div className="sm:w-148px w-120px h-3 rounded bg-skeletonBg"></div>
              <div className="sm:w-96px w-16 h-2 rounded bg-skeletonBg "></div>
              <div className="w-46px h-2 rounded bg-skeletonBg"></div>
            </div>
          </div>
          <div className="flex flex-col justify-end items-end gap-2">
            <div className="w-20 h-2 rounded bg-skeletonBg"></div>
            <div className="w-4 h-4 rounded-full bg-skeletonBg"></div>
            <div className="w-7 h-2 rounded bg-skeletonBg"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TreadListSkeleton;
