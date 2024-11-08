import { Modal } from "antd";
import { Dispatch, SetStateAction } from "react";
import WarningAction from "../../assets/images/svg/warning-action";

const UnderVerification = ({
  verificationModal,
  setVerificationModal,
}: {
  verificationModal: boolean;
  setVerificationModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleCancel = () => {
    setVerificationModal(false);
    document.body.style.overflow = "unset";
  };

  return (
    <>
      <Modal
        centered
        className="common-modal modal-bottom sm:!max-w-450"
        open={verificationModal}
        onOk={handleCancel}
        closable={false}
        onCancel={handleCancel}
        width={450}
      >
        <div className="bg-primary flex flex-col justify-center items-center rounded-18">
          <div className="flex flex-col justify-center items-center border border-grey w-full h-293 sm:h-308 rounded-18 space-y-1.5 p-2.5 text-center">
            <div>
              <WarningAction />
            </div>
            <h1 className="text-lightWhite sm:text-2xl text-xl font-semibold">
              Can’t Perform Action
            </h1>

            <p className="text-base sm:text-lg font-normal text-blue max-w-xs">
              You can perform any actions once the Profile verification process
              is complete.
            </p>

            <button
              onClick={handleCancel}
              className="w-44 h-11 !mt-8 border border-primary rounded-4xl rounded-1 hover:bg-white hover:text-black font-semibold text-white text-base"
            >
              Go Back
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default UnderVerification;
