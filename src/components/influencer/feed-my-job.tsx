import { Virtuoso } from "react-virtuoso";
import FeedSkeleton from "../skeleton/skeleton-feed-list";
// import ProfileCardSkeleton from "../skeleton/profile-card-skeleton";
// import SocialFeedSkeleton from "../skeleton/social-feed-skeleton";
import { IFeedItem } from "../../interfaces/feed";
import FeedCard from "./feed-card";
import DataNotFound from "./data-not-found";
import ProfileCard from "./profile-card";
import PageFooter from "../common/page-footer/page-footer";
import HowItWork from "../common/how-it-work/how-it-work";
import { useEffect, useState } from "react";
import { profileProgressBar } from "../../utils/helper";
import { State } from "../../interfaces/store";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { creatorSliderContent } from "../../assets/locales/constant";

interface IProps {
  isLoading: boolean;
  isNewLoading: boolean;
  isSearchLoading: boolean;
  filters: any;
  allData: any;
  fetchDataOnScroll: () => void;
}

const FeedMyJob = ({
  isLoading,
  isNewLoading,
  isSearchLoading,
  filters,
  allData,
  fetchDataOnScroll,
}: IProps) => {
  const [progressPercent, setProgressPercent] = useState<number>(100);
  const profileData = useSelector((state: State) => state.profile?.profile);
  const location = useLocation();

  useEffect(() => {
    const progress = profileProgressBar(profileData);
    setProgressPercent(progress);
  }, [profileData]);

  const Footer = () => {
    return (
      <div className="flex flex-col justify-center items-center sm:pb-1 max-sm:pt-1 max-sm:pb-4">
        {isNewLoading ? (
          <div className="w-full">
            <FeedSkeleton />
          </div>
        ) : (
          filters.page > 1 && (
            <span className="text-chatNoMessage text-sm font-normal">
              No more cards to show.
            </span>
          )
        )}
      </div>
    );
  };
  return (
    <>
      <div className="w-full flex justify-between items-start gap-5 mb-16">
        <div className="w-full">
          {(isLoading || isSearchLoading) && (
            <div className="w-full flex-col justify-center items-center">
              {Array.from({ length: 4 }, (_, index) => (
                <FeedSkeleton key={index} />
              ))}
            </div>
          )}
          {!isLoading && allData.length > 0 && (
            <Virtuoso
              useWindowScroll
              data={allData}
              totalCount={allData.length}
              endReached={fetchDataOnScroll}
              increaseViewportBy={50}
              itemContent={(index: number, item: IFeedItem) => {
                return <FeedCard data={item} key={index} />;
              }}
              components={{ Footer }}
              initialScrollTop={0}
            />
          )}
          {!isLoading && allData?.length === 0 && <DataNotFound />}
        </div>
        {/* right side cards */}

        {/* {isLoading && (
          <div className="lg:flex flex-col justify-center items-center gap-3 hidden">
            <ProfileCardSkeleton />
            <FilterSkeleton />
            <SocialFeedSkeleton />
          </div>
        )} */}

        {/* {!isLoading && ( */}
        <div
          className={`lg:flex flex-col justify-center items-center gap-3 hidden sticky w-300 ${
            location?.pathname === "/" ? "top-[162px]" : "top-[185px]"
          } `}
        >
          {(progressPercent < 100 ||
            profileData?.verificationStatus === "pending") && (
            <HowItWork sliderContent={creatorSliderContent} />
          )}
          <ProfileCard />
          {/* <FeedFilter /> */}
          <div className=" flex flex-col justify-center items-center gap-3">
            <PageFooter />
          </div>
        </div>
        {/* )} */}
      </div>
    </>
  );
};

export default FeedMyJob;
