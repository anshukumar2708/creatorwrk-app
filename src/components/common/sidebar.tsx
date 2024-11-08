import { Drawer, Progress } from "antd";
import { Link, useNavigate } from "react-router-dom";
import LogoutModal from "./logout-modal/logout-modal";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { State } from "../../interfaces/store";
import { profileProgressBar } from "../../utils/helper";
import verified_account from "../../assets/images/common/verified.png";
import ProfileNotCompletedModal from "./profile-not-completed-modal/profile-not-completed-modal";
import UnderVerification from "../brand-owner/under-verification";
import VerifiedProfile from "../../assets/images/svg/verified-profile";
import SideBarLogoutIcon from "../../assets/images/svg/sidebar-logout";
import { sideBar } from "../../assets/locales/constant";
import SidebarRightArrow from "../../assets/images/svg/sidebar-right-arrow";
import AvatarImage from "./avatar-image/avatar-image";
import HowItWorkModal from "./how-its-work-modal/how-its-work-modal";
import HowTtsWorkIcon from "../../assets/images/svg/how-its-work-icon";

interface ISidebarProps {
  sideBarToggle: boolean;
  setSideBarToggle: (d: boolean) => void;
}
const Sidebar = (props: ISidebarProps) => {
  const navigate = useNavigate();
  const { sideBarToggle, setSideBarToggle } = props;
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [logoutPopUp, setLogoutPopUp] = useState<boolean>(false);
  const [completeProfileModal, setCompleteProfileModal] = useState(false);
  const [verificationModal, setVerificationModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const profileData = useSelector((state: State) => state.profile?.profile);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sideBarClose = useCallback(() => {
    setSideBarToggle(false);
    document.body.style.overflow = "unset";
  }, [setSideBarToggle]);

  useEffect(() => {
    if (windowWidth > 768) {
      sideBarClose();
      setLogoutPopUp(false);
      setIsModalOpen(false);
      document.body.style.overflow = "unset";
    }
  }, [windowWidth, sideBarClose, sideBarToggle, setIsModalOpen]);

  useEffect(() => {
    const progress = profileProgressBar(profileData);
    setProgressPercent(progress);
  }, [profileData]);

  const pathRedirectHandler = (path: string) => {
    if (profileData.verificationStatus === "pending" && path === "/message") {
      setVerificationModal(true);
    } else if (
      profileData.verificationStatus === "rejected" &&
      path === "/message"
    ) {
      setCompleteProfileModal(true);
    } else if (path === "https://dev.creatorwrk.com/contact-us") {
      window.open(path, "_self");
    } else {
      navigate(path);
      sideBarClose();
    }
  };

  return (
    <>
      <div className="bg-smBlue">
        <Drawer
          title={`Menu`}
          placement="bottom"
          onClose={() => {
            sideBarClose();
          }}
          open={sideBarToggle}
        >
          <div className="bg-largeBlack sideBarHeight">
            <div className="flex justify-start items-center h-20 gap-3 p-4 bg-smallBlack mx-5 rounded-xl">
              <div className="w-half rounded-[50%] cursor-pointer">
                <div className="lg:hidden">
                  <div className="w-half flex justify-center items-center gap-3 cursor-pointer">
                    <Link
                      to="profile"
                      onClick={() => {
                        sideBarClose();
                      }}
                    >
                      {progressPercent === 100 ? (
                        <AvatarImage
                          imageUrl={profileData.profileImageUri}
                          size={55}
                          name={profileData.name}
                        />
                      ) : (
                        <Progress
                          type="circle"
                          percent={progressPercent}
                          size={60}
                          strokeWidth={5}
                          strokeColor="#50EA38"
                          trailColor="rgba(217, 217, 217, 0.5)"
                          format={() => (
                            <AvatarImage
                              imageUrl={profileData.profileImageUri}
                              size={45}
                              name={profileData.name}
                            />
                          )}
                        />
                      )}
                    </Link>
                  </div>
                </div>
              </div>
              <h2 className="text-lg font-medium leading-5 !text-white ">
                {profileData.name}
              </h2>
              {profileData.status === "active" ? (
                <img
                  loading="lazy"
                  className=" "
                  src={verified_account}
                  alt="verifiedProfile"
                />
              ) : (
                <VerifiedProfile width={14} height={14} />
              )}
            </div>
            <div className="bg-largeBlack px-5 pt-3 ">
              {sideBar.map((item: any, index) => {
                return (
                  <div
                    key={index}
                    className="flex justify-between items-center py-1.5 cursor-pointer"
                    onClick={() => pathRedirectHandler(item?.path)}
                  >
                    <div className="flex gap-4 items-center justify-center">
                      <div className="w-10 h-10 bg-smallBlack flex items-center justify-center rounded-xl">
                        {item?.icon}
                      </div>
                      <p className="text-lg font-medium text-mediumViolet hover:text-[#58D7FF]">
                        {item.title}
                      </p>
                    </div>
                    <SidebarRightArrow />
                  </div>
                );
              })}
              <li className="flex justify-between items-start py-1.5 w-full">
                <div
                  className="flex gap-4  justify-start items-center w-full cursor-pointer"
                  onClick={() => {
                    setIsModalOpen(true);
                    sideBarClose();
                    document.body.style.overflow = "hidden";
                  }}
                >
                  <div className="w-10 h-10 bg-smallBlack flex items-center justify-center rounded-xl">
                    <HowTtsWorkIcon />
                  </div>
                  <p className="text-lg font-medium  text-mediumViolet hover:text-[#58D7FF] ">
                    How it works
                  </p>
                </div>
              </li>
              <li className="flex justify-between items-start py-1.5 w-full">
                <div
                  className="flex gap-4  justify-start items-center w-full cursor-pointer"
                  onClick={() => {
                    setLogoutPopUp(true);
                    sideBarClose();

                    document.body.style.overflow = "hidden";
                  }}
                >
                  <div className="w-10 h-10 bg-smallBlack flex items-center justify-center rounded-xl">
                    <SideBarLogoutIcon />
                  </div>
                  <p className="text-lg font-medium  text-mediumViolet hover:text-[#58D7FF] ">
                    Logout
                  </p>
                </div>
              </li>
            </div>
          </div>
        </Drawer>

        <ProfileNotCompletedModal
          completeProfileModal={completeProfileModal}
          setCompleteProfileModal={setCompleteProfileModal}
        />
        <UnderVerification
          verificationModal={verificationModal}
          setVerificationModal={setVerificationModal}
        />
      </div>

      {logoutPopUp && (
        <LogoutModal
          logoutPopUp={logoutPopUp}
          setLogoutPopUp={setLogoutPopUp}
        />
      )}
      {isModalOpen && (
        <HowItWorkModal
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
        />
      )}
    </>
  );
};
export default Sidebar;
