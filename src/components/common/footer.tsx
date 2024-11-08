import { Link } from "react-router-dom";
import logo from "../../../src/assets/images/common/logo.png";
import SocialIcon from "./social-icons/social-icon";

const Footer = () => {
  const landingPageUrl =
    process.env.REACT_APP_LANDING_PAGE_URL || "https://dev.creatorwrk.com";

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 w-full pb-5">
      <div className="gap-6 flex lg:items-center flex-col w-full max-lg:flex-col max-md:px-1rem border-t-1 border-secondary pt-8">
        <div
          onClick={scrollToTop}
          className="flex flex-col items-center  max-lg:items-start gap-2 cursor-pointer"
        >
          <img loading="lazy" src={logo} alt="logo" />
          <p className="text-white font-semibold text-lg">Creatorwrk</p>
        </div>
        <ul className="flex gap-4 lg:gap-12 max-md:gap-5 lg:items-end max-lg:flex-col">
          <li className="text-lg font-normal text-blue">
            <Link
              to={`${landingPageUrl}/about-us`}
              className="hover:text-white"
              rel="noopener noreferrer"
              target="_blank"
            >
              About us
            </Link>
          </li>
          <li className="text-lg font-normal text-blue">
            <Link
              to={`${landingPageUrl}/contact-us`}
              className="hover:text-white"
              rel="noopener noreferrer"
              target="_blank"
            >
              Contact us
            </Link>
          </li>
          <li className="text-lg font-normal text-blue">
            <Link
              to={`${landingPageUrl}/privacy`}
              className="hover:text-white"
              rel="noopener noreferrer"
              target="_blank"
            >
              Privacy Policy
            </Link>
          </li>
          <li className="text-lg font-normal text-blue">
            <Link
              to={`${landingPageUrl}/terms`}
              className="hover:text-white"
              rel="noopener noreferrer"
              target="_blank"
            >
              Terms and conditions
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex justify-between w-full max-lg:gap-6 max-md:px-1rem max-lg:flex-col max-lg:w-full">
        <div className="flex lg:items-end w-full justify-between lg:justify-end gap-56">
          <p className="text-sm font-normal leading-6 text-blue">
            © Copyright 2024, All Rights Reserved
          </p>
          <SocialIcon />
        </div>
      </div>
    </div>
  );
};

export default Footer;
