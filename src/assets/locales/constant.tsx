import en from "./en";
// import homeIcon from "../../assets/images/bottom-bar/Home.svg";
// import messageIcon from "../../assets/images/bottom-bar/Message.svg";
// import createIcon from "../../assets/images/bottom-bar/CreateButton.svg";
// import myJobIcon from "../../assets/images/bottom-bar/myJob.svg";
// import profileIcon from "../../assets/images/bottom-bar/Profile.svg";
// import activeHomeIcon from "../../assets/images/bottom-bar/active-home.svg";
// import activeMessageIcon from "../../assets/images/bottom-bar/active-message.svg";
// import activeMyJobIcon from "../../assets/images/bottom-bar/active-my-job.svg";
// import activeProfileIcon from "../../assets/images/bottom-bar/active-profile.svg";
// import exploreIcon from "../../assets/images/svg/sidebar-explore.svg";
// import newMessageIcon from "../../assets/images/svg/sidebar-message.svg";
// import newMyJobIcon from "../../assets/images/svg/sidebar-my-job.svg";
// import NewProfileIcon from "../../assets/images/svg/sidebar-profile.svg";
// import changePasswordIcon from "../../assets/images/svg/sidebar-change-pswd.svg";
// import contactUsIcon from "../../assets/images/svg/sidebar-contact-us.svg";
// import newHomeIcon from "../../assets/images/svg/sidebar-home.svg";
import SidebarHomeIcon from "../images/svg/sidebar-home";
import SidebarMessage from "../images/svg/sidebar-message";
import SidebarMyJob from "../images/svg/sidebar-my-job";
import SidebarChangePassword from "../images/svg/sidebar-change-password";
import SidebarProfile from "../images/svg/sidebar-profile";
import HomeIcon from "../images/bottom-bar/home";
import ActiveHomeIcon from "../images/bottom-bar/active-home";
import ActiveMessageIcon from "../images/bottom-bar/active-message";
import ActiveMyJobIcon from "../images/bottom-bar/active-my-job";
import ActiveProfileIcon from "../images/bottom-bar/active-profile";
// import ActiveCreateIcon from "../images/bottom-bar/active-cre";
import ProfileIcon from "../images/bottom-bar/profile";
import CreateIcon from "../images/bottom-bar/create-icon";
import MyJob from "../images/bottom-bar/my-job";
import SidebarContactUs from "../images/svg/sidebar-contact-us";
import ChatIcon from "../images/svg/chat-icon";
import StepOneIcon from "../images/svg/step-one-icon";
import StepSecondIcon from "../images/svg/step-second-icon";
import StepThirdIcon from "../images/svg/step-third-icon";
import BoSliderStepOneIcon from "../images/svg/bo-slider-step-one-icon";
import BoSliderStepTwoIcon from "../images/svg/bo-slider-step-two-icon";

export const minInFluStar = 10;
export interface LocalizationKeys {
  login: string;
}

const LOCALIZATION_CONSTANT = {} as LocalizationKeys;

for (const key in en) {
  LOCALIZATION_CONSTANT[key as "login"] = key;
}
export default LOCALIZATION_CONSTANT;

export const landingPageUrl = process.env.REACT_APP_LANDING_PAGE_URL;

export const CHAT_BASE_URL = process.env.REACT_APP_CHAT_URL || "";

export const REACT_RECAPTCHA_KEY = `${process.env.REACT_APP_RECAPTCHA_KEY}`; //

export const ErrorMessage: any = {
  1001: "Internal server error",
  1002: "Unauthorized user",
  1003: "Your account has ban",
  1004: "Validation failed",
  1005: "Bad request",
  1006: "Already have registered",
  1007: "Token expire",
  1009: "Not found",
  1010: "Login required",
  1011: "Please enter valid password",
  1012: "Access denied ",
  1013: "Job not found",
  1014: "Job already assigned",
  1015: "Already commented",
  1016: "Not enough creator star",
  1017: "Phone number already taken",
  1019: "Invalid credentials",
  1021: "Invalid OTP",
};

export const emailRegex =
  /^(?=.{1,254}$)(?![_])^[a-z](?!.*[_.]{2})(?!.*[A-Z])[a-z0-9._%+-]+@(?!.*[_.-]{2})[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const passwordValidation = {
  pattern:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,16}$/,
  message:
    "Password must be 8-16 characters long and include at least one uppercase,lowercase letter,number, and special character.",
};

export const authPage = [
  "/login",
  "/sign-up",
  "/forgot-password",
  "/email-verification",
  "/change-password",
  "/reset-password",
  "/social-account",
  "/set-up-profile",
  "/post-job",
  "/successful",
];

export const myJobs = [
  {
    id: 1,
    title: "Video Creation",
    description:
      "I want to create a video for my newly open restaurant at satellite area. I am interested in girl influencer who can visit our restaurant",
    category: ["Music", "Entertainment"],
    time: "1 Hr",
    location: "Ahmedabad",
  },
  {
    id: 2,
    title: "Video Creation",
    description:
      "I want to create a video for my newly open restaurant at satellite area. I am interested in girl influencer who can visit our restaurant",
    category: ["Music", "Entertainment"],
    time: "1 Hr",
    location: "Ahmedabad",
  },
  {
    id: 3,
    title: "Video Creation",
    description:
      "I want to create a video for my newly open restaurant at satellite area. I am interested in girl influencer who can visit our restaurant",
    category: ["Music", "Entertainment"],
    time: "1 Hr",
    location: "Ahmedabad",
  },
  {
    id: 4,
    title: "Video Creation",
    description:
      "I want to create a video for my newly open restaurant at satellite area. I am interested in girl influencer who can visit our restaurant",
    category: ["Music", "Entertainment"],
    time: "1 Hr",
    location: "Ahmedabad",
  },
  {
    id: 5,
    title: "Video Creation",
    description:
      "I want to create a video for my newly open restaurant at satellite area. I am interested in girl influencer who can visit our restaurant",
    category: ["Music", "Entertainment"],
    time: "1 Hr",
    location: "Ahmedabad",
  },
  {
    id: 6,
    title: "Video Creation",
    description:
      "I want to create a video for my newly open restaurant at satellite area. I am interested in girl influencer who can visit our restaurant",
    category: ["Music", "Entertainment"],
    time: "1 Hr",
    location: "Ahmedabad",
  },
  {
    id: 7,
    title: "Video Creation",
    description:
      "I want to create a video for my newly open restaurant at satellite area. I am interested in girl influencer who can visit our restaurant",
    category: ["Music", "Entertainment"],
    time: "1 Hr",
    location: "Ahmedabad",
  },
];

export const bottomBar = [
  {
    key: 1,
    title: "Home",
    icon: <HomeIcon />,
    activeIcon: <ActiveHomeIcon />,
    alt: "home",
    path: "/",
  },
  {
    key: 2,
    title: "Messages",
    icon: <ChatIcon width={22} height={20} />,
    activeIcon: <ActiveMessageIcon />,
    alt: "message",
    path: "/message",
  },
  {
    key: 3,
    title: "Create Job",
    icon: <CreateIcon />,
    activeIcon: <CreateIcon />,
    alt: "create job",
    path: "/create-job",
  },
  {
    key: 4,
    title: "My Job",
    icon: <MyJob />,
    activeIcon: <ActiveMyJobIcon />,
    alt: "my job",
    path: "/my-job",
  },
  {
    key: 5,
    title: "Profile",
    icon: <ProfileIcon />,
    activeIcon: <ActiveProfileIcon />,
    alt: "profile",
    path: "/profile",
  },
];

export const sideBar = [
  {
    key: 1,
    title: "Home",
    icon: <SidebarHomeIcon />,
    alt: "home",
    path: "/",
  },
  // {
  //   key: 2,
  //   title: "Explore",
  //   icon: exploreIcon,
  //   alt: "home",
  //   path: "/",
  // },
  {
    key: 3,
    title: "Message",
    icon: <SidebarMessage />,
    alt: "message",
    path: "/message",
  },
  {
    key: 4,
    title: "My Job",
    icon: <SidebarMyJob />,
    alt: "home",
    path: "/my-job",
  },
  {
    key: 5,
    title: "Profile",
    icon: <SidebarProfile />,
    alt: "home",
    path: "/profile",
  },
  {
    key: 6,
    title: "Change password",
    icon: <SidebarChangePassword />,
    alt: "home",
    path: "/change-password",
  },
  {
    key: 7,
    title: "Contact Us",
    icon: <SidebarContactUs />,
    alt: "home",
    path: `${landingPageUrl}/contact-us`,
  },
];

export const creatorSliderContent = [
  {
    title: "How it Works",
    step: "1. Step",
    description: "Add comment in the job post in which you are interested.",
    slideImg: <StepOneIcon />,
  },
  {
    title: "How it Works",
    step: "2. Step",
    description:
      "Job post owner will initiate a chat with you once your comment is approved. You will also notified.",
    slideImg: <StepSecondIcon />,
  },
  {
    title: "How it Works",
    step: "3. Step",
    description: "Connect with business owner and get the job.",
    slideImg: <StepThirdIcon />,
  },
];

export const boSliderContent = [
  {
    title: "How it Works",
    step: "1. Step",
    description:
      "Set up your profile and connect with influencer to creating new jobs.",
    slideImg: <BoSliderStepOneIcon />,
  },
  {
    title: "How it Works",
    step: "2. Step",
    description: "Create your job which you want to complete by influencer.",
    slideImg: <BoSliderStepTwoIcon />,
  },
];
