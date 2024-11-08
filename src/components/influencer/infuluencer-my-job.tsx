import { useSelector } from "react-redux";
import { Tabs, TabsProps } from "antd";
import { useCallback, useEffect, useState } from "react";
import HttpService from "../../services/http.service";
import { API_CONFIG } from "../../utils/api";
import { IMyJobData, ImyJobFilter } from "../../interfaces/myJob";
import { State } from "../../interfaces/store";
import ProfileNotCompletedModal from "../common/profile-not-completed-modal/profile-not-completed-modal";
import { debounce } from "../../utils/helper";
import { Link } from "react-router-dom";
import JobIncrement from "../../assets/images/svg/job-increment";
import FeedMyJob from "./feed-my-job";
import SearchInput from "../common/search-input/search-input";
import PageLayout from "../common/page-layout";
import useScrollPosition from "../../hooks/use-scroll-position";

const InfluencerMyJob = () => {
  const [hasMore, setHasMore] = useState(true);
  const [myJobData, setMyJobData] = useState<IMyJobData[]>([]);
  const [resetData, setResetData] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isNewMyJobLoading, setIsNewMyJobLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [completeProfileModal, setCompleteProfileModal] = useState(false);
  const profileData = useSelector((state: State) => state.profile?.profile);
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const scrollPosition = useScrollPosition();
  const [filters, setFilters] = useState<ImyJobFilter>({
    page: 1,
    perPage: 10,
    orderBy: "DESC",
    status: "active",
    searchQuery: "",
  });

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
    profileData?.status === "active" &&
      profileData?.emailVerifiedAt &&
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
      let apiUrl;
      if (profileData?.userType === "creator") {
        apiUrl = API_CONFIG.path.influencerJobs;
      } else if (profileData?.userType === "business_owner") {
        apiUrl = API_CONFIG.path.myJob;
      }
      if (apiUrl) {
        try {
          const response = await HttpService.get(
            `${apiUrl}?page=${filters.page}&perPage=${filters.perPage}&orderBy=${filters.orderBy}&status=${filters.status}&search=${filters?.searchQuery}`
          );
          if (response && response.data) {
            setHasMore(response?.data?.pagination?.hasNext);
            if (resetData) {
              setMyJobData(response.data.items);
            } else {
              setMyJobData((prevData) => [
                ...prevData,
                ...response?.data.items,
              ]);
            }
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
          setSearchLoading(false);
          setIsNewMyJobLoading(false);
        }
      }
    } else {
      setIsLoading(false);
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
      setIsNewMyJobLoading(true);
      setFilters({
        ...filters,
        page: (filters.page += 1),
      });
    }
  };

  //   set data Feed on Search
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

  return (
    <>
      <div className="w-full ">
        <div
          className={`w-full sticky sm:top-[80px] top-10 z-50 pb-4 ${
            scrollPosition > 10 ? "bg-black" : " "
          }`}
        >
          <div className="container flex justify-between items-center max-md:flex-col max-md:items-start z-50">
            <div className="w-full">
              <h1 className="text-2xl max-md:text-xl font-semibold leading-7 text-mediumViolet">
                My Jobs
              </h1>
              <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            </div>
            <div className="flex gap-3 max-sm:flex-col max-md:w-full max-md:mt-4">
              <SearchInput
                searchHandler={myJobSearchHandler}
                inputFocus={inputFocus}
                setInputFocus={setInputFocus}
              />
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
          <div className="w-full influencer-my-job-page-height">
            <FeedMyJob
              isLoading={isLoading}
              isNewLoading={isNewMyJobLoading}
              isSearchLoading={searchLoading}
              filters={filters}
              allData={myJobData}
              fetchDataOnScroll={getDataOnScroll}
            />
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
export default InfluencerMyJob;
