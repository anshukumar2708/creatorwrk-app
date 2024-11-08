import { Modal } from "antd";
import {
  boSliderContent,
  creatorSliderContent,
} from "../../../assets/locales/constant";
import StepsBottomIcon from "../../../assets/images/svg/steps-bottom-icon";
import Slider from "react-slick";
import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { State } from "../../../interfaces/store";

interface ISliderContent {
  title: string;
  step: string;
  description: string;
  slideImg: ReactNode;
}

const HowItWorkModal = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: any;
}) => {
  const profileData = useSelector((state: State) => state.profile?.profile);
  const [activeSliderData, setActiveSliderData] = useState<
    ISliderContent[] | null
  >(null);
  const closeModalHandler = () => {
    document.body.style.overflow = "unset";
    setIsModalOpen(false);
  };

  const settings = {
    dots: true,
    arrows: false,
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    if (profileData?.userType === "creator") {
      setActiveSliderData(creatorSliderContent);
    } else {
      setActiveSliderData(boSliderContent);
    }
  }, [profileData]);

  return (
    <Modal
      className="common-modal modal-bottom"
      centered
      open={isModalOpen}
      onOk={() => closeModalHandler()}
      onCancel={() => closeModalHandler()}
      zIndex={1000}
      width={400}
    >
      <div className="bg-[#5242b6] flex flex-col justify-center items-center rounded-[18px]">
        <div className="w-[320px] how-work-slider-modal">
          <Slider {...settings} className="slider-container">
            {activeSliderData?.map((item: ISliderContent, index: number) => {
              return (
                <div
                  className="slide-content relative pt-5 max-minSize:px-3"
                  key={index}
                >
                  <div className="text-content">
                    <h3 className="text-base font-semibold text-mediumViolet">
                      {item?.title}
                    </h3>
                    <h1 className="font-semibold text-2xl  text-mediumViolet">
                      {item?.step}
                    </h1>
                    <p className="text-lg text-mediumBlue font-normal leading-7 text-left">
                      {item?.description}
                    </p>
                  </div>
                  <div className="absolute top-6 minSize:right-5 right-10 bg-slider-icon-bg rounded-full">
                    {item?.slideImg}
                  </div>
                  <div className="absolute bottom-0 right-3">
                    <StepsBottomIcon />
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </Modal>
  );
};
export default HowItWorkModal;
