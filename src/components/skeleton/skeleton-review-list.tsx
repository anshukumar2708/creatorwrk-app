const SkeletonReviewList = () => {
  return (
    <>
      <div className=" w-full rounded-18 bg-darkBlack border-1 border-solid border-gray-800 sm:p-4 p-3 sm:mt-0">
        <div className="flex justify-between items-start w-full px-2">
          <div className="flex gap-4 justify-start items-center w-full">
            <div className="w-12 h-12 rounded-full bg-skeletonBg"></div>
            <div className="flex flex-col gap-2 items-start w-full">
              <div className="w-70% h-2 rounded bg-skeletonBg"></div>
              <div className="w-50% h-2 rounded bg-skeletonBg"></div>
              <div className="w-50% h-2 rounded bg-skeletonBg"></div>
            </div>
          </div>
          <div className="w-40% h-2 rounded bg-skeletonBg mt-2"></div>
        </div>
      </div>
    </>
  );
};

export default SkeletonReviewList;
