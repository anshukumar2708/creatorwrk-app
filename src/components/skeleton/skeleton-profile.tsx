import React from "react";
import ProfilesSkeleton from "../../assets/images/svg/profileskeleton";
import { useLocation } from "react-router-dom";

const ProfileSkeleton: React.FC<any> = ({ activeProfileData }) => {
  console.log(activeProfileData);
  const location = useLocation();
  return (
    <>
      {/* profile details start */}
      <div className="relative border-1 border-customBlue rounded-25 bg-darkBlack max-lg:h-auto shadow-custom-inner hidden lg:block">
        <div className="w-full h-265 rounded-18">
          <div className="h-265 rounded-3xl bg-skeletonBg"></div>
          <div className="absolute right-50% top-19%">
            <ProfilesSkeleton />
          </div>
        </div>
        <div className="p-4 flex gap-8 mb-10">
          <div className="relative sm:w-250 -top-140px left-35px sm:h-210px rounded-18 bg-skeletonBg">
            <div className="absolute right-35% top-26%">
              <ProfilesSkeleton />
            </div>
          </div>
          <div className="w-3/4 flex flex-col gap-2 mb-3 ms-12">
            <div className="flex justify-between">
              <div className="flex gap-3 justify-start items-center w-full">
                <div className="flex flex-col sm:gap-2 gap-4 items-start">
                  <div className="w-48 h-4 rounded bg-skeletonBg"></div>
                  <div className="w-32 h-3 rounded bg-skeletonBg"></div>
                </div>
                <div className="flex flex-col sm:gap-2 gap-4 items-end ms-auto">
                  <div className="w-28 h-3 rounded bg-skeletonBg"></div>
                  <div className="w-16 h-10px rounded bg-skeletonBg"></div>
                </div>
              </div>
            </div>
            <div className="w-70% h-10px rounded bg-skeletonBg mt-6"></div>
            <div className="w-50% h-10px rounded bg-skeletonBg"></div>
            <div className="w-30% h-10px rounded bg-skeletonBg"></div>
            <div className="sm:flex justify-start items-center gap-2 hidden mt-4">
              <div className="w-125 h-8 rounded bg-skeletonBg mt-5"></div>
              <div className="w-125 h-8 rounded bg-skeletonBg mt-5"></div>
              <div className="w-125 h-8 rounded bg-skeletonBg mt-5"></div>
              <div className="w-125 h-8 rounded bg-skeletonBg mt-5"></div>
            </div>
          </div>
        </div>
      </div>
      {/* profile details start */}

      {/* second part start */}
      <div className="border border-lightGrey bg-darkBlack px-8 py-10 rounded-25 shadow-custom-inner hidden lg:block">
        {location?.pathname === "/profile" && (
          <>
            <div className="flex gap-3 justify-start items-center w-full">
              <div className="w-6 h-6 rounded bg-skeletonBg"></div>
              <div className="w-250 h-4 rounded bg-skeletonBg"></div>
            </div>

            <div className="flex gap-3 justify-start items-center w-full mt-6">
              <div className="w-6 h-6 rounded bg-skeletonBg"></div>
              <div className="w-250 h-4 rounded bg-skeletonBg"></div>
            </div>

            {activeProfileData?.userType === "business_owner" && (
              <div className="flex gap-3 justify-between items-center w-full mt-6">
                <div className="flex flex-col gap-2 items-start">
                  <div className="w-250 h-4 rounded bg-skeletonBg"></div>
                  <div className="w-20 h-3 rounded bg-skeletonBg"></div>
                </div>
                <div className="w-12 h-12 rounded bg-skeletonBg"></div>
              </div>
            )}
          </>
        )}

        {location?.pathname !== "/profile" &&
          activeProfileData?.userType === "business_owner" && (
            <div className="flex gap-3 justify-between items-center w-full">
              <div className="flex flex-col gap-2 items-start">
                <div className="w-250 h-4 rounded bg-skeletonBg"></div>
                <div className="w-20 h-3 rounded bg-skeletonBg"></div>
              </div>
              <div className="w-12 h-12 rounded bg-skeletonBg"></div>
            </div>
          )}

        {activeProfileData?.userType === "creator" && (
          <>
            {location?.pathname === "/profile" && (
              <div className="h-1px bg-skeletonBg mt-8"></div>
            )}
            <div
              className={`flex gap-3 justify-start items-center ${
                location?.pathname === "/profile" && "mt-8"
              } `}
            >
              <div className="w-12 h-12 rounded- bg-skeletonBg"></div>
              <div className="flex flex-col gap-3 items-start">
                <div className="w-250 h-3 rounded bg-skeletonBg"></div>
                <div className="w-40 h-3 rounded bg-skeletonBg"></div>
              </div>
            </div>
            <div className="flex gap-3 justify-between items-center w-full mt-8">
              <div className="flex gap-3 justify-start items-center">
                <div className="w-12 h-12 rounded bg-skeletonBg"></div>
                <div className="flex flex-col gap-3 items-start ">
                  <div className="w-250 h-3 rounded bg-skeletonBg"></div>
                </div>
              </div>

              <div className="w-20 h-12 rounded bg-skeletonBg"></div>
              <div className="w-20 h-12 rounded bg-skeletonBg"></div>
              <div className="w-28 h-8 rounded-100 bg-skeletonBg"></div>
            </div>
            <div className="flex gap-3 justify-between items-center w-full mt-8">
              <div className="flex gap-3 justify-start items-center">
                <div className="w-12 h-12 rounded bg-skeletonBg"></div>
                <div className="w-250 h-3 rounded bg-skeletonBg"></div>
              </div>
              <div className="w-20 h-12 rounded  bg-skeletonBg"></div>
              <div className="w-20 h-12  rounded bg-skeletonBg"></div>
              <div className="w-28 h-8 rounded-100  bg-skeletonBg"></div>
            </div>
          </>
        )}
      </div>

      {/* second part end */}

      <div className="lg:hidden bg-darkBlack w-full">
        <div className="w-full h-180 relative bg-skeletonBg">
          <div className="w-40 rounded bg-skeletonBg"></div>
          <div className="absolute right-40% sm:right-46% top-16%">
            <ProfilesSkeleton />
          </div>
        </div>
        <div className="p-6">
          <div className="-mt-90px relative rounded w-150 h-150 mx-auto bg-skeletonBg">
            <div className="absolute right-27% sm:right-29% top-23%">
              <ProfilesSkeleton />
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="m-auto w-48 h-4 rounded bg-skeletonBg"></div>
          <div className="m-auto w-40 h-3 rounded bg-skeletonBg mt-3"></div>
          <div className="m-auto w-72 h-3 rounded bg-skeletonBg mt-5"></div>
          <div className="m-auto w-60 h-3 rounded bg-skeletonBg mt-3"></div>
          <div className="m-auto w-44 h-3 rounded bg-skeletonBg mt-3"></div>
          <div className="m-auto w-28 h-3 rounded bg-skeletonBg mt-3"></div>
          <div className="flex justify-center items-center gap-2 mt-2">
            <div className="w-125 h-8 rounded bg-skeletonBg mt-5"></div>
            <div className="w-125 h-8 rounded bg-skeletonBg mt-5"></div>
            <div className="w-125 h-8 rounded bg-skeletonBg mt-5"></div>
          </div>
          <div className="m-auto w-32 h-4 rounded bg-skeletonBg mt-6"></div>
          <div className="m-auto w-20 h-4 rounded bg-skeletonBg mt-3"></div>
        </div>
        <div className="h-1px bg-skeletonBg mt-4"></div>
        <div className="p-4">
          <div className="sm:m-auto w-250 h-4 rounded bg-skeletonBg"></div>
          <div className="sm:m-auto w-120 h-3 rounded bg-skeletonBg !mt-3"></div>
          <div className="sm:m-auto w-250 h-4 rounded bg-skeletonBg !mt-5"></div>
          <div className="sm:m-auto w-120 h-3 rounded bg-skeletonBg !mt-3"></div>
        </div>
        <div className="h-1px bg-skeletonBg"> </div>
        <div className="flex justify-between items-center gap-2 p-4">
          <div>
            <div className="w-56 h-5 rounded bg-skeletonBg"></div>
            <div className="w-32 h-4 rounded bg-skeletonBg mt-3"></div>
            <div className="w-20 h-3 rounded bg-skeletonBg mt-3"></div>
          </div>
          <div className="w-12 h-11 rounded bg-skeletonBg"></div>
        </div>
        <div className="h-1px bg-skeletonBg"> </div>
        <div className="flex justify-between items-center gap-2 p-4">
          <div>
            <div className="w-56 h-5 rounded bg-skeletonBg"></div>
            <div className="w-32 h-4 rounded bg-skeletonBg mt-3"></div>
            <div className="w-20 h-3 rounded bg-skeletonBg mt-3"></div>
          </div>
          <div className="w-12 h-12 rounded bg-skeletonBg"></div>
        </div>
        <div className="h-1px bg-skeletonBg"> </div>
        <div className="flex justify-between items-center gap-2 p-4">
          <div>
            <div className="w-28 h-5 rounded bg-skeletonBg"></div>
            <div className="w-20 h-4 rounded bg-skeletonBg mt-3"></div>
            <div className="w-10 h-3 rounded bg-skeletonBg mt-3"></div>
          </div>
          <div>
            <div className="w-14 h-5 rounded bg-skeletonBg"></div>
            <div className="w-20 h-4 rounded bg-skeletonBg mt-3"></div>
            <div className="w-10 h-3 rounded bg-skeletonBg mt-3"></div>
          </div>
          <div className="w-12 h-12 rounded bg-skeletonBg"></div>
        </div>
        <div className="h-1px bg-skeletonBg"> </div>
        <div className="flex justify-between items-center gap-2 p-4">
          <div>
            <div className="w-20 h-5 rounded bg-skeletonBg"></div>
            <div className="w-20 h-4 rounded bg-skeletonBg mt-3"></div>
            <div className="w-10 h-3 rounded bg-skeletonBg mt-3"></div>
          </div>
          <div>
            <div className="w-14 h-5 rounded bg-skeletonBg"></div>
            <div className="w-20 h-4 rounded bg-skeletonBg mt-3"></div>
            <div className="w-10 h-3 rounded bg-skeletonBg mt-3"></div>
          </div>
          <div className="w-12 h-12 rounded bg-skeletonBg"></div>
        </div>
      </div>
    </>
  );
};

export default ProfileSkeleton;
