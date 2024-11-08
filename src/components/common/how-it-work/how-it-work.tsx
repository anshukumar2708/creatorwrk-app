import Slider from "react-slick";
import StepsBottomIcon from "../../../assets/images/svg/steps-bottom-icon";
import { ReactNode } from "react";

interface ISliderContent {
  title: string;
  step: string;
  description: string;
  slideImg: ReactNode;
}

const HowItWork = ({ sliderContent }: { sliderContent: ISliderContent[] }) => {
  const settings = {
    dots: true,
    arrows: false,
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerPadding: "50px",
  };

  return (
    <>
      <div className="w-300 how-work-slider">
        <Slider {...settings} className="slider-container">
          {sliderContent?.map((item: ISliderContent, index: number) => {
            return (
              <div className="slide-content relative" key={index}>
                <div className="text-content">
                  <h3 className="text-base font-semibold text-mediumViolet">
                    {item?.title}
                  </h3>
                  <h1 className="font-semibold text-2xl  text-mediumViolet">
                    {item?.step}
                  </h1>
                  <p className="text-lg text-mediumBlue font-normal leading-7">
                    {item?.description}
                  </p>
                </div>
                <div className="absolute top-5 right-4">{item?.slideImg}</div>
                <div className="absolute bottom-0 right-3">
                  <StepsBottomIcon />
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
};

export default HowItWork;
