import { Dropdown } from "antd";
import FeedDetailSkeleton from "../skeleton/skeleton-feed-detail";
import AssignUserTitleIcon from "./assign-user-title-icon";
import ThreeDot from "../../assets/images/svg/three-dot";
import Price from "../../assets/images/svg/price";
import PriceDisplay from "../common/price-display/price-display";
import Clock from "../../assets/images/svg/clock";
import { TimeAgo } from "../../utils/date";
import Location from "../../assets/images/svg/location";
import { capitalizeFirstWord } from "../../utils/helper";
import Category from "../category/category";
import LocationResponsive from "../common/location/location-responsive";
import JobStatusTitle from "../common/job-status-title/job-status-title";
import { useEffect, useMemo, useState } from "react";
import useScrollPosition from "../../hooks/use-scroll-position";
import RatingStar from "../brand-owner/rating-star";
import { useSelector } from "react-redux";
import { State } from "../../interfaces/store";
import LeftArrow from "../../assets/images/svg/left-arrow";
import { Link, useLocation } from "react-router-dom";

interface IAddViewReviewData {
  title: string;
  userId?: string;
  profileImageUri: string;
  name: string;
  jobId?: string;
  threadId?: string;
  fromUserId?: string;
  review?: number;
  description?: string;
}

const FeedDetailsCard = ({
  feedDetails,
  feedDetailsLoading,
  getFeedDetailsData,
}: {
  feedDetails: any;
  feedDetailsLoading: boolean;
  getFeedDetailsData: () => void;
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const [addViewReviewData, setAddViewReviewData] =
    useState<IAddViewReviewData>();
  const profileData = useSelector((state: State) => state?.profile?.profile);
  const scrollPosition = useScrollPosition();
  const location = useLocation();

  // Handle the open/close state of the dropdown
  const handleOpenChange = (open: boolean) => {
    setDropdownOpen(open);
  };
  // Handle the close state of the dropdown on scroll
  useEffect(() => {
    setDropdownOpen(false);
  }, [scrollPosition]);

  //   data for pass in review component
  const addReviewData = useMemo(
    () => ({
      title: "Add review",
      name: feedDetails?.userDetails?.name,
      profileImageUri: feedDetails?.userDetails?.profileImageUri,
      threadId: feedDetails?.threadDetails?.threadId,
      jobId: feedDetails?.id,
    }),
    [feedDetails]
  );

  const submitReviewData = {
    title: "View submit review",
    name: feedDetails?.userDetails?.name,
    profileImageUri: feedDetails?.userDetails?.profileImageUri,
  };

  const receiveReviewData = {
    title: "View submit review",
    name: profileData?.name,
    profileImageUri: profileData?.profileImageUri,
  };

  const DropDownContent = () => {
    return (
      <div className="w-210 bg-darkBlack gap-2 py-3 px-2 flex flex-col border border-grey rounded-3xl absolute top-0 right-0">
        <button
          onClick={() => {
            setDropdownOpen(false);
            setReviewModal(true);
            if (feedDetails?.reviews?.creatorReview) {
              setAddViewReviewData({
                ...submitReviewData,
                ...feedDetails?.reviews?.creatorReview,
              });
            } else {
              setAddViewReviewData(addReviewData);
            }
          }}
          className="text-mediumViolet text-base font-normal text-left hover:bg-smallBlue px-4 py-1 w-full rounded-md"
        >
          {feedDetails?.reviews?.creatorReview
            ? "View submit review"
            : "Add review"}
        </button>

        {feedDetails?.reviews?.businessOwnerReview && (
          <button
            onClick={() => {
              setDropdownOpen(false);
              setReviewModal(true);
              setAddViewReviewData({
                ...receiveReviewData,
                ...feedDetails?.reviews?.businessOwnerReview,
              });
            }}
            className="text-mediumViolet text-base font-normal text-left hover:bg-smallBlue px-4 py-1 w-full rounded-md"
          >
            View receive review
          </button>
        )}
      </div>
    );
  };

  return (
    <>
      {" "}
      <div className="feed-detail-comment max-md:bg-transparent max-md:px-0">
        {feedDetailsLoading && <FeedDetailSkeleton />}
        {!feedDetailsLoading && (
          <div className="group relative flex flex-col sm:gap-3 gap-2 rounded-18 h-full">
            {/* title start */}
            <div className="flex justify-between items-start gap-3">
              <div className="flex justify-center items-start md:gap-0 gap-2">
                <Link
                  to={location.pathname.startsWith("/my-job") ? "/my-job" : "/"}
                  className="md:hidden block -ml-2"
                >
                  <LeftArrow />
                </Link>
                <h1 className="sm:text-2xl text-lg font-semibold  leading-6 text-mediumViolet pr-1 capitalize">
                  {feedDetails?.title}
                </h1>
              </div>
              <div className="flex justify-center items-center gap-2">
                <div className="sm:block hidden">
                  {feedDetails?.threadDetails?.threadStatus === "approved" && (
                    <AssignUserTitleIcon
                      threadStatus={feedDetails?.threadDetails?.threadStatus}
                      threadId={feedDetails?.threadDetails?.threadId}
                    />
                  )}
                </div>
                {feedDetails?.status === "completed" && (
                  <div className="cursor-pointer">
                    <Dropdown
                      open={dropdownOpen}
                      onOpenChange={handleOpenChange}
                      dropdownRender={() => <DropDownContent />}
                      trigger={["click"]}
                    >
                      <div className=" m-0 p-0 w-full">
                        <ThreeDot width={32} height={32} />
                      </div>
                    </Dropdown>
                  </div>
                )}
              </div>
            </div>

            {/* time & location start for large screen */}
            <div className="w-full sm:block hidden">
              <div className="flex gap-5 w-full items-baseline">
                <div className="flex flex-row justify-start items-center gap-2">
                  <Price />
                  <div className="text-mediumViolet text-base font-normal leading-4">
                    <PriceDisplay
                      minPrice={feedDetails?.minPrice}
                      maxPrice={feedDetails?.maxPrice}
                    />
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <Clock />
                  <span className="card-clock text-base font-normal">
                    {TimeAgo(new Date(feedDetails?.createdAt))}
                  </span>
                </div>
                <div className="flex gap-1 items-center">
                  <div className="w-5 h-5">
                    <Location />
                  </div>
                  <span
                    className="w-full text-base font-normal leading-4 text-mediumViolet capitalize max-md:truncate"
                    title={feedDetails?.location
                      ?.toString()
                      ?.replaceAll(",", ", ")}
                  >
                    {feedDetails?.location?.toString()?.replaceAll(",", ", ")}
                  </span>
                </div>
              </div>

              {/* Assigned Job message  start*/}
            </div>

            {/* description start */}
            <p className="sm:text-xl text-base font-normal leading-7  text-mediumBlue">
              {capitalizeFirstWord(feedDetails?.description)}
            </p>

            {/* category start */}
            <Category data={feedDetails?.categories} />
            {/* category end */}

            <div className="w-full sm:hidden max-sm:flex justify-between items-end">
              <div className="w-full flex flex-col justify-center items-start gap-3 pt-1">
                {/* price start */}
                <div className="flex justify-start items-center gap-3">
                  <div className="flex flex-row justify-start items-center gap-2">
                    <Price />
                    <div className="text-mediumViolet text-base font-normal leading-4">
                      <PriceDisplay
                        minPrice={feedDetails?.minPrice}
                        maxPrice={feedDetails?.maxPrice}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 items-center">
                    <Clock />
                    <span className="card-clock text-base font-normal">
                      {TimeAgo(new Date(feedDetails?.createdAt))}
                    </span>
                  </div>
                </div>
                {/* location for mobile screen */}
                <div className="flex justify-between items-center w-full">
                  <LocationResponsive data={feedDetails?.location} />
                </div>
              </div>
            </div>

            {/* Assigned Job message  for responsive start */}
            <div className="w-full sm:hidden block">
              {feedDetails?.threadDetails?.threadStatus === "approved" && (
                <AssignUserTitleIcon
                  threadStatus={feedDetails?.threadDetails?.threadStatus}
                  threadId={feedDetails?.threadDetails?.threadId}
                />
              )}
            </div>
            {feedDetails?.status !== "active" && (
              <div className="absolute bottom-1 right-0 md:block hidden">
                <JobStatusTitle jobStatus={feedDetails?.status} />
              </div>
            )}
          </div>
        )}
      </div>
      {/* for write Review model*/}
      {/* {reviewModal && ( */}
      <RatingStar
        setReviewModal={setReviewModal}
        reviewModal={reviewModal}
        addViewReviewData={addViewReviewData}
        getDetailsApi={getFeedDetailsData}
      />
      {/* )} */}
    </>
  );
};

export default FeedDetailsCard;
