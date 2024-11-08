import { useCallback, useEffect, useState } from "react";
import HttpService from "../../services/http.service";
import { Modal, Rate } from "antd";
import { API_CONFIG } from "../../utils/api";
import InfiniteScroll from "react-infinite-scroll-component";
import { Filters, Review } from "../../interfaces/profile";
import AvatarImage from "./avatar-image/avatar-image";
import dayjs from "dayjs";
import SkeletonReviewList from "../skeleton/skeleton-review-list";

const ProfileRating = ({ profileData }: any) => {
  const [reviewData, setReviewData] = useState<Review[]>([]);
  const [resetReviewData, setResetReviewData] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setLoading] = useState(true);

  const [filters, setFilters] = useState<Filters>({
    page: 1,
    perPage: 6,
    orderBy: "DESC",
    userType: profileData?.userType,
    userId: profileData?.id,
  });

  const getReviewData = useCallback(async () => {
    if (
      filters?.userId &&
      Number(profileData?.userReviews?.total) > 0 &&
      isModalOpen &&
      filters?.userType
    ) {
      try {
        const response = await HttpService.get(
          `${API_CONFIG.path.ProfileReview}?page=${filters?.page}&perPage=${filters?.perPage}&orderBy=${filters?.orderBy}&userType=${filters?.userType}&userId=${filters?.userId}`
        );
        if (response) {
          setHasMore(response?.data?.pagination?.hasNext);

          if (resetReviewData) {
            setReviewData(response?.data.items);
          } else {
            setReviewData((prevData) => [...prevData, ...response?.data.items]);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }, [filters, profileData, resetReviewData, isModalOpen]);

  useEffect(() => {
    getReviewData();
  }, [getReviewData]);

  // fetch feed data on scroll down
  const fetchDataInfiniteScroll = () => {
    setResetReviewData(false);
    setFilters({
      ...filters,
      page: (filters.page += 1),
    });
  };

  return (
    <>
      <div className="flex gap-2">
        <div className="flex items-center">
          <Rate
            defaultValue={Number(
              Math.round(profileData?.userReviews?.avg).toFixed(1)
            )}
            allowHalf
            disabled
            className="profile-custom-rate"
          />
        </div>
        <div className="text-base font-medium text-white leading-26.88">
          {Math.round(Number(profileData?.userReviews?.avg)).toFixed(1) ??
            "0.0"}
        </div>
      </div>
      <div className="w-full flex justify-center lg:justify-end">
        <div
          className="cursor-pointer font-normal text-sm leading-23.52 text-white flex flex-row justify-end items-end gap-2 border-b border-white w-48%"
          onClick={() => {
            if (profileData?.userReviews?.total > 0) {
              document.body.style.overflow = "hidden";
              setIsModalOpen(true);
            }
          }}
        >
          ({profileData?.userReviews?.total ?? 0}) <span>reviews</span>
        </div>
      </div>

      <Modal
        className="!rounded-18 modal-bottom sm:!max-w-450"
        centered
        open={isModalOpen}
        // onOk={() => {
        //   setIsModalOpen(false);
        //   document.body.style.overflow = "unset";
        // }}
        onCancel={() => {
          setIsModalOpen(false);
          document.body.style.overflow = "unset";
        }}
        footer={null}
        width={450}
      >
        <div className="bg-primary flex flex-col justify-start items-center rounded-18">
          <div className="flex flex-col justify-start items-center w-full h-674 sm:h-703 border rounded-18 border-grey p-2.5 text-center pt-5">
            <h1 className="text-lightWhite text-xl sm:text-2xl font-semibold">
              Rating & Review
            </h1>
            <div className="flex flex-col gap-2">
              <div className="flex justify-center text-58 font-medium text-white">
                {Number(profileData?.userReviews?.avg).toFixed(1) ?? "0.0"}
              </div>
              <div className="flex justify-center">
                {" "}
                <Rate
                  defaultValue={parseFloat(
                    Number(profileData?.userReviews?.avg).toFixed(2)
                  )}
                  allowHalf
                  disabled
                  className="profile-custom-rate"
                />
              </div>
              <div className="flex justify-center gap-1 text-sm font-normal text-darkGrey">
                ({profileData?.userReviews?.total ?? 0}) <span>reviews</span>
              </div>
            </div>
            <div className="h-0.8 bg-white opacity-20 mt-2 mb-2 w-80% m-auto hidden sm:block"></div>
            <div className="w-full mt-3">
              {isLoading && (
                <div className="w-full flex flex-col justify-center items-center gap-2 overflow-auto h-450">
                  {Array.from({ length: 5 }, (_, index) => (
                    <SkeletonReviewList key={index} />
                  ))}
                </div>
              )}
              {reviewData && !isLoading && (
                <InfiniteScroll
                  dataLength={reviewData?.length}
                  next={fetchDataInfiniteScroll}
                  hasMore={hasMore}
                  scrollableTarget="scrollableDiv"
                  loader={
                    <div className="w-full flex flex-col justify-center items-center pb-2 pt-2">
                      {filters?.page > 1 && (
                        <div className="w-full flex flex-col justify-center items-center">
                          {Array.from({ length: 1 }, (_, index) => (
                            <SkeletonReviewList key={index} />
                          ))}
                        </div>
                      )}
                    </div>
                  }
                  endMessage={
                    reviewData?.length > 5 && (
                      <p className="text-white text-center mt-2">
                        <b>"Yay! You have seen it all"</b>
                      </p>
                    )
                  }
                  height="435px"
                  //  style={{ height: "435px" }}
                  className="sm:!h-442"
                  initialScrollY={0}
                >
                  <div className="flex flex-col gap-2 overflow-y-scroll">
                    {reviewData?.map((values, index: any) => {
                      return (
                        <div
                          key={index}
                          className="rounded-18 bg-darkBlack border-1 border-solid border-gray-800 sm:p-4 p-3 sm:mt-0"
                        >
                          <div className="flex gap-2">
                            <div className="w-1/5">
                              <AvatarImage
                                imageUrl={values?.user?.profileImageUri}
                                size={window.innerWidth > 640 ? 48 : 42}
                              />
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                              <div className="flex gap-1">
                                <div className="flex flex-col gap-1 items-start w-60% max-md:w-65%">
                                  <div className="text-base text-start leading-18.77 font-medium text-mediumViolet sm:w-auto w-full max-sm:truncate">
                                    {values?.user?.name}
                                  </div>
                                  <div className="text-darkGrey text-xs font-normal">
                                    {dayjs(values?.createdAt).format(
                                      "DD, MM YYYY"
                                    )}
                                  </div>
                                </div>
                                <div className="w-40% max-md:w-34%">
                                  <Rate
                                    defaultValue={parseFloat(
                                      Number(values?.review).toFixed(2)
                                    )}
                                    allowHalf
                                    disabled
                                    className="profile-custom-rate text-sm"
                                  />
                                </div>
                              </div>
                              <div className="font-normal text-sm text-mediumBlue leading-16.42 text-start">
                                {values?.description}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </InfiniteScroll>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProfileRating;
