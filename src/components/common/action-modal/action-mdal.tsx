import { Modal } from "antd";
import ButtonSpinner from "../button-spinner";

interface IProps {
  loading: boolean;
  jobStatus: string;
  isActionModalOpen: boolean;
  // setIsActionModalOpen: Dispatch<SetStateAction<boolean>>;
  jobUpdateHandler: () => void;
  closeActionModalHandler: () => void;
  message: string;
}

const ActionModal = ({
  loading,
  jobStatus,
  isActionModalOpen,
  closeActionModalHandler,
  jobUpdateHandler,
  message,
}: IProps) => {
  return (
    <Modal
      className="common-modal modal-bottom sm:!max-w-[450px]"
      centered
      open={isActionModalOpen}
      onOk={() => closeActionModalHandler()}
      onCancel={() => closeActionModalHandler()}
    >
      <div className="bg-primary flex flex-col justify-center items-center rounded-18">
        <div className="flex flex-col justify-center items-center border border-grey w-full h-291 sm:h-222 rounded-18 gap-8 p-2.5 text-center">
          <div className="w-full flex flex-col justify-center items-center">
            <p className="text-xl sm:text-2xl sm:leading-9 leading-7 text-white max-w-xs font-semibold">
              {message}
            </p>
          </div>
          <div className="flex w-full flex-row justify-center max-sm:flex-col max-sm:gap-3 gap-6 items-center">
            <button
              onClick={() => closeActionModalHandler()}
              className="w-smallMedium h-11 hover:bg-white hover:text-black border rounded-4xl text-white text-base font-bold"
              aria-label="Confirm assignment"
            >
              No
            </button>

            <button
              onClick={() => {
                jobUpdateHandler();
              }}
              className="w-smallMedium h-11 border bg-white text-black hover:border hover:text-white hover:border-white hover:bg-transparent rounded-4xl font-bold text-base flex items-center justify-center gap-2"
              aria-label="Cancel assignment"
            >
              {loading && <ButtonSpinner loading={loading} />}
              Yes {jobStatus}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ActionModal;
