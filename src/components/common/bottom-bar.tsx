import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import activeIcon from "../../assets/images/bottom-bar/active.svg";
// import ActiveIcon from "../../assets/images/bottom-bar/active";
import { IBottomBar } from "../../interfaces/common";
import { useSelector } from "react-redux";
import { State } from "../../interfaces/store";
import ProfileNotCompletedModal from "./profile-not-completed-modal/profile-not-completed-modal";
import UnderVerification from "../brand-owner/under-verification";
import { bottomBar } from "../../assets/locales/constant";

const BottomBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [completeProfileModal, setCompleteProfileModal] = useState(false);
  const [verificationModal, setVerificationModal] = useState(false);
  const profile = useSelector((state: State) => state?.profile?.profile);

  const pathRedirectHandler = (path: string) => {
    if (profile?.status === "active") {
      navigate(path);
    } else if (
      profile.verificationStatus === "pending" &&
      path === "/message"
    ) {
      setVerificationModal(true);
      document.body.style.overflow = "hidden";
    } else if (
      profile.verificationStatus === "rejected" &&
      path === "/message"
    ) {
      setCompleteProfileModal(true);
      document.body.style.overflow = "hidden";
    } else {
      navigate(path);
      window.scrollTo(0, 0);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div
        className={`w-full flex flex-col justify-center items-end  bg-footerBar h-bottomBar`}
      >
        <ul className="flex flex-row justify-between items-center w-full container pt-0">
          {bottomBar
            .filter((filteredItem: IBottomBar) =>
              profile?.userType === "creator"
                ? filteredItem.title.replace(/ +/g, "").toLocaleLowerCase() !==
                  "createjob"
                : true
            )
            .map((item: IBottomBar, index: number) => {
              return (
                <li
                  key={index}
                  className="flex flex-col justify-end items-center h-full"
                >
                  <button
                    onClick={() => pathRedirectHandler(item?.path)}
                    className="flex flex-col justify-end items-center"
                  >
                    {location?.pathname === item?.path && (
                      // <img src={activeIcon} alt="/" className="w-5 pt-1" />
                      <div className="w-6">
                        {/* <ActiveIcon /> */}
                        <div className="flex justify-center items-center">
                          <div className="active-top-gradient"></div>
                        </div>
                      </div>
                    )}
                    <div className="flex flex-col justify-center items-center">
                      {/* <img
                        src={
                          location?.pathname === item?.path
                            ? item?.activeIcon
                            : item?.icon
                        }
                        alt="icon"
                      /> */}
                      {location?.pathname === item?.path
                        ? item?.activeIcon
                        : item?.icon}
                      <h1 className="text-mediumViolet text-xxs">
                        {item?.title}
                      </h1>
                    </div>
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
      <ProfileNotCompletedModal
        completeProfileModal={completeProfileModal}
        setCompleteProfileModal={setCompleteProfileModal}
      />
      <UnderVerification
        verificationModal={verificationModal}
        setVerificationModal={setVerificationModal}
      />
    </>
  );
};

export default BottomBar;
