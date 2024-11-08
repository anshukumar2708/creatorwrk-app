import { Modal } from "antd";
import DeleteGradient from "../../assets/images/svg/delete-gradient";
import ButtonSpinner from "../common/button-spinner";

interface IProps {
  deleteModal: boolean;
  closeDeleteModalHandler: () => void;
  jobUpdateHandler: () => void;
  loading: boolean;
}

const BoMyJobDeleteModal = ({
  deleteModal,
  closeDeleteModalHandler,
  jobUpdateHandler,
  loading,
}: IProps) => {
  return (
    <>
      {" "}
      <Modal
        className="common-modal modal-bottom sm:!max-w-450"
        centered
        open={deleteModal}
        onOk={closeDeleteModalHandler}
        onCancel={closeDeleteModalHandler}
        zIndex={9999}
        width={450}
      >
        <div className="bg-primary flex flex-col justify-center items-center rounded-18">
          <div className="flex flex-col justify-center items-center border-darkSkyBlue sm:border-b-1 border-b-0 border w-full h-353 sm:h-337 rounded-18 gap-8 p-2.5 text-center">
            <DeleteGradient />
            <div className="w-full flex flex-col justify-center items-center">
              <h1 className="text-lightWhite text-xl sm:text-2xl font-semibold">
                Delete Job?
              </h1>
              <p className="text-base sm:text-lg font-normal text-grey max-w-xs">
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
    </>
  );
};

export default BoMyJobDeleteModal;
