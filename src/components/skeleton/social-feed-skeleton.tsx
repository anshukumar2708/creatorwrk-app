const SocialFeedSkeleton = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-5">
        <div className="flex gap-1 justify-start items-center">
          <div className="w-9 h-9 rounded-full bg-skeletonBg"></div>
          <div className="w-30 h-10px rounded bg-skeletonBg"></div>
        </div>
        <div className="w-full flex justify-center items-center gap-3">
          <p className="w-20% h-10px rounded bg-skeletonBg"></p>
          <p className="w-20% h-10px rounded bg-skeletonBg"></p>
          <p className="w-20% h-10px rounded bg-skeletonBg"></p>
          <p className="w-20% h-10px rounded bg-skeletonBg"></p>
        </div>
        <p className="w-60 h-10px rounded bg-skeletonBg"></p>

        <div className="w-full flex justify-center items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-skeletonBg"></div>
          <div className="w-9 h-9 rounded-full bg-skeletonBg"></div>
          <div className="w-9 h-9 rounded-full bg-skeletonBg"></div>
          <div className="w-9 h-9 rounded-full bg-skeletonBg"></div>
        </div>
      </div>
    </>
  );
};

export default SocialFeedSkeleton;
