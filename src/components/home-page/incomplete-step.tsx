import Slider from "react-slick";
import FeedHexaTop from "../../assets/images/svg/feed-hexa-top";
import FeedHexaCenter from "../../assets/images/svg/feed-hexa-center";
import FeedHexaBottom from "../../assets/images/svg/feed-hexa-bottom";
// import stepIcon from "../../../src/assets/images/svg/step-icon.svg";
import { useSelector } from "react-redux";
import { State } from "../../interfaces/store";
import StepIcon from "../../assets/images/svg/step-icon";

const IncompleteStep = () => {
  const profileData = useSelector((state: State) => state.profile?.profile);
  var settings = {
    dots: true,
    autoplay: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <Slider
        {...settings}
        className="slider-container px-0 max-md:hidden p-3 max-lg:p-4 mt-5"
      >
        <div className="slide-item px-0">
          <div className="slide-content h-56 p-7 max-lg:h-eSmall">
            <div className="text-content">
              <span>
                {/* <img src={stepIcon} alt="stepIcon" /> */}
                <StepIcon />
              </span>
              <h3 className="title text-lg max-lg:text-sm font-semibold leading-5 text-mediumViolet">
                HOW IT WORKS
              </h3>
              <h1 className="step-number font-semibold max-lg:text-lg text-3xl leading-9 text-mediumViolet">
                1. Step
              </h1>
              <h3 className="text-mediumBlue max-lg:text-base text-2xl font-normal">
                {profileData?.userType === "creator"
                  ? "Add comment in the job post in which you are interested"
                  : "Set up your profile and connect with influencer to creating new jobs"}
                .
              </h3>
            </div>
            <div className="flex flex-col items-end">
              <div className="opacity-20">
                <FeedHexaTop />
              </div>
              <div className="opacity-20">
                <FeedHexaCenter />
              </div>
              <div className="transform translate-x-[-50px] opacity-20 max-lg:translate-x-[-30px] -translate-y-3.5">
                <FeedHexaBottom />
              </div>
            </div>
          </div>
        </div>
        <div className="slide-item px-0">
          <div className="slide-content h-56 p-7 max-lg:h-eSmall">
            <div className="text-content">
              <span>
                {/* <img src={stepIcon} alt="stepIcon" /> */}
                <StepIcon />
              </span>
              <h1 className="step-number font-semibold max-lg:text-lg text-3xl leading-9 text-mediumViolet">
                2. Step
              </h1>
              <h3 className="text-mediumBlue max-lg:text-base text-2xl font-normal">
                {profileData?.userType === "creator"
                  ? "Job post owner will initiate a chat with you once your comment is approved. You will also notified"
                  : "Create your job which you want to complete by influencer."}
              </h3>
            </div>
            <div className="flex flex-col items-end">
              <div className="opacity-20">
                <FeedHexaTop />
              </div>
              <div className="opacity-20">
                <FeedHexaCenter />
              </div>
              <div className="transform translate-x-[-50px] opacity-20 max-lg:translate-x-[-30px] -translate-y-3.5">
                <FeedHexaBottom />
              </div>
            </div>
          </div>
        </div>
        {profileData?.userType === "creator" && (
          <div className="slide-item px-0">
            <div className="slide-content h-56 p-7 max-lg:h-eSmall">
              <div className="text-content">
                <span>
                  {/* <img src={stepIcon} alt="stepIcon" /> */}
                  <StepIcon />
                </span>

                <h1 className="step-number font-semibold max-lg:text-lg text-3xl leading-9 text-mediumViolet">
                  3. Step
                </h1>
                <h3 className="text-mediumBlue max-lg:text-base text-2xl font-normal">
                  Connect with business owner and get the job.
                </h3>
              </div>
              <div className="flex flex-col items-end">
                <div className="opacity-20">
                  <FeedHexaTop />
                </div>
                <div className="opacity-20">
                  <FeedHexaCenter />
                </div>
                <div className="transform translate-x-[-50px] opacity-20 max-lg:translate-x-[-30px] -translate-y-3.5">
                  <FeedHexaBottom />
                </div>
              </div>
            </div>
          </div>
        )}
      </Slider>
    </>
  );
};
export default IncompleteStep;
