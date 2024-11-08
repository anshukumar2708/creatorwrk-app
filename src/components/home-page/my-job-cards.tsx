import { Dispatch, SetStateAction, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Dropdown, Modal } from "antd";
import RightArrow from "../../assets/images/svg/right-arrow";
import Rupee from "../../assets/images/svg/rupee";
import ClockIcon from "../../assets/images/svg/clock-icon";
import Location from "../../assets/images/svg/location";
import ChatIcon from "../../assets/images/svg/chat-icon";
import NotResultFound from "../../assets/images/svg/not-result-found";
import Clock from "../../assets/images/svg/clock";
import DeleteGradient from "../../assets/images/svg/delete-gradient";
import Assigned from "../../assets/images/svg/assigned";
import ReelCreation from "../../assets/images/svg/reel-creation";
import { IAssignedProposalsUser, IMyJobData } from "../../interfaces/myJob";
import { TimeAgo } from "../../utils/date";
import { useSelector } from "react-redux";
import { State } from "../../interfaces/store";
import UnderVerification from "../brand-owner/under-verification";
import ButtonSpinner from "../common/button-spinner";
import HttpService from "../../services/http.service";
import { API_CONFIG } from "../../utils/api";
import Slider from "react-slick";
import Loader from "../common/loader";
import ThreeDot from "../../assets/images/svg/three-dot";
import NoExpireJobIcon from "../../assets/images/svg/no-expire-job";
import ProfileNoJob from "../../assets/images/svg/profile-no-job";
import NoCompletedJob from "../../assets/images/svg/no-completed-job";
import AvatarImage from "../common/avatar-image/avatar-image";
import ActionModal from "../common/action-modal/action-mdal";
import { useNotificationToaster } from "../../hooks/use-notification-toaster";

const MyJobCards = ({
  myJobData,
  filter,
  getMyJobData,
  setResetData,
  searchLoading,
}: {
  myJobData: IMyJobData[];
  filter: any;
  getMyJobData: () => void;
  setResetData: Dispatch<SetStateAction<boolean>>;
  searchLoading: boolean;
}) => {
  const navigate = useNavigate();
  const [verificationModal, setVerificationModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState<boolean>(false);
  const [jobStatus, setJobStatus] = useState<string>("");
  const [jobId, setJobId] = useState<string>("");
  const profileData = useSelector((state: State) => state.profile);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const notify = useNotificationToaster();

  const detailsRedirectHandler = (slug: string) => {
    if (profileData?.profile?.status === "active") {
      if (profileData?.profile?.userType === "business_owner") {
        navigate(`/job-post-details/${slug}`);
      } else if (profileData?.profile?.userType === "creator") {
        navigate(`/feed-details/${slug}`);
      }
    } else {
      setVerificationModal(true);
    }
  };

  const editJobHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    jobSlug: string
  ) => {
    e.stopPropagation();
    navigate(`/update-job/${jobSlug}`);
  };

  const messageHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    threadId: string
  ) => {
    e.stopPropagation();
    navigate(`/message?threadId=${threadId}`);
  };

  // for open Modal
  const deleteModalOpenHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    jobId: string
  ) => {
    e.stopPropagation();
    setDeleteModal(true);
    document.body.style.overflow = "hidden";
    setJobId(jobId);
  };

  // for close Delete Modal
  const closeDeleteModalHandler = () => {
    setDeleteModal(false);
    document.body.style.overflow = "unset";
  };

  // for close Action Modal
  const closeActionModalHandler = () => {
    setIsActionModalOpen(false);
    document.body.style.overflow = "unset";
  };

  // for delete , complete & close jobs
  const jobUpdateHandler = async () => {
    if (jobStatus && jobId) {
      setResetData(true);
      try {
        setLoading(true);
        const response = await HttpService.patch(
          `${API_CONFIG.path.myJob}/${jobId}/update-status`,
          {
            status: jobStatus,
          }
        );
        if (response) {
          setLoading(false);
          getMyJobData();
          // message.success(`Your Job ${jobStatus} Successfully`);
          notify("success", `Your job ${jobStatus} successfully`);
          closeDeleteModalHandler();
          closeActionModalHandler();
        }
      } catch (error) {
        console.log("error", error);
        setLoading(false);
      }
    }
    setLoading(false);
  };

  // for ComPlete Close Job Modal
  const ComPleteCloseJobModal = (
    e: React.MouseEvent<HTMLButtonElement>,
    jobId: string
  ) => {
    e.stopPropagation();
    setIsActionModalOpen(true);
    document.body.style.overflow = "hidden";
    setJobId(jobId);
  };

  const AllowDisallowCommentHandler = async () => {
    if (jobStatus && jobId) {
      setResetData(true);
      try {
        setLoading(true);
        const response = await HttpService.patch(
          `${API_CONFIG.path.myJob}/${jobId}/allow-disallow`,
          {
            allowedProposals: jobStatus === "Disable" ? false : true,
          }
        );
        if (response) {
          setLoading(false);
          getMyJobData();
          // message.success(`${jobStatus} commenting for this job Successfully`);
          notify(
            "success",
            `${jobStatus} commenting for this job successfully`
          );
          closeActionModalHandler();
        }
      } catch (error) {
        console.log("error", error);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight: true,
    nextArrow: (
      // <img className="md:hidden max-sm:w-6" src={rightArrow} alt="rightArrow" />
      <span className="md:hidden max-sm:w-6">
        <RightArrow />
      </span>
    ),
  };

  // Handle the open/close state of the dropdown
  const handleOpenChange = (isOpen: any, id: any) => {
    if (isOpen) {
      setOpenDropdownId(id);
    } else {
      setOpenDropdownId(null);
    }
  };

  const handleClickInsideDropdown = () => {
    setOpenDropdownId(null);
  };

  const DropDownContent = (data: any) => {
    let item = data?.data;
    return (
      <div className=" w-[215px] bg-darkBlack gap-2 py-3 px-2 flex flex-col border border-grey rounded-3xl absolute top-0 right-0">
        <button
          onClick={(e) => {
            editJobHandler(e, item?.slug);
            handleClickInsideDropdown();
          }}
          className="text-mediumViolet text-base font-normal text-left hover:bg-smallBlue px-4 py-1 w-full rounded-md"
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            deleteModalOpenHandler(e, item?.id);
            setJobStatus("deleted");
            handleClickInsideDropdown();
          }}
          className="text-mediumViolet text-base font-normal text-left hover:bg-smallBlue px-4 py-1 w-full rounded-md"
        >
          Delete
        </button>
        <button
          onClick={(e) => {
            ComPleteCloseJobModal(e, item?.id);
            setJobStatus("closed");
            handleClickInsideDropdown();
          }}
          className="text-mediumViolet text-base font-normal text-left hover:bg-smallBlue px-4 py-1 w-full rounded-md"
        >
          Mark as close
        </button>
        {item?.assignedUser.length > 0 && (
          <button
            onClick={(e) => {
              ComPleteCloseJobModal(e, item?.id);
              setJobStatus("completed");
              handleClickInsideDropdown();
            }}
            className="text-mediumViolet text-base font-normal text-left hover:bg-smallBlue px-4 py-1 w-full rounded-md"
          >
            Mark as completed
          </button>
        )}
        <button
          onClick={(e) => {
            ComPleteCloseJobModal(e, item?.id);
            setJobStatus(item?.allowedProposals ? "Disable" : "Enable");
            handleClickInsideDropdown();
          }}
          className="text-mediumViolet text-base font-normal text-left hover:bg-smallBlue px-4 py-1 w-full rounded-md"
        >
          {` ${item?.allowedProposals ? "Disable" : "Enable "} commenting`}
        </button>
      </div>
    );
  };

  return (
    <>
      <div className="w-full flex flex-wrap justify-center md:justify-start items-center gap-3.5">
        {myJobData?.length > 0 &&
          !searchLoading &&
          myJobData?.map((item: IMyJobData, index: number) => {
            return (
              <div
                className="owner-home-card flex flex-col justify-between items-start cursor-pointer"
                key={index}
                onClick={() => detailsRedirectHandler(item?.slug)}
              >
                <div className="w-full">
                  <div className="flex justify-between my-job-card">
                    <div className="flex gap-4 justify-center items-center">
                      <ReelCreation />
                      <h3 className="text-mediumViolet text-lg font-medium leading-6 capitalize max-w-52 ">
                        {item?.title.slice(0, 23)}
                        {item?.title?.length > 23 && "..."}{" "}
                        {item?.title?.length > 23 && (
                          <span className="text-sm text-secondary">
                            read more
                          </span>
                        )}
                      </h3>
                    </div>
                    {/* only for business owner  */}
                    {profileData?.profile?.userType === "business_owner" &&
                      item?.status === "active" && (
                        <div onClick={(e: any) => e.stopPropagation()}>
                          <Dropdown
                            open={openDropdownId === item.id}
                            onOpenChange={(isOpen) =>
                              handleOpenChange(isOpen, item.id)
                            }
                            dropdownRender={() => (
                              <DropDownContent data={item} />
                            )}
                            placement="bottomRight"
                            trigger={["click"]}
                          >
                            <button className="w-7 h-7">
                              <ThreeDot />
                            </button>
                          </Dropdown>
                        </div>
                      )}
                  </div>
                  <p className="text-mediumBlue text-base font-normal pt-6 h-[5rem]">
                    {item?.description.slice(0, 65)}
                    {item?.description?.length > 65 && "..."}
                  </p>
                  {item?.categories?.length >= 3 && (
                    <div
                      className="flex justify-between items-center my-4 category-slider max-md:overflow-hidden"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Slider {...settings} className="w-full">
                        {item.categories.map((category, index) => (
                          <div
                            className=" flex justify-center items-center gap-4 !w-10"
                            key={index}
                          >
                            <div className="category ml-10">
                              <p className="category-text">{category}</p>
                            </div>
                          </div>
                        ))}
                      </Slider>
                    </div>
                  )}
                  {item?.categories?.length < 3 && (
                    <div className="flex flex-row justify-start items-start mt-4 mb-6 gap-3">
                      {item.categories.map((category, index) => (
                        <div
                          className=" flex justify-center items-center gap-4"
                          key={index}
                        >
                          <div className="category">
                            <p className="category-text">{category}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex w-full items-start justify-start gap-3 max-sm:flex-col">
                    <div className="flex gap-1 w-full sm:w-[28%] items-center">
                      <Clock />
                      <span className="card-clock">
                        {TimeAgo(new Date(item?.createdAt))} ago
                      </span>
                    </div>
                    <div className="flex gap-1 w-full sm:w-[27%] items-center break-all">
                      <div>
                        <Location />
                      </div>
                      <span
                        title={item?.location?.toString()}
                        className="text-sm font-normal leading-4 text-mediumViolet capitalize sm:truncate"
                      >
                        {item?.location?.toString()}
                      </span>
                    </div>
                    <div className="flex gap-1 w-full sm:w-[46%] items-start">
                      <ClockIcon />
                      <div className="text-mediumViolet font-sm font-normal leading-4">
                        <div className="flex items-center">
                          <Rupee />
                          {item?.minPrice === item?.maxPrice && item?.minPrice}
                          {item?.minPrice !== item?.maxPrice && (
                            <p className="text-white max-md:text-sm">
                              {item?.minPrice} - {item?.maxPrice}
                            </p>
                          )}
                        </div>
                        <span className="card-price">
                          {" "}
                          {item?.minPrice === item?.maxPrice
                            ? "Fixed price"
                            : "Range Price"}{" "}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full group font-medium flex items-center justify-between max-lg:justify-between mt-4">
                  {
                    <div className="w-full flex justify-between items-end md:w-full gap-8 max-md:gap-3">
                      {profileData?.profile?.userType === "business_owner" ? (
                        <div className="flex gap-3 items-center">
                          <Avatar.Group
                            max={{
                              count: 3,
                              style: {
                                color: "#000000",
                                backgroundColor: "#5242B6",
                              },
                            }}
                          >
                            {item?.userProposals?.length > 0 &&
                              item?.userProposals?.map(
                                (
                                  proposalUsers: IAssignedProposalsUser,
                                  index: number
                                ) => {
                                  return (
                                    <AvatarImage
                                      key={index}
                                      imageUrl={proposalUsers?.profileImageUri}
                                      name={proposalUsers?.name}
                                      size={40}
                                    />
                                  );
                                }
                              )}
                          </Avatar.Group>
                          {parseInt(item?.proposalCount) - 3 > 0 && (
                            <div className="p-2 rounded-full border-[0.6px] border-grey w-8 h-8 flex justify-center items-center">
                              <h5 className="text-sm font-normal leading-4 text-white">
                                {parseInt(item?.proposalCount) - 3}+
                              </h5>
                            </div>
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                      {/* myJob home page for business owner */}
                      {profileData?.profile?.userType === "business_owner" &&
                        item?.assignedUser.length > 0 && (
                          <div className="flex flex-col items-center">
                            <div className="flex justify-end items-center py-2.5">
                              <p className="text-base font-medium leading-4 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                                Job assigned to
                              </p>
                            </div>
                            <div className="flex gap-1 justify-center items-center">
                              <div className="flex gap-1.5 items-center">
                                <AvatarImage
                                  imageUrl={
                                    item?.assignedUser[0]?.profileImageUri
                                  }
                                  className="inline-block w-8 h-8 md:h-8 md:w-8 rounded-full bg-smallBlue hover:scale-110"
                                />
                                <p className="text-mediumViolet text-sm font-semibold capitalize">
                                  {item?.assignedUser[0]?.name?.slice(0, 12)}
                                  {item?.assignedUser[0]?.name?.length > 12 &&
                                    "..."}
                                </p>
                              </div>
                              <div
                                onClick={(e: any) =>
                                  messageHandler(
                                    e,
                                    item?.assignedUser[0]?.threadId
                                  )
                                }
                                className="hover:bg-[#6174FF] p-1.5 hover:rounded-2xl"
                              >
                                <ChatIcon />
                              </div>
                            </div>
                          </div>
                        )}
                      {/* My Job Page for influencer*/}
                      {profileData?.profile?.userType === "creator" &&
                        item?.threadDetails && (
                          <div className="w-full group font-medium flex items-center justify-end mt-4">
                            <div className="flex justify-center items-center gap-2">
                              {item?.threadDetails?.threadStatus ===
                                "approved" && (
                                <div className="flex items-center gap-2 max-md:gap-1 ">
                                  <Assigned />
                                  <h6 className=" text-sm font-normal text-white">
                                    Assigned
                                  </h6>
                                </div>
                              )}
                              {item?.threadDetails?.threadStatus !==
                                "archived" && (
                                <div
                                  onClick={(e: any) =>
                                    messageHandler(
                                      e,
                                      item?.threadDetails?.threadId
                                    )
                                  }
                                  className="hover:bg-[#6174FF] p-1.5 hover:rounded-2xl"
                                >
                                  <ChatIcon />
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                    </div>
                  }
                </div>
              </div>
            );
          })}
        {searchLoading && (
          <div className="flex justify-center items-center h-80 w-full">
            <Loader />
          </div>
        )}
      </div>
      {/* check status of user */}
      <UnderVerification
        verificationModal={verificationModal}
        setVerificationModal={setVerificationModal}
      />
      {/* delete modal */}
      <Modal
        className="common-modal modal-bottom sm:!max-w-[450px]"
        centered
        open={deleteModal}
        onOk={closeDeleteModalHandler}
        onCancel={closeDeleteModalHandler}
        zIndex={9999}
        width={450}
      >
        <div className="bg-primary flex flex-col justify-center items-center rounded-[18px]">
          <div className="flex flex-col justify-center items-center border-[#3D3F58] sm:border-b-1 border-b-0 border w-full h-[353px] sm:h-[337px] rounded-[18px] gap-8 p-2.5 text-center ">
            <DeleteGradient />
            <div className="w-full flex flex-col justify-center items-center">
              <h1 className="text-lightWhite text-[20px] sm:text-[24px] font-semibold">
                Delete Job?
              </h1>
              <p className="text-[16px] sm:text-[18px] font-normal text-grey max-w-xs">
                Are you really want to delete the job.
              </p>
            </div>
            <div className="flex w-full flex-row justify-center max-sm:flex-col max-sm:gap-3 gap-6 items-center">
              <button
                onClick={jobUpdateHandler}
                disabled={loading ? true : false}
                className="w-smallMedium  h-11 hover:bg-white hover:text-black border-1  rounded-4xl rounded-1 font-medium text-white text-base"
              >
                <ButtonSpinner loading={loading} />
                YES
              </button>
              <button
                onClick={() => closeDeleteModalHandler()}
                className="w-smallMedium h-11 border bg-white text-black hover:border-1 hover:text-white hover:border-white hover:bg-transparent  rounded-4xl rounded-1 font-medium  text-base"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* No jobs data Available */}
      {myJobData?.length === 0 && !filter?.searchQuery && !searchLoading && (
        <div className="flex flex-col justify-center items-center h-80 text-center ">
          {/* <img src={jobNotFoundIcon} alt="profile-no-job" /> */}
          {filter?.status === "active" && <ProfileNoJob />}
          {filter?.status === "completed" && <NoCompletedJob />}
          {filter?.status === "closed" && <NoExpireJobIcon />}
          <h1 className="text-white text-2xl font-semibold leading-7 mt-5">
            {filter?.status === "active" && "No Active Jobs"}
            {filter?.status === "completed" && "No Completed Job"}
            {filter?.status === "closed" && "No Closed Job"}
          </h1>
          {filter?.status === "active" &&
            profileData?.profile?.userType === "business_owner" && (
              <p className="text-lg font-normal text-blue">
                Currently, no jobs created yet.
              </p>
            )}
          {profileData?.profile?.userType === "business_owner" && (
            <Link
              to="/create-job"
              className="w-44 h-11 flex flex-col justify-center items-center  !mt-8 bg-profile-pattern hover:shadow-custom-white rounded-4xl rounded-1 font-semibold text-white text-base"
            >
              Create Job
            </Link>
          )}
        </div>
      )}
      {/* Not Found Data on Search */}
      {myJobData?.length === 0 && filter?.searchQuery && !searchLoading && (
        <div className="flex flex-col justify-center items-center gap-6 h-80">
          <div className="flex flex-col justify-center items-center space-y-4 ">
            {/* <img src={notResultFound} alt="notResultFound" /> */}
            <NotResultFound />
            <h1 className="text-white text-2xl font-semibold leading-7">
              No Result found
            </h1>
            <p className="text-lg font-normal leading-5 text-blue max-w-xs text-center">
              Sorry, there are no results for this search, please try another
              phase.
            </p>
          </div>
        </div>
      )}

      {/* modal for action button */}
      <ActionModal
        loading={loading}
        jobStatus={
          jobStatus === "Disable" || jobStatus === "Enable"
            ? jobStatus
            : jobStatus.slice(0, jobStatus.length - 1)
        }
        message={`Are you sure to ${
          jobStatus === "Disable" || jobStatus === "Enable"
            ? jobStatus
            : jobStatus.slice(0, jobStatus.length - 1)
        } ${
          jobStatus === "Disable" || jobStatus === "Enable"
            ? "commenting for"
            : ""
        } this job?`}
        isActionModalOpen={isActionModalOpen}
        // setIsActionModalOpen={setIsActionModalOpen}
        closeActionModalHandler={closeActionModalHandler}
        jobUpdateHandler={
          jobStatus === "Disable" || jobStatus === "Enable"
            ? AllowDisallowCommentHandler
            : jobUpdateHandler
        }
      />
    </>
  );
};
export default MyJobCards;
