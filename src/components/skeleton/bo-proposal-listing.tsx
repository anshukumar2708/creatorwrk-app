const BoProposalListing = () => {
  return (
    <>
      <div className="w-full">
        <div className="flex gap-3 justify-start items-center w-full mt-5">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-skeletonBg"></div>
          <div className="flex flex-col gap-3 items-start">
            <div className="w-28 h-3 rounded bg-skeletonBg"></div>
            <div className="w-20 h-3 rounded bg-skeletonBg"></div>
          </div>
          <div className="justify-between gap-2 items-start flex ms-auto">
            <div className="w-40 h-10 rounded-500 bg-skeletonBg sm:block hidden"></div>
            <div className="w-7 h-7 rounded-full bg-skeletonBg sm:hidden block"></div>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start gap-3 mt-5">
          <div className="sm:w-90% w-full h-3 rounded bg-skeletonBg"></div>
          <div className="sm:w-50% w-70% h-3 rounded bg-skeletonBg"></div>
          <div className="sm:w-30% w-45% h-3 rounded bg-skeletonBg"></div>
        </div>
        <div className="h-1px bg-skeletonBg mt-5"></div>
      </div>
    </>
  );
};

export default BoProposalListing;
