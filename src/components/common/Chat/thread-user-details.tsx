import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Dropdown } from "antd";
import { State } from "../../../interfaces/store";
import ThreeDot from "../../../assets/images/svg/three-dot";
import LeftArrow from "../../../assets/images/svg/left-arrow";
import ChatVerified from "../../../assets/images/svg/chat-verified";
import VerifiedGreen from "../../../assets/images/svg/verified-green";
import HttpService from "../../../services/http.service";
import { API_CONFIG } from "../../../utils/api";
import { IActiveThread, IChatList } from "../../../interfaces/message";
import { Link } from "react-router-dom";
import AssignArchiveModal from "./assign-archive-modal";
import GradientStar from "../../../assets/images/svg/gradient-star";
import RatingStar from "../../brand-owner/rating-star";
import AvatarImage from "../avatar-image/avatar-image";
import { useNotificationToaster } from "../../../hooks/use-notification-toaster";
import SkeletonThreadDetails from "../../skeleton/skeleton-thread-details";

const ThreadUserDetails = ({
  getThreadsData,
  activeThreadData,
  getActiveThreadsDetails,
  setActiveThreadData,
  isThreadDetailsLoading,
  setChatList,
}: {
  getThreadsData: () => void;
  activeThreadData: IActiveThread | null;
  getActiveThreadsDetails: (threadId?: string) => void;
  setActiveThreadData: Dispatch<SetStateAction<IActiveThread | null>>;
  isThreadDetailsLoading: boolean;
  setChatList: Dispatch<SetStateAction<IChatList[]>>;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [reviewModal, setReviewModal] = useState(false);
  const [isAssignArchiveModalOpen, setIsAssignArchiveModalOpen] =
    useState(false);
  const [jobStatus, setJobStatus] = useState<string>("");

  const [open, setOpen] = useState(false);
  const profileData = useSelector((state: State) => state?.profile?.profile);
  const { jobId, proposalId, user } = activeThreadData || {};
  const [addViewReviewData, setAddViewReviewData] = useState<any>(null);
  const navigate = useNavigate();
  const notify = useNotificationToaster();

  // for assigned & Archive Job
  const assignedArchiveJobHandler = useCallback(async () => {
    try {
      const activeStatus = jobStatus === "assign" ? "accept" : "reject";
      setLoading(true);
      const payload = {
        jobId: jobId,
        proposalId: proposalId,
        status: activeStatus === "accept" ? "approved" : "archived",
      };
      const response = await HttpService.post(
        `${API_CONFIG.path.myJob}/${jobId}/proposal/${proposalId}/${activeStatus}`,
        {
          ...payload,
        }
      );
      if (response) {
        setLoading(false);
        notify(
          "success",
          jobStatus === "assign"
            ? `Job assigned to ${user?.name} successful`
            : `Job archive to ${user?.name} successful`
        );
        setIsAssignArchiveModalOpen(false);
        document.body.style.overflow = "unset";
        if (jobStatus === "archive") {
          setActiveThreadData(null);
          setChatList([]);
          navigate("/message", { replace: true });
        } else {
          getThreadsData();
        }
      }
    } catch (error: any) {
      setLoading(false);
    }
  }, [
    getThreadsData,
    setActiveThreadData,
    jobStatus,
    jobId,
    proposalId,
    user,
    navigate,
    notify,
    setChatList,
  ]);

  const addReviewData = useMemo(
    () => ({
      title: "Add review",
      profileImageUri: user?.profileImageUri,
      name: user?.name,
      jobId: jobId,
      threadId: activeThreadData?.id,
    }),
    [user, jobId, activeThreadData?.id]
  );

  const submitReviewData = {
    title: "View submit review",
    profileImageUri: user?.profileImageUri,
    name: user?.name,
  };

  const receiverReviewData = {
    title: "View received review",
    profileImageUri: profileData?.profileImageUri,
    name: profileData?.name,
  };

  const completeJowHandler = useCallback(async () => {
    if (activeThreadData?.jobStatus === "active") {
      setLoading(true);
      try {
        const response = await HttpService.patch(
          `${API_CONFIG.path.myJob}/${jobId}/update-status`,
          {
            status: "completed",
          }
        );
        if (response) {
          notify("success", "Job completed successfully");
          setIsAssignArchiveModalOpen(false);
          setLoading(false);
          setReviewModal(true);
          document.body.style.overflow = "hidden";
          setAddViewReviewData(addReviewData);
        }
      } catch (error) {
        console.log("error", error);
        setLoading(false);
      }
    }
  }, [
    jobId,
    activeThreadData?.jobStatus,
    notify,
    setAddViewReviewData,
    addReviewData,
  ]);

  // for dropdown action button
  const handleOpenChange = (flag: boolean) => {
    setOpen(flag);
  };

  const handleClickInsideDropdown = () => {
    setOpen(false);
  };

  const DropDownContent = (props: any) => {
    const slug = props?.slug;
    return (
      <div className="bg-darkBlack gap-2 p-3 flex flex-col justify-start items-start border border-grey rounded-3xl">
        <Link
          to={
            profileData?.userType === "creator"
              ? `/feed-details/${slug}`
              : `/job-post-details/${slug}`
          }
          onClick={() => {
            handleClickInsideDropdown();
          }}
          className="text-lightWhite text-base font-medium text-left hover:bg-smallBlue hover:text-white px-2 py-1 w-full rounded-md"
        >
          View Job
        </Link>

        {profileData?.userType === "business_owner" && (
          <button
            onClick={() => {
              setIsAssignArchiveModalOpen(true);
              setJobStatus("archive");
              document.body.style.overflow = "hidden";
              handleClickInsideDropdown();
            }}
            className="text-lightWhite text-base font-medium text-left hover:bg-smallBlue px-2 py-1 w-full rounded-md"
          >
            Archive
          </button>
        )}

        {profileData?.userType === "business_owner" &&
          activeThreadData?.jobStatus !== "closed" && (
            <button
              onClick={() => {
                // Your logic to handle different statuses
                if (
                  activeThreadData?.jobStatus === "active" &&
                  activeThreadData?.threadDetails?.threadStatus === "pending"
                ) {
                  setIsAssignArchiveModalOpen(true);
                  document.body.style.overflow = "hidden";
                  setJobStatus("assign");
                } else if (
                  activeThreadData?.jobStatus === "active" &&
                  activeThreadData?.threadDetails?.threadStatus === "approved"
                ) {
                  setIsAssignArchiveModalOpen(true);
                  document.body.style.overflow = "hidden";
                  setJobStatus("complete");
                } else {
                  setReviewModal(true);
                  document.body.style.overflow = "hidden";
                  if (activeThreadData?.reviews?.businessOwnerReview) {
                    setAddViewReviewData({
                      ...submitReviewData,
                      ...activeThreadData?.reviews?.businessOwnerReview,
                    });
                  } else {
                    setAddViewReviewData(addReviewData);
                  }
                }
                handleClickInsideDropdown();
              }}
              className="sm:hidden block text-lightWhite text-base font-medium text-left hover:bg-smallBlue px-2 py-1 w-full rounded-md"
            >
              {activeThreadData?.jobStatus === "active" &&
              activeThreadData?.threadDetails?.threadStatus === "pending"
                ? "Assign job"
                : activeThreadData?.jobStatus === "active" &&
                  activeThreadData?.threadDetails?.threadStatus === "approved"
                ? "Complete"
                : activeThreadData?.reviews?.businessOwnerReview
                ? "View submit review"
                : "Add review"}
            </button>
          )}

        {profileData?.userType === "creator" &&
          activeThreadData?.jobStatus === "completed" && (
            <button
              onClick={() => {
                setReviewModal(true);
                document.body.style.overflow = "hidden";
                handleClickInsideDropdown();
                if (activeThreadData?.reviews.creatorReview) {
                  setAddViewReviewData({
                    ...submitReviewData,
                    ...activeThreadData?.reviews.creatorReview,
                  });
                } else {
                  setAddViewReviewData(addReviewData);
                }
              }}
              className="text-lightWhite text-base font-medium text-left hover:bg-smallBlue px-2 py-1 w-full rounded-md"
            >
              {activeThreadData?.reviews.creatorReview
                ? "View submitted review"
                : "Add review"}
            </button>
          )}

        {((profileData?.userType === "creator" &&
          activeThreadData?.reviews?.businessOwnerReview) ||
          (profileData?.userType === "business_owner" &&
            activeThreadData?.reviews?.creatorReview)) && (
          <button
            onClick={() => {
              setReviewModal(true);
              document.body.style.overflow = "hidden";
              handleClickInsideDropdown();
              if (profileData?.userType === "creator") {
                setAddViewReviewData({
                  ...receiverReviewData,
                  ...activeThreadData?.reviews.businessOwnerReview,
                });
              } else {
                setAddViewReviewData({
                  ...receiverReviewData,
                  ...activeThreadData?.reviews.creatorReview,
                });
              }
            }}
            className="text-lightWhite text-base font-medium text-left hover:bg-smallBlue px-2 py-1 w-full rounded-md"
          >
            View received review
          </button>
        )}
      </div>
    );
  };

  return (
    <>
      {isThreadDetailsLoading && <SkeletonThreadDetails />}
      {!isThreadDetailsLoading && activeThreadData && (
        <div className="w-full h-full flex justify-between items-center">
          <div className="w-full flex items-center max-md:justify-between">
            <div className="flex sm:gap-3 justify-center items-center">
              <button
                className="lg:hidden w-7 h-7 p-0 m-0 hover:scale-150"
                onClick={() => {
                  setActiveThreadData(null);
                  navigate("/message", {
                    replace: true,
                  });
                }}
              >
                <LeftArrow />
              </button>
              <Link
                to={
                  profileData?.userType === "creator"
                    ? `/business-owner-profile/${user?.slug}`
                    : `/influencer-profile/${user?.slug}`
                }
              >
                <AvatarImage
                  imageUrl={user?.profileImageUri}
                  className="mr-1"
                  size={55}
                />
              </Link>
              <div className="flex flex-col justify-start items-start gap-1">
                <div className="flex gap-2 items-center">
                  <p className="text-lightWhite text-base font-medium capitalize md:block hidden">
                    {user?.name?.slice(0, 30)}
                    {activeThreadData?.user?.name?.length > 30 && "..."}
                  </p>
                  <p className="text-lightWhite text-base font-medium capitalize md:hidden block max-xxs:hidden">
                    {activeThreadData?.user?.name?.slice(0, 28)}
                    {activeThreadData?.user?.name?.length > 28 && "..."}
                  </p>
                  <p className="text-lightWhite text-base font-medium capitalize xxs:hidden block  max-minSize:hidden">
                    {activeThreadData?.user?.name?.slice(0, 20)}
                    {activeThreadData?.user?.name?.length > 20 && "..."}
                  </p>
                  <p className="text-lightWhite text-base font-medium capitalize minSize:hidden block">
                    {activeThreadData?.user?.name?.slice(0, 13)}
                    {activeThreadData?.user?.name?.length > 13 && "..."}
                  </p>
                  {activeThreadData?.threadDetails?.threadStatus ===
                  "approved" ? (
                    <VerifiedGreen />
                  ) : (
                    <ChatVerified />
                  )}
                </div>
                {activeThreadData?.threadDetails?.threadStatus ===
                  "approved" && (
                  <div className="bg-gradient-to-r from-teal-400 via-indigo-500 to-pink-500 p-0.5 bg-transparent border-6 relative rounded-4xl">
                    <div className="h-6 py-4 px-2 flex bg-primary flex-row justify-around items-center rounded-4xl">
                      <div className="p-0.5 border-8 relative rounded-4xl ">
                        <GradientStar />
                      </div>
                      <p className="bg-gradient-to-t from-secondary to-primary text-transparent bg-clip-text">
                        Assigned
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center gap-3">
            {profileData?.userType === "business_owner" && (
              <div className="flex gap-3 items-center justify-center">
                {activeThreadData?.jobStatus !== "closed" && (
                  <button
                    onClick={() => {
                      document.body.style.overflow = "hidden";
                      if (
                        activeThreadData?.jobStatus === "active" &&
                        activeThreadData?.threadDetails?.threadStatus ===
                          "pending"
                      ) {
                        setIsAssignArchiveModalOpen(true);
                        setJobStatus("assign");
                      } else if (
                        activeThreadData?.jobStatus === "active" &&
                        activeThreadData?.threadDetails?.threadStatus ===
                          "approved"
                      ) {
                        setIsAssignArchiveModalOpen(true);
                        setJobStatus("complete");
                      } else {
                        setReviewModal(true);
                        if (activeThreadData?.reviews?.businessOwnerReview) {
                          setAddViewReviewData({
                            ...submitReviewData,
                            ...activeThreadData?.reviews?.businessOwnerReview,
                          });
                        } else {
                          setAddViewReviewData(addReviewData);
                        }
                      }
                    }}
                    className={`sm:block hidden bg-green hover:border hover:border-lightGreen ${
                      activeThreadData?.reviews?.businessOwnerReview
                        ? "w-44"
                        : "w-40"
                    } h-10 hover:bg-white text-white hover:text-green text-base font-semibold rounded-30 cursor-pointer`}
                  >
                    {activeThreadData?.jobStatus === "active" &&
                    activeThreadData?.threadDetails?.threadStatus === "pending"
                      ? "Assign job"
                      : activeThreadData?.jobStatus === "active" &&
                        activeThreadData?.threadDetails?.threadStatus ===
                          "approved"
                      ? "Complete"
                      : activeThreadData?.reviews?.businessOwnerReview
                      ? "View submit review"
                      : "Add review"}
                  </button>
                )}
              </div>
            )}
            <Dropdown
              open={open}
              onOpenChange={handleOpenChange}
              dropdownRender={() => (
                <DropDownContent slug={activeThreadData?.slug} />
              )}
              placement="bottomRight"
              trigger={["click"]}
            >
              <button className="w-7 h-7">
                <ThreeDot />
              </button>
            </Dropdown>
          </div>
        </div>
      )}
      {isAssignArchiveModalOpen && (
        <AssignArchiveModal
          isAssignArchiveModalOpen={isAssignArchiveModalOpen}
          setIsAssignArchiveModalOpen={setIsAssignArchiveModalOpen}
          activeUserName={user?.name}
          assignedArchiveJobHandler={assignedArchiveJobHandler}
          jobStatus={jobStatus}
          completeJowHandler={completeJowHandler}
          loading={loading}
        />
      )}
      {/* for write Review model*/}
      {reviewModal && (
        <RatingStar
          setReviewModal={setReviewModal}
          reviewModal={reviewModal}
          addViewReviewData={addViewReviewData}
          getDetailsApi={getActiveThreadsDetails}
        />
      )}
    </>
  );
};

export default ThreadUserDetails;
