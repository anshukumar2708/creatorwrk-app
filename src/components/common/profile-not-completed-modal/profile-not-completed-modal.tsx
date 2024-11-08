import { Modal } from "antd";
import InfoCircle from "../../../assets/images/svg/infoCircle";
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { State } from "../../../interfaces/store";

const ProfileNotCompletedModal = ({
  completeProfileModal,
  setCompleteProfileModal,
}: {
  completeProfileModal: boolean;
  setCompleteProfileModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const profileData = useSelector((state: State) => state?.profile?.profile);

  const closeCompleteModal = () => {
    setCompleteProfileModal(false);
    document.body.style.overflow = "unset";
  };

  const redirectSetupProfile = () => {
    navigate("/set-up-profile");
    closeCompleteModal();
  };
  return (
    <>
      <Modal
        centered
        className="verification-modal common-modal"
        open={completeProfileModal}
        onOk={closeCompleteModal}
        onCancel={closeCompleteModal}
      >
        <div className="bg-primary flex flex-col justify-center items-center lg:w-96 w-full">
          <div className="flex flex-col justify-center items-center border border-grey lg:w-96 w-full rounded-lg space-y-1.5 p-2.5 text-center">
            <div className="mt-8">
              <InfoCircle />
            </div>
            <h1 className="text-lightWhite text-lg font-semibold">
              Your Profile has been Rejected
            </h1>

            <p className="text-base font-normal text-lightWhite max-w-xs">
              {profileData?.rejectionReason}
            </p>

            <button
              onClick={redirectSetupProfile}
              className="w-44 h-11 !my-8 border border-primary rounded-4xl rounded-1 hover:bg-white hover:text-black font-semibold text-white text-base"
            >
              Setup Profile
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ProfileNotCompletedModal;
