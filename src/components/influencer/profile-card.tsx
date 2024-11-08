import { useSelector } from "react-redux";
import { State } from "../../interfaces/store";
import AvatarImage from "../common/avatar-image/avatar-image";
import { Progress } from "antd";
import CoinIcon from "../../assets/images/svg/coin";
import { profileProgressBar } from "../../utils/helper";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProfileCard = () => {
  const [profileProgress, setProfileProgress] = useState<number>(0);
  const profile = useSelector((state: State) => state?.profile?.profile);

  useEffect(() => {
    const progress = profileProgressBar(profile);
    setProfileProgress(progress);
  }, [profile]);

  return (
    <div className="bg-black flex flex-col justify-start items-start gap-2 rounded-18 p-6 border border-lightGrey w-300 min-w-300 max-h-260">
      <p className="text-mediumViolet font-medium text-base m-0 p-0">Profile</p>

      <div className="w-full flex justify-start items-center gap-3">
        <div>
          {profileProgress === 100 ? (
            <AvatarImage
              imageUrl={profile?.profileImageUri}
              size={50}
              name={profile?.name}
            />
          ) : (
            <Progress
              type="circle"
              percent={profileProgress}
              size={60}
              strokeWidth={3}
              strokeColor="#50EA38"
              trailColor="rgba(217, 217, 217, 0.5)"
              format={() => (
                <AvatarImage
                  imageUrl={profile.profileImageUri}
                  size={45}
                  name={profile?.name}
                />
              )}
            />
          )}
        </div>

        <div>
          <h1 className="text-xl font-medium text-mediumViolet capitalize">
            {profile?.name?.slice(0, 20)} {profile?.name?.length > 20 && "..."}
          </h1>
          {profile?.city && (
            <p className="text-mediumViolet font-normal text-base">
              <span className="capitalize">{profile?.city}</span>,{" "}
              <span className="capitalize"> {profile?.country}</span>
            </p>
          )}
        </div>
      </div>

      {profile?.userType === "creator" && (
        <>
          <div className="flex flex-col justify-center items-start gap-0.5">
            <h1 className="text-mediumViolet font-medium opacity-50 text-sm">
              Influstar
            </h1>
            <div className="flex flex-row justify-center items-center gap-2">
              <CoinIcon />
              <p className="text-mediumViolet text-base font-semibold">
                {profile?.creator?.creatorStar}
              </p>
            </div>
          </div>

          <div className="w-full flex flex-col justify-center items-center mt-2.5">
            {(profileProgress < 100 ||
              profile?.verificationStatus === "verified") && (
              <Link
                to={profileProgress < 100 ? "/set-up-profile" : "/edit-profile"}
                className="h-41 w-180 text-mediumViolet rounded-500  hover:shadow-custom-hover text-base font-semibold bg-custom-gradient bg-gray-200 flex justify-center items-center"
              >
                {profileProgress < 100 ? "Complete" : "Edit"} Profile
              </Link>
            )}

            {profile?.verificationStatus === "pending" &&
              profileProgress === 100 && (
                <div className="border rounded-500 border-underReview py-2 px-2.5">
                  <p className="text-sm font-medium text-mediumViolet">
                    Your profile is under verifications
                  </p>
                </div>
              )}
          </div>
        </>
      )}
      {profile?.userType === "business_owner" && (
        <div className="w-full flex flex-col justify-center items-center gap-3">
          <div className="w-full flex justify-between items-center mt-3">
            <div>
              <h1 className="font-semibold text-base text-mediumViolet">
                {profile?.businessOwner?.postedJobs}
              </h1>
              <p className="text-base font-normal text-mediumViolet">
                Posted Job
              </p>
            </div>
            {/* <div className="w-[1px] h-6 bg-mediumBlue"></div>
            <div>
              <h1 className="font-semibold text-base text-mediumViolet">0</h1>
              <p className="text-base font-normal text-mediumViolet">
                Completed
              </p>
            </div> */}
          </div>

          <Link
            to={profileProgress < 100 ? "/set-up-profile" : "/edit-profile"}
            className="h-41 w-180 text-mediumViolet rounded-500  hover:shadow-custom-hover text-base font-semibold bg-custom-gradient bg-gray-200 flex justify-center items-center"
          >
            {profileProgress < 100 ? "Complete" : "Edit"} Profile
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
