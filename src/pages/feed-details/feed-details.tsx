import { FC } from "react";
import FeedDetail from "../../components/influencer/feed-detail";
import Footer from "../../components/common/footer";

const FeedDetails: FC = () => {
  return (
    <div className="w-full max-w-1140 max-xl:px-1rem max-md:px-0 ">
      <FeedDetail />
      <div className="max-w-1140 sm:block hidden md:flex justify-center z-1 w-full">
        <Footer />
      </div>
    </div>
  );
};
export default FeedDetails;
