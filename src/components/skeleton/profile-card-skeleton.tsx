import { useSelector } from "react-redux";
import { State } from "../../interfaces/store";

const ProfileCardSkeleton = () => {
  const profileData = useSelector((state: State) => state.profile?.profile);
  return (
    <>
      {" "}
      <div className="flex flex-col justify-center items-center gap-3">
        <div className="bg-black flex flex-col justify-start items-start gap-2 rounded-18 p-6 border border-lightGrey w-300 min-w-300 max-h-260">
          <p className="w-28 h-[10px] rounded-[4px] bg-skeletonBg"></p>

          <div className="flex gap-3 justify-start items-center w-full">
            <div className="w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] rounded-full bg-skeletonBg"></div>
            <div className="flex flex-col gap-2 justify-center items-start">
              <div className="w-[120px] h-[10px] rounded-[4px] bg-skeletonBg"></div>
              <div className="w-[100px] h-[10px] rounded-[4px] bg-skeletonBg"></div>
            </div>
          </div>

          {profileData?.userType === "creator" && (
            <>
              <div className="flex flex-col justify-center items-start gap-2">
                <p className="w-28 h-[10px] rounded-[4px] bg-skeletonBg"></p>
                <div className="flex gap-1 justify-start items-center w-full">
                  <div className="w-[24px] h-[24px] rounded-full bg-skeletonBg"></div>
                  <div className="w-[70px] h-[10px] rounded-[4px] bg-skeletonBg"></div>
                </div>
              </div>

              <div className="w-full flex justify-center items-center mt-2.5">
                <div className="h-41 w-180 rounded-500  bg-skeletonBg"></div>
              </div>
            </>
          )}

          {profileData?.userType === "business_owner" && (
            <div className="w-full flex justify-between items-center mt-6">
              <div className="flex flex-col justify-center items-start gap-3">
                <h1 className="w-4 h-4 rounded-sm bg-skeletonBg"></h1>
                <p className="w-[80px] h-3 rounded-sm bg-skeletonBg"></p>
              </div>
              <div className="w-1 h-6 bg-skeletonBg"></div>
              <div className="flex flex-col justify-center items-start gap-3">
                <h1 className="w-4 h-4 rounded-sm bg-skeletonBg"></h1>
                <p className="w-[80px] h-3 rounded-sm bg-skeletonBg"></p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileCardSkeleton;
