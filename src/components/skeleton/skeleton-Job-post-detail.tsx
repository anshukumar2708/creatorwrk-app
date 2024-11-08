import React from "react";

const JobPostDetailSkeleton: React.FC = () => {
  return (
    <>
      <div className=" flex flex-col justify-center items-start gap-5">
        {/* heading & action buttons */}
        <div className="flex gap-3 justify-start items-center w-full">
          <div className="w-full flex flex-col justify-start items-start gap-3">
            <div className="w-60% h-3.5 rounded bg-skeletonBg"></div>
            <div className="w-40% h-3.5 rounded bg-skeletonBg"></div>
          </div>
          <div className="justify-between items-start gap-4 flex ms-auto">
            <div className="w-9  h-9  rounded-full bg-skeletonBg md:block hidden"></div>
            <div className="w-9  h-9  rounded-full bg-skeletonBg md:block hidden"></div>
            <div className="w-9  h-9  rounded-full bg-skeletonBg"></div>
          </div>
        </div>
        {/* price time & location on large screen */}
        <div className="sm:flex justify-start items-center gap-2 hidden">
          <div className="w-150 h-3 rounded bg-skeletonBg"></div>
          <div className="w-150 h-3 rounded bg-skeletonBg"></div>
          <div className="w-150 h-3 rounded bg-skeletonBg"></div>
        </div>
        {/* paragraph on large screen */}
        <div className="w-full flex flex-col justify-start items-start gap-3">
          <div className="w-80% h-3 rounded bg-skeletonBg"></div>
          <div className="w-50% h-3 rounded bg-skeletonBg"></div>
          <div className="w-30% h-3 rounded bg-skeletonBg"></div>
        </div>
        {/* category & mark as completed */}
        <div className="w-full flex justify-between items-center">
          <div className="flex justify-start items-center gap-2">
            <div className="w-125 h-8 rounded bg-skeletonBg"></div>
            <div className="w-125 h-8 rounded bg-skeletonBg"></div>
          </div>
          <div className="md:block hidden w-52 h-10 rounded-500 bg-skeletonBg"></div>
        </div>

        {/* price & time on mobile screen */}
        <div className="md:hidden  max-md:flex justify-start items-center gap-2 ">
          <div className="w-150 h-3 rounded bg-skeletonBg"></div>
          <div className="w-150 h-3 rounded bg-skeletonBg"></div>
        </div>
        {/* location on mobile screen */}
        <div className=" md:hidden  block w-150 h-3 rounded bg-skeletonBg"></div>

        {/* mark as completed & action button on mobile screen */}
        <div className="w-full md:hidden  max-md:flex justify-between items-center gap-5">
          <div className="w-full h-10 rounded-500 bg-skeletonBg"></div>
          <div className="justify-between items-start gap-4 flex ms-auto">
            <div className="w-9  h-9   rounded-full bg-skeletonBg"></div>
            <div className="w-9  h-9  rounded-full bg-skeletonBg"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobPostDetailSkeleton;
