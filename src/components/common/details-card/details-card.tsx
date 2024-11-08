import Clock from "../../../assets/images/svg/clock";
import Location from "../../../assets/images/svg/location";
import Price from "../../../assets/images/svg/price";
import { IJobPostDetails } from "../../../interfaces/job-post-details";
import PriceDisplay from "../price-display/price-display";
import Category from "../../category/category";
import { TimeAgo } from "../../../utils/date";
import LocationResponsive from "../location/location-responsive";
import ActionButton from "../action-button/action-button";
import { useCallback, useMemo, useState } from "react";
import AssignArchiveModal from "../Chat/assign-archive-modal";
import RatingStar from "../../brand-owner/rating-star";
import HttpService from "../../../services/http.service";
import { API_CONFIG } from "../../../utils/api";
import { useNotificationToaster } from "../../../hooks/use-notification-toaster";
import { capitalizeFirstWord } from "../../../utils/helper";
import JobStatusTitle from "../job-status-title/job-status-title";
import { Link, useLocation } from "react-router-dom";
import LeftArrow from "../../../assets/images/svg/left-arrow";

const DetailsCard = ({
  data,
  getJobDetailsData,
}: {
  data: IJobPostDetails | null;
  getJobDetailsData: () => void;
}) => {
  const [isAssignArchiveModalOpen, setIsAssignArchiveModalOpen] =
    useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [addViewReviewData, setAddViewReviewData] = useState<any>(null);
  const notify = useNotificationToaster();
  const location = useLocation();

  // data for pass in review component
  const addReviewData = useMemo(
    () => ({
      title: "Add review",
      threadId: data?.assignedUser[0]?.threadId,
      name: data?.assignedUser[0]?.name,
      profileImageUri: data?.assignedUser[0]?.profileImageUri,
      jobId: data?.id,
    }),
    [data]
  );
  const submitReviewData = {
    title: "View submit review",
    name: data?.assignedUser[0]?.name,
    profileImageUri: data?.assignedUser[0]?.profileImageUri,
  };

  // for complete job and Write review
  const completeJobWriteReviewHandler = useCallback(async () => {
    if (data?.status === "active") {
      setLoading(true);
      try {
        const response = await HttpService.patch(
          `${API_CONFIG.path.myJob}/${data?.id}/update-status`,
          {
            status: "completed",
          }
        );
        if (response) {
          getJobDetailsData();
          notify("success", "Job Completed Successfully");
          setIsAssignArchiveModalOpen(false);
          setLoading(false);
          setReviewModal(true);
          setAddViewReviewData(addReviewData);
        }
      } catch (error) {
        console.log("error", error);
        setLoading(false);
      }
    } else {
      setReviewModal(true);
      setAddViewReviewData(addReviewData);
      document.body.style.overflow = "hidden";
    }
  }, [
    getJobDetailsData,
    data?.id,
    data?.status,
    notify,
    setAddViewReviewData,
    addReviewData,
  ]);

  return (
    <>
      <div className="flex flex-col gap-3 rounded-18 h-full w-full">
        {/* title & action buttons start  */}
        <div className="w-full flex justify-between items-start gap-3">
          <div className="flex justify-center items-start gap-2">
            <Link
              to={location.pathname.startsWith("/my-job") ? "/my-job" : "/"}
              className="md:hidden block -ml-2"
            >
              <LeftArrow />
            </Link>
            <h1 className="w-full sm:text-2xl text-lg  font-semibold leading-6 text-mediumViolet pr-1 capitalize">
              {data?.title}
            </h1>
          </div>
          <ActionButton
            data={data}
            cards="lg:block hidden"
            threeDots="block"
            getJobDetailsData={getJobDetailsData}
            setReviewModal={setReviewModal}
            setAddViewReviewData={setAddViewReviewData}
          />
        </div>
        {/* time & location start for large screen */}
        <div className="w-full sm:block hidden">
          <div className="flex gap-5 w-full items-baseline">
            <div className="flex flex-row justify-start items-center gap-2">
              <Price />
              <div className="text-mediumViolet text-base font-normal leading-4">
                <PriceDisplay
                  minPrice={data?.minPrice}
                  maxPrice={data?.maxPrice}
                />
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <Clock />
              <span className="card-clock text-base font-normal">
                {TimeAgo(new Date(data?.createdAt as any))}
              </span>
            </div>
            <div className="flex gap-1 items-center ">
              <div className="w-5 h-5">
                <Location />
              </div>
              <span
                className="w-full text-base font-normal leading-4 text-mediumViolet capitalize max-md:truncate"
                title={data?.location?.toString()?.replaceAll(",", ", ")}
              >
                {data?.location?.toString()?.replaceAll(",", ", ")}
              </span>
            </div>
          </div>
        </div>
        {/* description start */}
        <p className="sm:text-xl text-base font-normal leading-7 text-mediumBlue">
          {capitalizeFirstWord(data?.description)}
        </p>
        {/* category start */}
        <Category data={data?.categories} />
        <div className="w-full sm:hidden max-sm:flex justify-between items-end">
          <div className="w-full flex flex-col justify-center items-start gap-3 pt-1">
            {/* price start */}
            <div className="flex justify-start items-center gap-3">
              <div className="flex flex-row justify-start items-center gap-2">
                <Price />
                <div className="text-mediumViolet text-base font-normal leading-4">
                  <PriceDisplay
                    minPrice={data?.minPrice}
                    maxPrice={data?.maxPrice}
                  />
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <Clock />
                <span className="card-clock text-base font-normal">
                  {TimeAgo(new Date(data?.createdAt as any))}
                </span>
              </div>
            </div>
            {/* location for mobile screen */}
            <div className="flex justify-between items-center w-full">
              <LocationResponsive data={data?.location} />
            </div>
          </div>
        </div>

        {/* mark as completed & Review & Action button greater lg screen */}
        <div className="lg:absolute lg:bottom-5 lg:right-5 max-lg:hidden">
          <div className="flex justify-center item-center gap-3">
            {data?.status !== "active" && (
              <JobStatusTitle jobStatus={data?.status} />
            )}
            {data &&
              data?.assignedUser?.length > 0 &&
              data?.status !== "closed" && (
                <button
                  onClick={() => {
                    document.body.style.overflow = "hidden";
                    if (data?.status === "active") {
                      setIsAssignArchiveModalOpen(true);
                    } else {
                      setReviewModal(true);
                      if (data?.isReviewed) {
                        setAddViewReviewData({
                          ...submitReviewData,
                          ...data?.reviews?.businessOwnerReview,
                        });
                      } else {
                        setAddViewReviewData(addReviewData);
                      }
                    }
                  }}
                  className="md:w-52 w-full h-10 leading-4 text-primary hover:text-white  text-base font-semibold  max-xs:w-56 hover:bg-transparent hover:border hover:border-white  bg-white rounded-sm flex justify-center p-2.5 items-center gap-2.5"
                >
                  {data?.status === "active"
                    ? "Mark as completed"
                    : !data?.isReviewed
                    ? "Write Review"
                    : "View submit review"}
                </button>
              )}
          </div>
        </div>

        {/* mark as completed & Review & Action button less then lg screen */}
        {((data && data?.assignedUser?.length > 0) ||
          data?.status === "closed") && (
          <div className="lg:hidden max-lg:flex justify-end items-center w-full">
            <div
              className={`flex sms:justify-end w-full
             ${
               data?.status === "active" ? "justify-end" : "justify-between"
             } items-center sm:gap-4 gap-2`}
            >
              {data?.status !== "active" && (
                <JobStatusTitle jobStatus={data?.status} />
              )}
              {data?.status !== "closed" && (
                <div
                  className={`sms:block w-full ${
                    data?.status !== "active" ? "hidden" : ""
                  }  `}
                >
                  {data && data?.assignedUser?.length > 0 && (
                    <button
                      onClick={() => {
                        document.body.style.overflow = "hidden";
                        if (data?.status === "active") {
                          setIsAssignArchiveModalOpen(true);
                        } else {
                          setReviewModal(true);
                          if (data?.isReviewed) {
                            setAddViewReviewData({
                              ...submitReviewData,
                              ...data?.reviews?.businessOwnerReview,
                            });
                          } else {
                            setAddViewReviewData(addReviewData);
                          }
                        }
                      }}
                      className="w-full h-9 leading-4 text-primary hover:text-white  text-base font-semibold  hover:bg-transparent hover:border hover:border-white  bg-white rounded-sm flex justify-center p-2.5 items-center gap-2.5"
                    >
                      {data?.status === "active"
                        ? "Mark as completed"
                        : !data?.isReviewed
                        ? "Write Review"
                        : "View submit review"}
                    </button>
                  )}
                </div>
              )}
              <ActionButton
                data={data}
                cards="block"
                threeDots="hidden"
                getJobDetailsData={getJobDetailsData}
                setReviewModal={setReviewModal}
                setAddViewReviewData={setAddViewReviewData}
              />
            </div>
          </div>
        )}

        {/* mark as completed & Review less then sm screen */}
        {data?.status === "completed" && (
          <div className="sms:hidden  block w-full mt-2">
            <button
              onClick={() => {
                document.body.style.overflow = "hidden";
                setReviewModal(true);
                if (data?.isReviewed) {
                  setAddViewReviewData({
                    ...submitReviewData,
                    ...data?.reviews?.businessOwnerReview,
                  });
                } else {
                  setAddViewReviewData(addReviewData);
                }
              }}
              className="w-full h-9 leading-4 text-primary hover:text-white  text-base font-semibold  hover:bg-transparent hover:border hover:border-white  bg-white rounded-sm flex justify-center p-2.5 items-center gap-2.5"
            >
              {!data?.isReviewed ? "Write Review" : "View submit review"}
            </button>
          </div>
        )}
      </div>
      {isAssignArchiveModalOpen && (
        <AssignArchiveModal
          isAssignArchiveModalOpen={isAssignArchiveModalOpen}
          setIsAssignArchiveModalOpen={setIsAssignArchiveModalOpen}
          activeUserName={data?.assignedUser[0]?.name}
          jobStatus={data?.status === "active" ? "complete" : " "}
          completeJowHandler={completeJobWriteReviewHandler}
          loading={loading}
        />
      )}
      {/* for write Review model*/}
      {reviewModal && (
        <RatingStar
          setReviewModal={setReviewModal}
          reviewModal={reviewModal}
          addViewReviewData={addViewReviewData}
          getDetailsApi={getJobDetailsData}
        />
      )}
    </>
  );
};

export default DetailsCard;
