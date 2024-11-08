import { Modal } from "antd";
import { useDispatch } from "react-redux";
import { createAction, logOut } from "../../../utils/common";
import * as actionTypes from "../../../store-items/action-types";
import { ILogoutModal } from "../../../interfaces/auth";
import LogoutGradient from "../../../assets/images/svg/logout-gradient";

const LogoutModal = ({ logoutPopUp, setLogoutPopUp }: ILogoutModal) => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(createAction(actionTypes.LOGOUT));
    logOut();
    setLogoutPopUp(false);
    document.body.style.overflow = "unset";
  };

  const logOutModalClose = () => {
    document.body.style.overflow = "unset";
    setLogoutPopUp(false);
  };

  return (
    <Modal
      className="common-modal modal-bottom sm:!max-w-[450px]"
      centered
      open={logoutPopUp}
      onOk={() => logOutModalClose()}
      onCancel={() => logOutModalClose()}
      zIndex={1000}
      width={450}
    >
      <div className="bg-primary flex flex-col justify-center items-center rounded-[18px]">
        <div className="flex flex-col justify-center items-center w-full h-[330px] sm:h-[337px] rounded-[18px] border border-grey gap-8 p-2.5 text-center ">
          <LogoutGradient />
          <div className="w-full flex flex-col justify-center items-center">
            <h1 className="text-lightWhite text-[20px] sm:text-[24px] font-semibold">
              Logout?
            </h1>
            <p className="text-[16px] sm:text-[18px] font-normal mt-3 text-grey">
              Are you sure you want to logout account?
            </p>
          </div>
          <button
            onClick={logoutHandler}
            className="w-xs h-11 bg-white hover:shadow-custom-white text-black border-1 rounded-4xl rounded-1 font-semibold text-base"
          >
            LOGOUT
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default LogoutModal;
