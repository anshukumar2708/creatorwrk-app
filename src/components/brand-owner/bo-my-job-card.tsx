import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IFeedItem } from "../../interfaces/feed";
import { TimeAgo } from "../../utils/date";
import { useLocation, useNavigate } from "react-router-dom";
import UnderVerification from "../brand-owner/under-verification";
import ProfileNotCompletedModal from "../common/profile-not-completed-modal/profile-not-completed-modal";
import Location from "../../assets/images/svg/location";
import Clock from "../../assets/images/svg/clock";
import Price from "../../assets/images/svg/price";
import { IMyJobData, ImyJobFilter } from "../../interfaces/myJob";
import ActionButton from "../common/action-button/action-button";
import Category from "../category/category";
import PriceDisplay from "../common/price-display/price-display";
import LocationResponsive from "../common/location/location-responsive";
import ProposalCount from "../common/proposal-count/proposal-count";
import { capitalizeFirstWord } from "../../utils/helper";

const BoMyJobCard = ({
  data,
  setResetData,
  setFilters,
}: {
  data: IFeedItem | IMyJobData;
  setResetData: Dispatch<SetStateAction<boolean>>;
  setFilters: Dispatch<SetStateAction<ImyJobFilter>>;
}) => {
  const [verificationModal, setVerificationModal] = useState(false);
  const [completeProfileModal, setCompleteProfileModal] = useState(false);
  const [textLength, setTextLength] = useState<number>(180);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const breakpoints = [
      { width: 1170, length: 150 },
      { width: 1100, length: 130 },
      { width: 1024, length: 120 },
      { width: 1000, length: 180 },
      { width: 900, length: 160 },
      { width: 800, length: 145 },
      { width: 768, length: 130 },
      { width: 720, length: 160 },
      { width: 650, length: 140 },
      { width: 560, length: 120 },
      { width: 530, length: 110 },
      { width: 450, length: 90 },
      { width: 400, length: 70 },
      { width: 350, length: 60 },
      { width: 0, length: 45 },
    ];

    const handleResize = () => {
      const breakpoint = breakpoints.find((b) => window.innerWidth >= b.width);
      if (breakpoint) {
        setTextLength(breakpoint.length);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div
        onClick={() => {
          if (location.pathname === "/") {
            navigate(`/job-post-details/${data?.slug}`);
          } else {
            navigate(`/my-job/job-post-details/${data?.slug}`);
          }
        }}
        className="flex flex-col w-full cursor-pointer p-1px hover:bg-gradient-to-l hover:from-pink-400 hover:via-indigo-500 hover:to-teal-500 rounded-18 sm:mb-2 mb-1"
      >
        <div
          className={`w-full  ${
            data?.assignedUser?.length > 0
              ? "bg-gradient-to-l from-pink-400 via-indigo-500 to-teal-500 rounded-18 pb-0.5"
              : " "
          }   `}
        >
          <div className="group relative flex bg-black flex-col gap-3 sm:p-6 sm:pt-4 p-4 border border-lightGrey rounded-18 hover:border h-full">
            {/* title start & Action Button */}
            <div className="w-full flex justify-between items-center gap-2">
              <h1 className="w-full text-lg sm:font-semibold font-medium leading-6 text-mediumViolet pr-1 capitalize line-clamp-1">
                {data?.title}
              </h1>
              <div>
                <ActionButton
                  cards="sm:block hidden"
                  threeDots="block"
                  data={data}
                  setResetData={setResetData}
                  setFilters={setFilters}
                />
              </div>
            </div>

            {/* time & location start for large screen */}
            <div className="w-full sm:block hidden">
              <div className="flex gap-5 w-full items-baseline">
                <div className="flex gap-2 items-center">
                  <Clock />
                  <span className="card-clock text-sm font-normal">
                    {TimeAgo(new Date(data?.createdAt))}
                  </span>
                </div>
                <div className="flex gap-1 items-center ">
                  <div className="w-5 h-5">
                    <Location />
                  </div>
                  <span
                    className="w-full text-sm font-normal leading-4 text-mediumViolet capitalize max-md:truncate"
                    title={data?.location?.toString()?.replaceAll(",", ", ")}
                  >
                    {data?.location?.toString()?.replaceAll(",", ", ")}
                  </span>
                </div>
              </div>
            </div>

            {/* description start */}
            <p className="text-lg max-md:text-sm font-normal leading-7 text-mediumBlue">
              {data?.description.length > textLength ? (
                <span className="">
                  {capitalizeFirstWord(data?.description?.slice(0, textLength))}
                  ...
                </span>
              ) : (
                <span className="">
                  {capitalizeFirstWord(data?.description)}
                </span>
              )}

              {data?.description.length > textLength && (
                <span className="text-purple text-base cursor-pointer ml-1">
                  Read More
                </span>
              )}
            </p>

            {/* category start */}
            <div className="w-full" onClick={(e) => e.stopPropagation()}>
              <Category data={data?.categories} />
            </div>

            {/* price start */}
            <div className="w-full flex justify-start items-center gap-4">
              <div className="flex flex-row justify-start items-center gap-2">
                <Price />
                <div className="text-mediumViolet text-base font-normal leading-4">
                  <PriceDisplay
                    minPrice={data?.minPrice}
                    maxPrice={data?.maxPrice}
                  />
                </div>
              </div>
              <div className="sm:hidden max-sm:flex gap-2 items-center">
                <Clock />
                <span className="card-clock text-sm font-normal">
                  {TimeAgo(new Date(data?.createdAt))}
                </span>
              </div>
            </div>

            {/* location for mobile screen */}
            <div className="sm:hidden block w-full">
              <div className="flex justify-between items-center w-full">
                <LocationResponsive data={data?.location} />
              </div>
            </div>

            {/* proposals & count */}
            {(data?.userProposals?.length > 0 ||
              data?.assignedUser?.length > 0) && (
              <div className="md:absolute bottom-6 right-6 flex justify-between items-center">
                <ProposalCount
                  data={data?.userProposals}
                  proposalCount={data?.proposalCount}
                />
                <div className="sm:hidden block">
                  <ActionButton
                    cards="block"
                    threeDots="hidden"
                    data={data}
                    setResetData={setResetData}
                    setFilters={setFilters}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <UnderVerification
        verificationModal={verificationModal}
        setVerificationModal={setVerificationModal}
      />
      <ProfileNotCompletedModal
        completeProfileModal={completeProfileModal}
        setCompleteProfileModal={setCompleteProfileModal}
      />
    </>
  );
};

export default BoMyJobCard;
