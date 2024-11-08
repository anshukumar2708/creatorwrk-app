import { Dropdown } from "antd";
import ThreeDot from "../../assets/images/svg/three-dot";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNotificationToaster } from "../../hooks/use-notification-toaster";
import BoMyJobDeleteModal from "./bo-my-job-delete-modal";
import ActionModal from "../common/action-modal/action-mdal";
import HttpService from "../../services/http.service";
import { API_CONFIG } from "../../utils/api";
import useScrollPosition from "../../hooks/use-scroll-position";
import { useSelector } from "react-redux";
import { State } from "../../interfaces/store";

const BoThreeDotsAction = ({
  data,
  setResetData,
  setFilters,
  getJobDetailsData,
  setReviewModal,
  setAddViewReviewData,
}: any) => {
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState<boolean>(false);
  const [jobStatus, setJobStatus] = useState<string>("");
  const profileData = useSelector((state: State) => state?.profile?.profile);
  const notify = useNotificationToaster();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const scrollPosition = useScrollPosition();

  // for open Modal
  const deleteModalOpenHandler = () => {
    setDeleteModal(true);
    document.body.style.overflow = "hidden";
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

  // for ComPlete Close Job Modal
  const openActionModalHandler = () => {
    setIsActionModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  // for delete , complete & close jobs
  const jobUpdateHandler = async () => {
    if (jobStatus) {
      location?.pathname === "/" && setResetData(true);
      try {
        setLoading(true);
        const response = await HttpService.patch(
          `${API_CONFIG.path.myJob}/${data?.id}/update-status`,
          {
            status: jobStatus,
          }
        );
        if (response) {
          notify("success", `Your job ${jobStatus} successfully`);
          if (location?.pathname === "/") {
            setFilters((prevData: any) => ({
              ...prevData,
              page: 1,
            }));
          } else {
            getJobDetailsData();
            navigate("/");
          }
          closeDeleteModalHandler();
          closeActionModalHandler();
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const AllowDisallowCommentHandler = async () => {
    if (jobStatus) {
      location?.pathname === "/" && setResetData(true);
      try {
        setLoading(true);
        const response = await HttpService.patch(
          `${API_CONFIG.path.myJob}/${data?.id}/allow-disallow`,
          {
            allowedProposals: jobStatus === "Disable" ? false : true,
          }
        );
        if (response) {
          setLoading(false);
          if (location?.pathname === "/") {
            setFilters((prevData: any) => ({
              ...prevData,
              page: 1,
            }));
          } else {
            getJobDetailsData();
          }
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

  // Handle the open/close state of the dropdown
  const handleOpenChange = (open: boolean) => {
    setDropdownOpen(open);
  };

  // Handle the close state of the dropdown on scroll
  useEffect(() => {
    setDropdownOpen(false);
  }, [scrollPosition]);

  const DropDownContent = () => {
    return (
      <div className="w-215 bg-darkBlack gap-2 py-3 px-2 flex flex-col border border-grey rounded-3xl absolute top-0 right-0">
        {data?.status === "active" && (
          <>
            <button
              onClick={() => {
                navigate(`/update-job/${data?.slug}`);
                setDropdownOpen(false);
              }}
              className="text-mediumViolet text-base font-normal text-left hover:bg-smallBlue px-4 py-1 w-full rounded-md"
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                deleteModalOpenHandler();
                setJobStatus("deleted");
                setDropdownOpen(false);
              }}
              className="text-mediumViolet text-base font-normal text-left hover:bg-smallBlue px-4 py-1 w-full rounded-md"
            >
              Delete
            </button>
            <button
              onClick={(e) => {
                openActionModalHandler();
                setJobStatus("closed");
                setDropdownOpen(false);
              }}
              className="text-mediumViolet text-base font-normal text-left hover:bg-smallBlue px-4 py-1 w-full rounded-md"
            >
              Mark as close
            </button>
            {data?.assignedUser.length > 0 && location?.pathname === "/" && (
              <button
                onClick={(e) => {
                  openActionModalHandler();
                  setJobStatus("completed");
                  setDropdownOpen(false);
                }}
                className="text-mediumViolet text-base font-normal text-left hover:bg-smallBlue px-4 py-1 w-full rounded-md"
              >
                Mark as completed
              </button>
            )}
            <button
              onClick={(e) => {
                openActionModalHandler();
                setJobStatus(data?.allowedProposals ? "Disable" : "Enable");
                setDropdownOpen(false);
              }}
              className="text-mediumViolet text-base font-normal text-left hover:bg-smallBlue px-4 py-1 w-full rounded-md"
            >
              {` ${data?.allowedProposals ? "Disable" : "Enable "} commenting`}
            </button>
          </>
        )}
        {data?.reviews?.creatorReview && (
          <button
            onClick={(e) => {
              setDropdownOpen(false);
              setReviewModal(true);
              setAddViewReviewData({
                title: "View submit review",
                name: profileData?.name,
                profileImageUri: profileData.profileImageUri,
                ...data?.reviews?.creatorReview,
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

      {/* delete modal */}
      <BoMyJobDeleteModal
        deleteModal={deleteModal}
        closeDeleteModalHandler={closeDeleteModalHandler}
        jobUpdateHandler={jobUpdateHandler}
        loading={loading}
      />

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

export default BoThreeDotsAction;
