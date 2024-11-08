import { Modal } from "antd";
import { Dispatch, SetStateAction } from "react";
import ButtonSpinner from "../button-spinner";

const AssignArchiveModal = ({
  isAssignArchiveModalOpen,
  setIsAssignArchiveModalOpen,
  activeUserName,
  assignedArchiveJobHandler,
  jobStatus,
  completeJowHandler,
  loading,
}: {
  isAssignArchiveModalOpen: boolean;
  setIsAssignArchiveModalOpen: Dispatch<SetStateAction<boolean>>;
  activeUserName?: string | undefined;
  assignedArchiveJobHandler?: () => void;
  completeJowHandler: () => void;
  jobStatus: string | undefined;
  loading: boolean;
}) => {
  const closeModalHandler = () => {
    document.body.style.overflow = "unset";
    setIsAssignArchiveModalOpen(false);
  };

  return (
    <Modal
      className="common-modal modal-bottom sm:!max-w-450"
      centered
      open={isAssignArchiveModalOpen}
      onOk={() => closeModalHandler()}
      onCancel={() => closeModalHandler()}
      width={450}
      zIndex={9999}
    >
      <div className="bg-primary flex flex-col justify-center items-center rounded-18">
        <div className="flex flex-col justify-center items-center border border-grey w-full h-291 sm:h-222 rounded-18 gap-8 p-2.5 text-center">
          <div className="w-full flex flex-col justify-center items-center">
            {jobStatus === "assign" && (
              <p className="text-xl sm:text-2xl leading-7 text-white max-w-xs font-semibold">
                {`Are you ready to assign the job to ${activeUserName}?`}
              </p>
            )}
            {jobStatus === "archive" && (
              <p className="text-xl sm:text-2xl leading-7 text-white font-semibold max-w-xs">
                {`Are you ready to archive  to ${activeUserName}?`}
              </p>
            )}
            {jobStatus === "complete" && (
              <p className="text-xl sm:text-2xl leading-7 text-white max-w-xs font-semibold">
                {`Are you ready to complete this job?`}
              </p>
            )}
          </div>
          <div className="flex w-full flex-row justify-center max-sm:flex-col max-sm:gap-3 gap-6 items-center">
            <button
              onClick={() => {
                closeModalHandler();
              }}
              className="w-smallMedium h-11 hover:bg-white hover:text-black border rounded-4xl text-white text-base font-bold"
              aria-label="Confirm assignment"
            >
              No
            </button>

            <button
              onClick={() => {
                if (jobStatus !== "complete") {
                  assignedArchiveJobHandler && assignedArchiveJobHandler();
                } else {
                  completeJowHandler();
                }
                // setIsAssignArchiveModalOpen(false);
              }}
              className="w-smallMedium h-11 border bg-white text-black hover:border hover:text-white hover:border-white hover:bg-transparent rounded-4xl font-bold text-base"
              aria-label="Cancel assignment"
            >
              <ButtonSpinner loading={loading} />
              {!loading && jobStatus === "assign" && "Yes Assign"}
              {!loading && jobStatus === "complete" && "Yes Complete"}
              {!loading && jobStatus === "archive" && "Yes Archive"}
            </button>
          </div>
          {/* <div className="absolute -right-9 max-lg:-right-8 max-md:-right-6 max-sm:-right-6 -top-8">
            <BlurDot />
          </div> */}
        </div>
      </div>
    </Modal>
  );
};

export default AssignArchiveModal;
