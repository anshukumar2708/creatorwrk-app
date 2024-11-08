import React from "react";
import LeftArrow from "../../assets/images/svg/left-arrow";
import { useSelector } from "react-redux";
import { State } from "../../interfaces/store";

const SkeletonThreadDetails: React.FC = () => {
  const profile = useSelector((state: State) => state?.profile?.profile);

  console.log(profile?.userType);

  return (
    <>
      <div className="w-full flex justify-between items-center">
        <div className="w-full h-full flex justify-between items-center">
          <div className="w-full flex items-center justify-between">
            <div className="flex sm:gap-3 gap-1 justify-center items-center">
              <button className="lg:hidden w-7 h-7 p-0 m-0 hover:scale-150">
                <LeftArrow />
              </button>
              <div className="w-12 h-12 rounded-full bg-skeletonBg"></div>
              <div className=" flex flex-col justify-start items-start gap-2">
                <div className="xxs:w-148px w-90px h-10px rounded bg-skeletonBg"></div>
                <div className="xxs:w-130px w-90px h-9 rounded-full bg-skeletonBg"></div>
              </div>
            </div>
            <div className="flex justify-end items-center sm:gap-3 gap-1">
              {profile?.userType === "business_owner" && (
                <div className="xxs:w-148px w-90px h-9 rounded-full bg-skeletonBg"></div>
              )}
              <div className="xxs:w-6 xxs:h-6 w-4 h-4 rounded-full bg-skeletonBg ms-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SkeletonThreadDetails;
