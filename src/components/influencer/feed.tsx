import { useCallback, useEffect, useState } from "react";
import HttpService from "../../services/http.service";
import { API_CONFIG } from "../../utils/api";
import { IFeedItem } from "../../interfaces/feed";
import { useSelector } from "react-redux";
import { State } from "../../interfaces/store";
import { debounce } from "../../utils/helper";
import SearchInput from "../common/search-input/search-input";
import FeedMyJob from "./feed-my-job";
import PageLayout from "../common/page-layout";
import useScrollPosition from "../../hooks/use-scroll-position";

const Feed = () => {
  const [hasMore, setHasMore] = useState(true);
  const [allFeedData, setAllFeedData] = useState<IFeedItem[]>([]);
  const profileData = useSelector((state: State) => state.profile?.profile);
  const [resetData, setResetData] = useState(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const [newThreadLoading, setNewThreadLoading] = useState(false);
  const scrollPosition = useScrollPosition();

  const [filters, setFilters] = useState({
    page: 1,
    perPage: 10,
    orderBy: "DESC",
    searchQuery: "",
  });

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
      });
    };
    scrollToTop();
  }, []);

  // function for get feed data
  const getFeedData = useCallback(async () => {
    if (profileData?.emailVerifiedAt) {
      try {
        const response = await HttpService.get(
          `${API_CONFIG.path.feeds}?page=${filters?.page}&perPage=${filters?.perPage}&orderBy=${filters?.orderBy}&search=${filters?.searchQuery}`
        );
        if (response) {
          setHasMore(response?.data?.pagination?.hasNext);
          if (resetData) {
            setAllFeedData(response?.data.items);
          } else {
            setAllFeedData((prevData: any) => [
              ...prevData,
              ...response?.data.items,
            ]);
          }
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setNewThreadLoading(false);
        setIsLoading(false);
        setIsSearchLoading(false);
      }
    }
  }, [resetData, filters, profileData?.emailVerifiedAt]);

  // initially fetch feed data
  useEffect(() => {
    getFeedData();
  }, [getFeedData]);

  // fetch feed data on scroll down
  const fetchDataInfiniteScroll = () => {
    if (hasMore) {
      setResetData(false);
      setNewThreadLoading(true);
      setFilters({
        ...filters,
        page: (filters.page += 1),
      });
    }
  };

  // for Search Feed
  const searchFeedHandler = debounce((searchQuery: string) => {
    if (searchQuery?.length >= 3) {
      setResetData(true);
      setIsSearchLoading(true);
      setFilters({
        ...filters,
        page: 1,
        searchQuery,
      });
    } else if (searchQuery?.length === 0) {
      setResetData(true);
      setIsSearchLoading(true);
      setFilters({
        ...filters,
        page: 1,
        searchQuery: "",
      });
    } else {
      setIsSearchLoading(true);
    }
  });

  return (
    <>
      <div className="w-full">
        <div
          className={`w-full sticky sm:top-[82px] top-4 z-50 ${
            scrollPosition > 20 ? "sticky-scrolled " : ""
          }`}
        >
          <div className="container w-full flex justify-between items-center gap-4 max-md:flex-col sm:pb-5 pb-3">
            <div className="flex flex-col max-md:items-start max-md:w-full gap-1">
              <h1 className="text-2xl max-md:text-xl font-semibold leading-7 text-mediumViolet">
                Top Feeds
              </h1>
              <p className="leading-5 text-lg max-sm:text-base font-normal text-mediumBlue">
                Explore the feeds which you like.
              </p>
            </div>
            <SearchInput
              searchHandler={searchFeedHandler}
              inputFocus={inputFocus}
              setInputFocus={setInputFocus}
            />
          </div>
        </div>
        <PageLayout>
          <div className="w-full feed-page-height">
            <FeedMyJob
              isLoading={isLoading}
              isSearchLoading={isSearchLoading}
              isNewLoading={newThreadLoading}
              filters={filters}
              allData={allFeedData}
              fetchDataOnScroll={fetchDataInfiniteScroll}
            />
          </div>
        </PageLayout>
      </div>
    </>
  );
};

export default Feed;
