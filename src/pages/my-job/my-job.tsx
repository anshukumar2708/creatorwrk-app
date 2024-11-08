import { useSelector } from "react-redux";
import MyJobFeature from "../../components/brand-owner/my-job-feature";
import InfluencerMyJob from "../../components/influencer/infuluencer-my-job";
import { State } from "../../interfaces/store";

const MyJob = () => {
  const profileData: any = useSelector(
    (state: State) => state?.profile?.profile
  );

  return (
    <div className="w-full">
      {profileData?.userType === "creator" && <InfluencerMyJob />}
      {profileData?.userType === "business_owner" && <MyJobFeature />}
    </div>
  );
};

export default MyJob;
