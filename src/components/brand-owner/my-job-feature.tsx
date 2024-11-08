import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Tabs, TabsProps } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";
import HttpService from "../../services/http.service";
import { API_CONFIG } from "../../utils/api";
import { IMyJobData, ImyJobFilter } from "../../interfaces/myJob";
import { State } from "../../interfaces/store";
import { debounce, profileProgressBar } from "../../utils/helper";
import ProfileNotCompletedModal from "../common/profile-not-completed-modal/profile-not-completed-modal";
import JobIncrement from "../../assets/images/svg/job-increment";
// import ProfileCardSkeleton from "../skeleton/profile-card-skeleton";
// import SocialFeedSkeleton from "../skeleton/social-feed-skeleton";
import { Virtuoso } from "react-virtuoso";
import ProfileCard from "../influencer/profile-card";
import BoMyJobCard from "./bo-my-job-card";
import PageFooter from "../common/page-footer/page-footer";
import BoMyJobDataNotFound from "./bo-my-job-data-not-found";
import BoMyJobCardSkeleton from "../skeleton/bo-my-job-card-skeleton";
import HowItWork from "../common/how-it-work/how-it-work";
import PageLayout from "../common/page-layout";
import useScrollPosition from "../../hooks/use-scroll-position";
import { boSliderContent } from "../../assets/locales/constant";

const MyJobFeature = () => {
  const [hasMore, setHasMore] = useState(true);
  const [myJobData, setMyJobData] = useState<IMyJobData[]>([]);
  const [resetData, setResetData] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isNewMyJobData, setIsNewMyJobData] = useState<boolean>(false);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [completeProfileModal, setCompleteProfileModal] = useState(false);
  const profileData = useSelector((state: State) => state.profile?.profile);
  const [progressPercent, setProgressPercent] = useState<number>(100);
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const scrollPosition = useScrollPosition();
  const [filters, setFilters] = useState<ImyJobFilter>({
    page: 1,
    perPage: 6,
    orderBy: "DESC",
    status: "active",
    searchQuery: "",
  });

  useEffect(() => {
    const progress = profileProgressBar(profileData);
    setProgressPercent(progress);
  }, [profileData]);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Active",
    },
    {
      key: "2",
      label: "Completed",
    },
    {
      key: "3",
      label: "Closed",
    },
  ];

  const onChange = (key: string) => {
    setSearchLoading(true);
    if (key === "1") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        status: "active",
      }));
    } else if (key === "2") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        status: "completed",
      }));
    } else if (key === "3") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        status: "closed",
      }));
    }
  };

  // get myJob data initially
  const getMyJobData = useCallback(async () => {
    if (profileData?.status === "active" && profileData?.emailVerifiedAt) {
      try {
        const response = await HttpService.get(
          `${API_CONFIG.path.myJob}?page=${filters.page}&perPage=${filters.perPage}&orderBy=${filters.orderBy}&status=${filters.status}&search=${filters?.searchQuery}`
        );
        if (response && response.data) {
          setHasMore(response?.data?.pagination?.hasNext);
          if (resetData) {
            setMyJobData(response.data.items);
          } else {
            setMyJobData((prevData) => [...prevData, ...response?.data.items]);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
        setSearchLoading(false);
        setIsNewMyJobData(false);
      }
    }
  }, [profileData, filters, resetData]);

  // fetch feed data initially
  useEffect(() => {
    getMyJobData();
  }, [getMyJobData]);

  // fetch feed data on scroll
  const getDataOnScroll = () => {
    if (hasMore) {
      setResetData(false);
      setIsNewMyJobData(true);
      setFilters({
        ...filters,
        page: (filters.page += 1),
      });
    }
  };

  //  etch feed data Feed on Search
  const myJobSearchHandler = debounce((searchQuery: string) => {
    if (searchQuery?.length >= 3) {
      setResetData(true);
      setSearchLoading(true);
      setFilters({
        ...filters,
        page: 1,
        searchQuery,
      });
    } else if (searchQuery?.length === 0) {
      if (searchQuery.length === 0) {
        setResetData(true);
        setSearchLoading(true);
        setFilters({
          ...filters,
          page: 1,
          searchQuery: "",
        });
      }
    }
  });

  const Footer = () => {
    return (
      <div className="flex flex-col justify-center items-center sm:pb-1 max-sm:pt-1 max-sm:pb-4">
        {isNewMyJobData ? (
          <div className="w-full">
            <BoMyJobCardSkeleton />
          </div>
        ) : (
          filters.page > 1 && (
            <span className="text-chatNoMessage text-sm font-normal">
              No more jobs to show.
            </span>
          )
        )}
      </div>
    );
  };

  return (
    <>
      <div className="w-full">
        <div
          className={`flex justify-between items-center sticky pt-1 sm:top-20 top-12 pb-4 z-50 ${
            scrollPosition > 0 ? "sticky-scrolled" : ""
          }`}
        >
          <div className="container w-full flex justify-between items-center max-md:flex-col max-md:items-start ">
            <div>
              <h1 className="text-2xl max-md:text-xl font-semibold leading-7 text-mediumViolet">
                My Jobs
              </h1>
              <Tabs
                defaultActiveKey="1"
                items={items}
                onChange={onChange}
                className="transparent-tabs"
              />
            </div>
            <div className="flex gap-3 max-sm:flex-col max-md:w-full max-md:mt-4">
              <div
                className={`w-full md:w-80 p-0.5 z-50 ${
                  inputFocus
                    ? "bg-gradient-to-l from-teal-400 via-indigo-500 to-pink-500 rounded-4xl"
                    : ""
                } `}
              >
                <div className="max-lg:z-1 hover:border max-md:w-full h-12 bg-black  rounded-sm shadow-md border border-lightGrey flex justify-start p-2.5 items-center gap-2.5">
                  <SearchOutlined
                    width={50}
                    style={{ color: "grey", fontSize: "20px" }}
                  />
                  <input
                    className="search-input"
                    onChange={(e) => myJobSearchHandler(e.target.value)}
                    placeholder="Search"
                    onFocus={() => setInputFocus(true)}
                    onBlur={() => setInputFocus(false)}
                  />
                </div>
              </div>
              {profileData?.userType === "business_owner" && (
                <Link
                  to="/create-job"
                  className="w-createButtonHeight h-12 bg-white rounded-sm flex justify-start p-2.5 items-center gap-2.5 CreateButton hover:shadow-custom-white"
                >
                  <JobIncrement />
                  <span className="text-base font-medium leading-4 text-primary">
                    Create Job
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>

        <PageLayout>
          <div className="w-full bo-my-job-height flex justify-between items-start gap-5 mb-16">
            <div className="w-full">
              {(isLoading || searchLoading) && (
                <div className="w-full flex justify-between items-start gap-5">
                  <div className="w-full flex-col justify-center items-center">
                    {Array.from({ length: 5 }, (_, index) => (
                      <BoMyJobCardSkeleton key={index} />
                    ))}
                  </div>
                </div>
              )}
              {!isLoading && !searchLoading && myJobData.length > 0 && (
                <div className="w-full flex flex-col z-40">
                  <Virtuoso
                    useWindowScroll
                    data={myJobData}
                    totalCount={myJobData.length}
                    endReached={getDataOnScroll}
                    increaseViewportBy={50}
                    itemContent={(index: number, item: any) => {
                      return (
                        <BoMyJobCard
                          data={item}
                          key={index}
                          setResetData={setResetData}
                          setFilters={setFilters}
                        />
                      );
                    }}
                    components={{ Footer }}
                    initialScrollTop={0}
                  />
                </div>
              )}
              {/* No jobs data Available */}
              <BoMyJobDataNotFound
                data={myJobData}
                filters={filters}
                searchLoading={searchLoading}
                isLoading={isLoading}
              />
            </div>
            {/* right side cards */}
            <div className="sticky top-[180px] lg:block hidden">
              {/* {isLoading ? (
                  <div className="flex flex-col justify-center items-center gap-3">
                    <ProfileCardSkeleton />
                    <FilterSkeleton />
                    <SocialFeedSkeleton />
                  </div>
                ) : ( */}
              <div className="flex flex-col justify-center items-center gap-3">
                {(progressPercent < 100 ||
                  profileData?.verificationStatus === "pending") && (
                  <HowItWork sliderContent={boSliderContent} />
                )}
                <ProfileCard />
                {/* <FeedFilter /> */}
                <PageFooter />
              </div>
              {/* )} */}
            </div>
          </div>
        </PageLayout>

        <ProfileNotCompletedModal
          completeProfileModal={completeProfileModal}
          setCompleteProfileModal={setCompleteProfileModal}
        />
      </div>
    </>
  );
};
export default MyJobFeature;
