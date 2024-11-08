import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { State } from "../../interfaces/store";
import OpenArrow from "../../assets/images/svg/open-arrow";

const Incomplete = () => {
  const [isOpen, setIsOpen] = useState(false);
  const profileData = useSelector((state: State) => state.profile?.profile);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex bg-darkBlue p-8 max-lg:p-4 rounded-sm justify-between items-center max-lg:flex-col">
      <div className="w-full">
        <div className="flex flex-col gap-1">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={toggleAccordion}
          >
            <h3 className="text-base font-medium max-md:text-sm leading-4 text-mediumBlue">
              WELCOME TO CREATORWRK
            </h3>

            <div
              className={`lg:hidden transform transition-transform ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            >
              <OpenArrow />
            </div>
          </div>
          <div className="flex gap-3 items-center max-md:items-baseline">
            <h1 className="text-mediumViolet text-medium font-semibold max-md:text-lg">
              It looks like your profile is incomplete.
            </h1>
            <button className="border-darkYellow border text-darkYellow rounded-xl w-4 h-4 flex justify-center items-center p-2.5">
              i
            </button>
          </div>
          <h3 className="max-lg:hidden text-base font-normal leading-6 text-mediumBlue">
            Complete your profile helps you to tailor your experience and
            connect you with{" "}
            {profileData?.userType === "creator"
              ? "business Owner"
              : "influencer"}
            .
          </h3>
        </div>
        {isOpen && (
          <div className="space-y-3 max-md:flex max-md:flex-col">
            <h3 className="lg:hidden text-base max-md:text-sm font-normal leading-6 text-mediumBlue mt-1">
              Completing your profile helps tailor your experience and connect
              you with{" "}
              {profileData?.userType === "creator"
                ? "business Owner"
                : "influencer"}
              .
            </h3>
            <Link to="/set-up-profile" className="lg:hidden incomplete__button">
              Complete Now
            </Link>
          </div>
        )}
      </div>
      <Link to="/set-up-profile" className="max-lg:hidden incomplete__button">
        Complete Now
      </Link>
    </div>
  );
};
export default Incomplete;
