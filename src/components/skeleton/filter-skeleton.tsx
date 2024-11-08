const FilterSkeleton = () => {
  return (
    <>
      {" "}
      <div className="bg-black flex flex-col justify-start items-start gap-5 rounded-18 p-6 border border-lightGrey w-300 min-w-300 ">
        <p className="w-28 h-3 rounded bg-skeletonBg"></p>

        <div className="w-full h-8 bg-skeletonBg rounded-md"></div>
        <div className="w-full h-8 bg-skeletonBg rounded-md"></div>
        <div className="w-full h-8 bg-skeletonBg rounded-md"></div>

        <div className="w-full flex justify-center items-center mt-2.5">
          <div className="h-41 w-180 rounded-500  bg-skeletonBg"></div>
        </div>
      </div>
    </>
  );
};

export default FilterSkeleton;
