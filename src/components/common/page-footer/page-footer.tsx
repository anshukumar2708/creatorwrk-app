import { Link } from "react-router-dom";
import Logo from "../../../assets/images/svg/logo";
import SocialIcon from "../social-icons/social-icon";

const PageFooter = () => {
  const landingPageUrl = process.env.REACT_APP_LANDING_PAGE_URL;
  return (
    <>
      {" "}
      <div className=" flex flex-col justify-center items-center gap-3">
        <div className="flex justify-center item-center gap-2">
          <div className="flex justify-center items-center">
            <Logo width={20} height={20} />
          </div>
          <p className=" text-white font-semibold text-sm text-center">
            {" "}
            Creatorwrk{" "}
          </p>
        </div>
        <p className="text-sm font-normal text-blue flex justify-center items-center gap-3 ">
          <Link
            target="_blank"
            to={`${landingPageUrl}/about-us`}
            className=" hover:text-white"
          >
            About
          </Link>
          <Link
            target="_blank"
            to={`${landingPageUrl}/contact-us`}
            className=" hover:text-white"
          >
            Contact
          </Link>
          <Link
            target="_blank"
            to={`${landingPageUrl}/terms`}
            className=" hover:text-white"
          >
            Terms
          </Link>
          <Link
            target="_blank"
            to={`${landingPageUrl}/privacy`}
            className=" hover:text-white"
          >
            Privacy
          </Link>
        </p>
        <p className="font-normal text-blue flex  justify-center items-center gap-1 py-0 my-0 -mt-1">
          <span className="text-lg py-0 my-0"> ©</span>
          <span className="text-sm py-0 my-0">
            {" "}
            Copyright 2024, All Rights Reserved
          </span>
        </p>
        <SocialIcon />
      </div>
    </>
  );
};

export default PageFooter;
