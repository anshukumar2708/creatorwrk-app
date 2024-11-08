import { Link, useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import HttpService from "../../services/http.service";
import { API_CONFIG } from "../../utils/api";
import { TimeAgo } from "../../utils/date";
import {
  IJobPostDetails,
  IProposalsListing,
} from "../../interfaces/job-post-details";
import BlurDot from "../../assets/images/svg/blur-dot";
import NoComment from "../../assets/images/svg/no-comment";
import RightArrowFeed from "../../assets/images/svg/right-arrow-feed";
import AvatarImage from "./avatar-image/avatar-image";
import { Virtuoso } from "react-virtuoso";
import BoProposalListing from "../skeleton/bo-proposal-listing";
import JobPostDetailSkeleton from "../skeleton/skeleton-Job-post-detail";
import DetailsCard from "./details-card/details-card";
import WhiteStarIcon from "../../assets/images/svg/white-star-icon";
import { capitalizeFirstWord } from "../../utils/helper";
import ProposalListMessageButton from "./proposal-list-message-button/proposal-list-message-button";
import AssignMessageButton from "./assign-message-button/assign-message-button";

const JobPostDetail = () => {
  const { jobSlug } = useParams();
  const navigate = useNavigate();
  const [detailsLoading, setDetailsLoading] = useState<boolean>(true);
  const [proposalsLoading, setProposalLoading] = useState<boolean>(true);
  const [jobPostDetails, setJobDetails] = useState<IJobPostDetails | null>(
    null
  );
  const [proposalsData, setProposalsData] = useState<IProposalsListing[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [proposalResetData, setProposalResetData] = useState(true);
  const [newProposalLoading, setNewProposalLoading] = useState(false);

  const [proposalFilters, setProposalFilters] = useState({
    page: 1,
    perPage: 10,
    orderBy: "DESC",
  });

  const getJobDetailsData = useCallback(async () => {
    try {
      const response = await HttpService.get(
        `${API_CONFIG.path.myJob}/${jobSlug}/view`
      );
      if (response) {
        setJobDetails(response?.data);
      }
    } catch (error) {
      console.log("error", error);
      navigate("/not-found");
    } finally {
      setDetailsLoading(false);
    }
  }, [jobSlug, navigate]);

  useEffect(() => {
    getJobDetailsData();
  }, [jobSlug, getJobDetailsData]);

  const getProposalsData = useCallback(async () => {
    if (!jobPostDetails?.id) return;
    let jobId = jobPostDetails.id;
    try {
      const response = await HttpService.get(
        `${API_CONFIG.path.jobPostProposal}?page=${proposalFilters.page}&perPage=${proposalFilters.perPage}&jobId=${jobId}&orderBy=${proposalFilters.orderBy}`
      );
      if (response) {
        setHasMore(response.data.pagination.hasNext);
        if (proposalResetData) {
          setProposalsData(response.data.items);
        } else {
          setProposalsData((prevData) => [...prevData, ...response.data.items]);
        }
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setProposalLoading(false);
      setNewProposalLoading(false);
    }
  }, [jobPostDetails?.id, proposalFilters, proposalResetData]);

  useEffect(() => {
    getProposalsData();
  }, [jobPostDetails?.id, proposalFilters, getProposalsData]);

  const fetchProposalDataScroll = () => {
    if (hasMore) {
      setNewProposalLoading(true);
      setProposalResetData(false);
      setProposalFilters({
        ...proposalFilters,
        page: (proposalFilters.page += 1),
      });
    }
  };

  const threadsInitHandler = useCallback(
    async (item: IProposalsListing) => {
      if (!item?.threadDetails?.threadId) {
        try {
          const payload = {
            jobId: jobPostDetails?.id,
            proposalId: item?.id,
            creatorId: item?.user?.id,
          };
          const response = await HttpService.post(API_CONFIG.path.threadsInit, {
            ...payload,
          });
          if (response) {
            navigate(`/message?threadId=${item?.id}`);
          }
        } catch (error: any) {
          console.log(error);
        }
      } else {
        navigate(`/message?threadId=${item?.threadDetails?.threadId}`);
      }
    },
    [jobPostDetails, navigate]
  );

  const Footer = () => {
    return (
      <div className="flex flex-col justify-center items-center sm:pb-1 max-sm:pt-1 max-sm:pb-4">
        {newProposalLoading ? (
          <div className="w-full flex-col justify-center items-center">
            {Array.from({ length: 2 }, (element, index) => (
              <BoProposalListing key={index} />
            ))}
          </div>
        ) : (
          proposalFilters.page > 1 && (
            <span className="text-chatNoMessage text-sm font-normal">
              No more feed to show.
            </span>
          )
        )}
      </div>
    );
  };

  return (
    <>
      <div className="md:container w-full">
        <div className="w-full flex justify-start flex-col">
          <div className="md:block hidden">
            <div className="flex gap-2 justify-start items-center mb-5">
              <Link to="/" className="comment-name">
                Home
              </Link>
              <RightArrowFeed />
              <h3 className="comment-name opacity-50 border-lightGrey">
                Job Post details
              </h3>
            </div>
          </div>

          <div className="w-full flex justify-center items-center min-h-80">
            <div className="w-full sm:bg-black bg-transparent flex flex-col sm:mb-20 z-0 md:border max-md:p-4 relative md:border-green max-md:border max-md:border-t-green md:rounded-2xl shadow-neon-cyan max-md:overflow-x-hidden">
              <div className="md:p-6 pb-5 max-md:bg-transparent border-b-6 border-grey relative">
                {detailsLoading && <JobPostDetailSkeleton />}
                {!detailsLoading && (
                  <DetailsCard
                    data={jobPostDetails}
                    getJobDetailsData={getJobDetailsData}
                  />
                )}
              </div>
              <div className="commentContainer max-md:px-0">
                <div className="flex justify-start items-center ">
                  {detailsLoading ? (
                    <div className="w-40 h-5 rounded bg-skeletonBg"></div>
                  ) : (
                    <h2 className="text-mediumViolet text-md font-semibold leading-6">
                      Comments
                      <span className="text-mediumBlue text-lg font-normal font-work pl-2">
                        ({jobPostDetails?.proposalCount})
                      </span>
                    </h2>
                  )}
                </div>

                {/* proposal listing start */}
                <div className="w-full flex flex-col bo-proposals-list overflow-auto">
                  {(proposalsLoading || detailsLoading) && (
                    <div className="flex flex-col justify-center items-center">
                      {Array.from({ length: 3 }, (_, index) => (
                        <BoProposalListing key={index} />
                      ))}
                    </div>
                  )}
                  {proposalsData?.length > 0 && !proposalsLoading && (
                    <Virtuoso
                      className="w-full h-full"
                      data={proposalsData}
                      totalCount={proposalsData.length}
                      endReached={fetchProposalDataScroll}
                      increaseViewportBy={100}
                      itemContent={(index: number, item: IProposalsListing) => {
                        return (
                          <div
                            key={index}
                            className="comment-container max-md:px-0 border-b-6 border-grey px-0 py-4"
                          >
                            <div className="flex w-full justify-between items-center ">
                              <div className="flex gap-2">
                                <Link
                                  to={`/influencer-profile/${item?.user?.slug}`}
                                  title="View Profile"
                                >
                                  {item?.threadDetails?.threadStatus ===
                                  "approved" ? (
                                    <>
                                      <div className="relative">
                                        <div className="p-0.5 bg-assign-user-bg rounded-full">
                                          <AvatarImage
                                            imageUrl={
                                              item?.user?.profileImageUri
                                            }
                                            size={36}
                                          />
                                        </div>
                                        <div className="flex justify-center items-center">
                                          <div className="bg-assign-icon-yellow rounded-full p-0 m-0 flex justify-center items-center w-3 h-3 absolute -bottom-1">
                                            <WhiteStarIcon
                                              width={10}
                                              height={10}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    <AvatarImage
                                      imageUrl={item?.user?.profileImageUri}
                                      size={38}
                                      className="hover:scale-110"
                                    />
                                  )}
                                </Link>
                                <div className="flex flex-col">
                                  <div className="flex gap-2 justify-center items-center">
                                    <h1 className="comment-name font-medium text-sm capitalize">
                                      {item?.user?.name}
                                    </h1>
                                    {/* <VerifiedProfile width={12} height={12} /> */}
                                  </div>
                                  <h3 className="comment-time text-sm">
                                    {TimeAgo(new Date(item?.createdAt))}
                                  </h3>
                                </div>
                              </div>
                              {item?.threadDetails?.threadStatus ===
                                "approved" && (
                                <button
                                  onClick={() => {
                                    threadsInitHandler(item);
                                  }}
                                  className="p-0 m-0"
                                >
                                  <AssignMessageButton />
                                </button>
                              )}
                              {item?.threadDetails?.threadStatus !==
                                "approved" &&
                                item?.threadDetails?.threadStatus !==
                                  "archived" && (
                                  <button
                                    onClick={() => {
                                      threadsInitHandler(item);
                                    }}
                                    className="flex flex-row items-center rounded-full"
                                  >
                                    <ProposalListMessageButton data={item} />
                                  </button>
                                )}
                            </div>
                            <p className="comment--para max-w-4xl md:pl-12 max-md:mt-2">
                              {capitalizeFirstWord(item?.proposal)}
                            </p>
                          </div>
                        );
                      }}
                      components={{ Footer }}
                      initialScrollTop={0}
                    />
                  )}
                  {/* proposal listing end */}

                  {/* Data for no Comment */}
                  {proposalsData?.length === 0 && !proposalsLoading && (
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col justify-center items-center space-y-4 sm:pt-24 pt-12 text-center">
                        <NoComment />
                        <h1 className="text-white text-2xl font-semibold leading-7">
                          No Comment Added
                        </h1>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div
                className="absolute -right-8 max-lg:-right-9 overflow-hidden
                  max-md:-right-1.7 max-sm:-right-9 -top-9"
              >
                <BlurDot />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobPostDetail;
