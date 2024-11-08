import { FC } from "react";
import { useSelector } from "react-redux";
import Feed from "../../components/influencer/feed";
import HomePage from "../../components/brand-owner/home-page";
import { State } from "../../interfaces/store";

const Home: FC = () => {
  const profileData = useSelector((state: State) => state.profile?.profile);

  return (
    <div className="w-full">
      {profileData?.userType === "creator" && <Feed />}
      {profileData?.userType === "business_owner" && <HomePage />}
    </div>
  );
};

export default Home;
