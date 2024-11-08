import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { MenuProps } from "antd";
import { Dropdown, Progress } from "antd";
import { FC, useEffect, useState } from "react";
import Sidebar from "../components/common/sidebar";
import { profileProgressBar } from "../utils/helper";
import LogoutModal from "../components/common/logout-modal/logout-modal";
import ProfileNotCompletedModal from "../components/common/profile-not-completed-modal/profile-not-completed-modal";
import UnderVerification from "../components/brand-owner/under-verification";
import MyJobIcon from "../assets/images/svg/my-job-icon";
import CoinIcon from "../assets/images/svg/coin";
import PlusIcon from "../assets/images/svg/plus-button";
import LogoutIcon from "../assets/images/svg/logout-icon";
import ProfileIcon from "../assets/images/svg/profile-icon";
import ChangePassword from "../assets/images/svg/change-password";
import ToggleIcon from "../assets/images/svg/toggle";
import ChatIcon from "../assets/images/svg/chat-icon";
import AvatarImage from "../components/common/avatar-image/avatar-image";
import { landingPageUrl } from "../assets/locales/constant";
// import VerifiedProfile from "../assets/images/svg/verified-profile";
// import VerifiedGreen from "../assets/images/svg/verified-green";
import { State } from "../interfaces/store";
import Logo from "../assets/images/svg/logo";
import useScrollPosition from "../hooks/use-scroll-position";

export const Header: FC = () => {
  const [sideBarToggle, setSideBarToggle] = useState(false);
  const [completeProfileModal, setCompleteProfileModal] = useState(false);
  const [verificationModal, setVerificationModal] = useState(false);
  const [profileProgress, setProfileProgress] = useState<number>(0);
  const [logoutPopUp, setLogoutPopUp] = useState<boolean>(false);
  const auth = useSelector((state: State) => state?.auth);
  const profile = useSelector((state: any) => state?.profile);
  const navigate = useNavigate();
  const location = useLocation();
  const scrollPosition = useScrollPosition();

  useEffect(() => {
    if (
      profile?.profile?.verificationStatus === "rejected" &&
      location?.pathname !== "/set-up-profile"
    ) {
      setCompleteProfileModal(true);
    }
  }, [profile, location]);

  useEffect(() => {
    const progress = profileProgressBar(profile?.profile);
    setProfileProgress(progress);
  }, [profile]);

  const sideBarHandler = () => {
    document.body.style.overflow = "hidden";
    setSideBarToggle(!sideBarToggle);
  };

  const messageRedirectHandler = () => {
    if (profile?.profile?.status === "active") {
      !location?.pathname?.startsWith("/message") && navigate("/message");
    } else if (profile?.profile?.verificationStatus === "pending") {
      document.body.style.overflow = "hidden";
      setVerificationModal(true);
    } else if (profile?.profile?.verificationStatus === "rejected") {
      setCompleteProfileModal(true);
      document.body.style.overflow = "hidden";
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "4",
      label: (
        <button
          onClick={() => setLogoutPopUp(true)}
          className="text-base flex flex-row justify-start items-center gap-4 ml-1 hover:bg-smallBlue w-full px-3 py-2 rounded-lg"
        >
          <span>
            <LogoutIcon />
          </span>
          <span className="text-mediumViolet">Logout</span>
        </button>
      ),
    },
  ];

  if (profile?.profile?.emailVerifiedAt) {
    items.splice(
      0,
      0,
      {
        key: "1",
        label: (
          <Link
            to="/profile"
            className="text-base flex flex-row justify-start items-center gap-4 hover:bg-smallBlue w-full px-3 py-2 rounded-lg"
          >
            <span>
              <ProfileIcon />
            </span>
            <span className="text-mediumViolet text-base">Profile</span>
          </Link>
        ),
      },
      {
        key: "3",
        label: (
          <Link
            to="/change-password"
            className="text-base flex flex-row justify-start items-center gap-4 hover:bg-smallBlue w-full px-3 py-2 rounded-lg"
          >
            <span>
              <ChangePassword />
            </span>
            <span className="text-mediumViolet">Change password</span>
          </Link>
        ),
      }
    );
  }

  return (
    <>
      <div
        className={`flex flex-row justify-center items-center fixed top-0 w-full z-99  ${
          scrollPosition > 0 && auth.login ? "scrolled" : ""
        }`}
      >
        <div className="header-content w-full">
          <div className="container mx-auto w-full">
            <nav className="h-md grid w-full">
              <div className="flex items-center justify-between w-full">
                <Link
                  to={
                    location?.pathname === "/login" ||
                    location?.pathname === "/sign-up" ||
                    location?.pathname === "/forgot-password"
                      ? `${landingPageUrl}`
                      : profile?.profile?.emailVerifiedAt && "/"
                  }
                >
                  <div className="flex items-center gap-4 justify-center">
                    <Logo />
                    <p className="text-white font-semibold text-26 max-md:text-xl max-md:font-bold">
                      Creatorwrk
                    </p>
                  </div>
                </Link>
                {auth?.login && profile?.profile?.name && (
                  <div className="flex justify-between items-center gap-3 max-md:gap-0">
                    {profile?.profile?.emailVerifiedAt && (
                      <div className="flex flex-row justify-center items-center gap-3">
                        <button
                          onClick={messageRedirectHandler}
                          className="max-md:hidden mr-4 hover:bg-[#6174FF] p-1.5 hover:rounded-2xl"
                        >
                          <ChatIcon />
                        </button>
                        {/* {profile?.profile?.userType === "creator" && ( */}
                        <Link
                          to="/my-job"
                          className="max-md:hidden mr-4 hover:job-icon"
                        >
                          <MyJobIcon />
                        </Link>
                        {/* )} */}
                      </div>
                    )}
                    {profile?.profile?.userType === "creator" &&
                      profile?.profile?.emailVerifiedAt && (
                        <Link
                          to={`${landingPageUrl}/contact-us`}
                          target="_blank"
                        >
                          <div className="p-0.5 mr-4 max-md:mr-3 relative hover:scale-110 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-4xl max-xs:hidden">
                            <button className="coin__button">
                              <CoinIcon />
                              {profile?.profile?.creator?.creatorStar ?? 0}
                              <PlusIcon />
                            </button>
                          </div>
                        </Link>
                      )}
                    <Dropdown
                      overlayClassName="header-dropdown-menu"
                      menu={{ items }}
                      placement="bottom"
                    >
                      <div className="max-md:hidden">
                        <div className="w-half flex justify-center items-center gap-3 cursor-pointer">
                          {profileProgress === 100 ? (
                            <AvatarImage
                              imageUrl={profile?.profile?.profileImageUri}
                              size={50}
                              name={profile?.profile?.name}
                            />
                          ) : (
                            <Progress
                              type="circle"
                              percent={profileProgress}
                              size={60}
                              strokeWidth={5}
                              strokeColor="#50EA38"
                              trailColor="rgba(217, 217, 217, 0.5)"
                              format={() => (
                                <AvatarImage
                                  imageUrl={profile?.profile?.profileImageUri}
                                  size={45}
                                  name={profile?.profile?.name}
                                />
                              )}
                            />
                          )}
                          <h2 className="text-lg font-medium leading-5 text-white max-lg:hidden capitalize">
                            {profile?.profile?.name?.slice(0, 20)}{" "}
                            {profile?.profile?.name?.length > 20 && "..."}
                          </h2>
                          <h2 className="text-lg font-medium leading-5 text-white  lg:hidden max-md:hidden capitalize">
                            {profile?.profile?.name?.slice(0, 15)}{" "}
                            {profile?.profile?.name?.length > 15 && "..."}
                          </h2>
                        </div>
                      </div>
                    </Dropdown>
                    <LogoutModal
                      logoutPopUp={logoutPopUp}
                      setLogoutPopUp={setLogoutPopUp}
                    />

                    {/* <div className="hidden md:block">
                      {profile?.profile?.status === "active" ? (
                        <VerifiedGreen width={14} height={14} />
                      ) : (
                        <VerifiedProfile width={14} height={14} />
                      )}
                    </div> */}
                    <div onClick={sideBarHandler} className="md:hidden">
                      <ToggleIcon />
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>

      <Sidebar
        sideBarToggle={sideBarToggle}
        setSideBarToggle={setSideBarToggle}
      />

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
