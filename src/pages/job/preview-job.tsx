import React, { Dispatch, SetStateAction } from "react";
import { List, Skeleton } from "antd";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import skeleton from "../../../src/assets/images/common/skeleton.png";
import type Icon from "@ant-design/icons";
import { useSelector } from "react-redux";
import { State } from "../../interfaces/store";
import { TimeAgo } from "../../utils/date";
import { ICreateJobValues } from "../../interfaces/myJob";
import Footer from "../../components/common/footer";
import ButtonSpinner from "../../components/common/button-spinner";
import VerifiedProfile from "../../assets/images/svg/verified-profile";
import BlurDot from "../../assets/images/svg/blur-dot";
import RightArrowFeed from "../../assets/images/svg/right-arrow-feed";
// import RightArrow from "../../assets/images/svg/right-arrow";
import Clock from "../../assets/images/svg/clock";
import LeftArrow from "../../assets/images/svg/left-arrow";
import Location from "../../assets/images/svg/location";
import ClockIcon from "../../assets/images/svg/clock-icon";
import Rupee from "../../assets/images/svg/rupee";
import AvatarImage from "../../components/common/avatar-image/avatar-image";

interface IconTextProps {
  icon: typeof Icon;
  text: React.ReactNode;
}

interface IProps {
  previewData: ICreateJobValues | null;
  setPreview: Dispatch<SetStateAction<boolean>>;
  setEditJob: Dispatch<SetStateAction<boolean>>;
  postJobOnReview: (arg: any) => void;
  loadingApi: boolean;
}

const PreviewJob = ({
  previewData,
  setPreview,
  postJobOnReview,
  loadingApi,
  setEditJob,
}: IProps) => {
  const loading = true;
  const profileData = useSelector((state: State) => state?.profile);

  const listData = Array.from({ length: 2 }).map((_, i) => ({
    title: `ant design part ${i + 1}`,
    // avatar: <CustomAvatar />,
  }));

  const IconText: React.FC<IconTextProps> = ({ icon, text }) => (
    <>
      {React.createElement(icon, { style: { marginRight: 8 } })}
      {text}
    </>
  );

  return (
    <>
      <div className="w-full flex flex-col justify-start md:container mx-auto max-sm:mb-5 z-40">
        <div className="w-full">
          <div className="md:block hidden w-full">
            <div className="flex gap-2 justify-start items-center mb-5">
              <button
                onClick={() => {
                  setPreview(false);
                  setEditJob(true);
                }}
                className="comment-name max-md:hidden"
              >
                Create job
              </button>
              <RightArrowFeed />
              <h3 className="comment-name opacity-50 border-lightGrey  max-md:hidden">
                Preview job
              </h3>
            </div>
            <h1 className="text-white text-3xl font-normal max-md:hidden">
              Preview job
            </h1>
            <p className="text-grey text-xl font-normal pb-5 max-md:hidden">
              Preview your job before it post
            </p>
          </div>
          <div className="relative">
            <div className=" flex justify-center items-center gap-5 flex-col border-1 bg-darkBlack md:rounded-18 border-jobPink  md:shadow-job-shadow pb-5 w-full">
              <div className="flex flex-col w-full ">
                <div className=" flex flex-col space-y-3 p-4 border-b-8 border-grey">
                  <div className="flex justify-between items-center max-xs:flex-col max-xs:items-start max-xs:gap-3">
                    <div className="flex gap-3 justify-center items-center">
                      <div
                        onClick={() => {
                          setPreview(false);
                          setEditJob(true);
                        }}
                      >
                        <div className="md:hidden hover:scale-150">
                          <LeftArrow />
                        </div>
                      </div>
                      <AvatarImage
                        imageUrl={profileData?.profile?.profileImageUri}
                        size={48}
                      />
                      <div className="flex flex-col justify-start items-start gap-1 max-md:items-start">
                        <h1 className="text-lg font-medium leading-5 text-mediumViolet capitalize">
                          {profileData?.profile?.name}
                        </h1>
                        {profileData?.profile?.status === "active" && (
                          <div className="flex gap-2 justify-center items-center">
                            <h3 className="text-mediumViolet font-normal text-sm leading-4">
                              Verified
                            </h3>
                            <VerifiedProfile />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <div className="text-mediumViolet font-sm font-normal leading-4 md:hidden"></div>
                    </div>
                  </div>
                  <h1 className="text-md max-md:text-lg max-xs:text-sm font-semibold leading-6 text-mediumViolet capitalize">
                    {previewData?.jobTitle}
                  </h1>
                  <p className="comment--para max-w-1017">
                    {previewData?.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-wrap gap-4 ">
                      {previewData?.category?.map(
                        (item: string, index: number) => (
                          <div
                            className=" flex justify-center items-center gap-4 "
                            key={index}
                          >
                            <div className=" ">
                              <p className="category-text capitalize category">
                                {item}
                              </p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                    {/* <div className="md:hidden max-sm:w-6 ">
                      <RightArrow />
                    </div> */}
                  </div>
                  <div className="flex justify-between items-center max-lg:flex-col max-lg:items-start  w-full">
                    <div className="flex justify-between max-md:flex-col items-baseline gap-5 ">
                      <div className="flex gap-2 items-center">
                        <Clock />
                        <span className="card-clock">
                          Posted {TimeAgo(new Date())} ago
                        </span>
                      </div>
                      <div className="flex gap-1 items-center break-all">
                        <Location />
                        <span className="text-base font-normal leading-4 text-mediumViolet capitalize">
                          {previewData?.location
                            ?.toString()
                            ?.replaceAll(",", ", ")}
                        </span>
                      </div>
                      <div className="flex gap-2 items-start ">
                        <ClockIcon />
                        <div className="text-mediumViolet text-sm font-normal leading-4">
                          {!previewData?.fixPrice && (
                            <div className="flex items-center">
                              <Rupee />
                              {previewData?.minPrice}
                              <span className="mx-1">-</span>
                              <Rupee />
                              {previewData?.maxPrice}
                            </div>
                          )}
                          {previewData?.fixPrice && (
                            <div className="flex items-center">
                              <Rupee />
                              {previewData?.fixPrice}
                            </div>
                          )}
                          <span className="card-price">
                            {previewData?.fixPrice
                              ? "Fixed price"
                              : "Price Range"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-start items-center pt-5 px-4">
                  <h2 className="text-mediumViolet text-md font-semibold leading-6 ">
                    Comments
                    <span className="text-mediumBlue text-lg font-normal font-work pl-2">
                      (0)
                    </span>
                  </h2>
                </div>
                <List
                  itemLayout="vertical"
                  size="large"
                  dataSource={listData}
                  renderItem={(item) => (
                    <List.Item
                      key={item.title}
                      actions={
                        !loading
                          ? [
                              <IconText
                                icon={StarOutlined}
                                text="156"
                                key="list-vertical-star-o"
                              />,
                              <IconText
                                icon={LikeOutlined}
                                text="156"
                                key="list-vertical-like-o"
                              />,
                              <IconText
                                icon={MessageOutlined}
                                text="2"
                                key="list-vertical-message"
                              />,
                            ]
                          : undefined
                      }
                      extra={
                        !loading && (
                          <img
                            width={272}
                            alt="logo"
                            loading="lazy"
                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                          />
                        )
                      }
                    >
                      <Skeleton
                        className="custom-skeleton"
                        loading={loading}
                        active
                        avatar
                      >
                        <List.Item.Meta
                          avatar={
                            <img loading="lazy" src={skeleton} alt="skeleton" />
                          }
                        />
                      </Skeleton>
                    </List.Item>
                  )}
                />
              </div>
            </div>
            <div className="flex items-center justify-center w-full mt-7 max-md:px-1rem z-1">
              <button
                className="primary__button"
                onClick={() => postJobOnReview(previewData)}
                disabled={loadingApi ? true : false}
              >
                <ButtonSpinner loading={loadingApi} />
                POST JOB
              </button>
            </div>
            <div className="absolute -right-1.87rem -top-8 max-md:-right-2.2rem max-md:-top-9">
              <BlurDot />
            </div>
          </div>
        </div>
        <div className="sm:block hidden mt-16">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default PreviewJob;
