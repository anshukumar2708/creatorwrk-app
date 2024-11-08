import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form } from "antd";
import * as actionTypes from "../../store-items/action-types";
import TextArea from "antd/es/input/TextArea";
import RightArrowFeed from "../../assets/images/svg/right-arrow-feed";
import BlurDot from "../../assets/images/svg/blur-dot";
import HttpService from "../../services/http.service";
import { API_CONFIG } from "../../utils/api";
import { IFeedDetails, IProposalsListing } from "../../interfaces/feed-details";
import { useDispatch, useSelector } from "react-redux";
import ButtonSpinner from "../common/button-spinner";
import { createAction } from "../../utils/common";
import ProposalsListing from "./proposals-listing";
import BalanceInfluencer from "./balance-influencer";
import { State } from "../../interfaces/store";
import AvatarImage from "../common/avatar-image/avatar-image";
import { useNotificationToaster } from "../../hooks/use-notification-toaster";
import { minInFluStar } from "../../assets/locales/constant";
import AddCommentModal from "./add-comment-modal";
import JobStatusTitle from "../common/job-status-title/job-status-title";
import FeedDetailsCard from "./feed-details-card";

const FeedDetail = () => {
  const [form] = Form.useForm();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [commentModal, setCommentModal] = useState<boolean>(false);
  const [feedDetails, setFeedDetails] = useState<IFeedDetails>();
  const [proposalsData, setProposalsData] = useState<IProposalsListing[]>([]);
  const [proposalMsg, setProposalMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [feedDetailsLoading, setFeedDetailsLoading] = useState<boolean>(true);
  const [proposalLoading, setProposalLoading] = useState<boolean>(true);
  const [proposalId, setProposalId] = useState(false);
  const [balanceInflustar, setBalanceInflustar] = useState(false);
  const profileData = useSelector((state: State) => state?.profile?.profile);
  const dispatch = useDispatch();
  const { feedSlug } = useParams();
  const navigate = useNavigate();
  const notify = useNotificationToaster();

  const { userType, status } = profileData || {};

  const modalCloseHandler = useCallback(() => {
    document.body.style.overflow = "unset";
    setCommentModal(false);
  }, [setCommentModal]);

  // get data for Feed Details
  const getFeedDetailsData = useCallback(async () => {
    if (userType === "creator" && status === "active") {
      try {
        const response = await HttpService.get(
          `${API_CONFIG.path.feeds}/${feedSlug}/view`
        );
        if (response) {
          setFeedDetails(response?.data);
        }
        setFeedDetailsLoading(false);
      } catch (error) {
        console.log("error", error);
        setFeedDetailsLoading(false);
        navigate("/not-found");
      }
    }
  }, [userType, status, feedSlug, navigate]);

  useEffect(() => {
    getFeedDetailsData();
  }, [getFeedDetailsData]);

  // get data for All Proposals Details
  const getProposalsData = useCallback<any>(async () => {
    setProposalLoading(true);
    if (!feedDetails?.id) return;
    let jobId = feedDetails?.id;
    try {
      const response = await HttpService.get(
        `${API_CONFIG.path.feedProposals}?jobId=${jobId}`
      );
      if (response) {
        setProposalsData(response?.data.items);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setProposalLoading(false);
    }
  }, [feedDetails?.id, setProposalLoading]);

  useEffect(() => {
    getProposalsData();
  }, [feedDetails?.id, getProposalsData]);

  // post proposals
  const postCommentHandler = useCallback(async () => {
    if (profileData?.creator?.creatorStar < minInFluStar) {
      setBalanceInflustar(true);
    } else {
      if (proposalMsg.trim().length >= 3 && proposalMsg.trim().length <= 1000) {
        try {
          setLoading(true);
          const payload = {
            proposal: proposalMsg,
          };
          const response = await HttpService.post(
            `${API_CONFIG.path.feeds}/${feedDetails?.id}/proposal/submit`,
            {
              ...payload,
            }
          );
          if (response) {
            setProposalMsg("");
            setProposalsData((prevData: any) => [
              {
                user: {
                  id: profileData?.id,
                  slug: profileData?.slug,
                  name: profileData?.name,
                  profileImageUri: profileData?.profileImageUri,
                },
                id: response?.data?.id,
                proposal: response?.data?.proposal,
                createdAt: response?.data?.createdAt,
              },
              ...prevData,
            ]);
            // update profileData in redux for creatorStar on proposal submit
            const updatedProfileData = {
              ...profileData,
              creator: {
                ...profileData.creator,
                creatorStar: response?.data?.creatorStar,
              },
            };
            dispatch(
              createAction(actionTypes.GET_PROFILE_DATA, updatedProfileData)
            );
            // update  proposalCount in feedDetails on proposal submit
            setFeedDetails((prevData) => {
              if (prevData) {
                return {
                  ...prevData,
                  proposalCount: (
                    parseInt(prevData.proposalCount) + 1
                  ).toString(),
                };
              }
            });
            notify("success", "Comment posted successfully");
          }
        } catch (error: any) {
        } finally {
          modalCloseHandler();
          setLoading(false);
        }
      }
    }
  }, [
    feedDetails?.id,
    proposalMsg,
    profileData,
    dispatch,
    notify,
    modalCloseHandler,
    setProposalMsg,
  ]);

  // Delete Proposals
  const proposalDeleteHandler = useCallback(async () => {
    try {
      setLoading(true);
      const response = await HttpService.deleteRequest(
        `${API_CONFIG.path.feeds}/proposal/${proposalId}/delete`
      );
      if (response) {
        setProposalsData((prevData: any) => [
          ...prevData.filter((proposal: any) => proposal.id !== proposalId),
        ]);
        setFeedDetails((prevData: any) => ({
          ...prevData,
          proposalCount: prevData?.proposalCount - 1,
        }));
        notify("success", "Comment delete successful");
      }
    } catch (error: any) {
    } finally {
      document.body.style.overflow = "unset";
      setIsDeleteModalOpen(false);
      setLoading(false);
    }
  }, [proposalId, notify]);

  // for delete comment modal
  const showModal = () => {
    setIsDeleteModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setCommentModal(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (commentModal && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [commentModal]);

  return (
    <>
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-col">
          <div className="md:block hidden">
            <div className="flex gap-2 justify-start items-center mb-5">
              <Link to="/" className="comment-name ">
                Home
              </Link>
              <RightArrowFeed />
              <h3 className="comment-name">
                <Link to="/" className="comment-name ">
                  Feeds
                </Link>
              </h3>
              <RightArrowFeed />
              {feedDetailsLoading && (
                <div className="w-50% h-3 rounded bg-skeletonBg"></div>
              )}
              {!feedDetailsLoading && (
                <h3 className="comment-name opacity-50 border-lightGrey capitalize line-clamp-1">
                  {feedDetails?.title}
                </h3>
              )}
            </div>
          </div>

          <div className="feed-details-card-height md:bg-black  bg-transparent flex flex-col sm:mb-20 mb-10 z-10 border relative md:border-green max-md:border-t-green w-full md:rounded-2xl md:shadow-neon-cyan max-md:px-1rem max-md:overflow-x-hidden">
            {/* feed Details start */}
            <FeedDetailsCard
              feedDetails={feedDetails}
              feedDetailsLoading={feedDetailsLoading}
              getFeedDetailsData={getFeedDetailsData}
            />
            {/* feed Details end */}

            <>
              {!feedDetailsLoading && feedDetails?.status !== "active" && (
                <div className="md:hidden block mt-3">
                  <JobStatusTitle jobStatus={feedDetails?.status} />
                </div>
              )}
              {proposalsData?.length > 0 && (
                <div className="commentContainer max-md:px-0">
                  <div className="flex justify-between items-center mb-5">
                    {feedDetailsLoading && (
                      <div className="w-40 h-4 rounded bg-skeletonBg"></div>
                    )}
                    {!feedDetailsLoading && (
                      <h2 className="text-mediumViolet text-xl font-semibold leading-6 ">
                        Comments
                      </h2>
                    )}
                  </div>
                  <ProposalsListing
                    proposalsData={proposalsData}
                    showModal={showModal}
                    isDeleteModalOpen={isDeleteModalOpen}
                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                    proposalDeleteHandler={proposalDeleteHandler}
                    loading={loading}
                    setProposalId={setProposalId}
                    feedDetails={feedDetails}
                    proposalLoading={proposalLoading}
                    setBalanceInflustar={setBalanceInflustar}
                    setCommentModal={setCommentModal}
                    feedDetailsLoading={feedDetailsLoading}
                  />
                </div>
              )}
              {proposalsData?.length === 0 && (
                <>
                  <div className="commentContainer max-md:px-0 md:block hidden">
                    <div className="flex justify-between items-center mb-5">
                      {feedDetailsLoading && (
                        <div className="w-40 h-4 rounded bg-skeletonBg"></div>
                      )}
                      {!feedDetailsLoading && (
                        <h2 className="text-mediumViolet text-xl font-semibold leading-6 ">
                          Comments
                        </h2>
                      )}
                    </div>
                    {proposalLoading && (
                      <div className="w-full">
                        <div className="flex justify-start items-start gap-3 w-full">
                          <div className="w-10 h-10 rounded-full bg-skeletonBg"></div>
                          <div className="w-full flex flex-col gap-2">
                            <div className="w-full h-28 rounded-18 bg-skeletonBg"></div>
                            <div className="w-full flex justify-between items-start ">
                              <div className="w-45% h-3 rounded-18 bg-skeletonBg"></div>
                              <div className="w-44 h-11 bg-skeletonBg rounded-4xl"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {!proposalLoading && feedDetails?.allowedProposals && (
                      <div className="flex  w-full justify-between items-center">
                        <div className="flex gap-3 w-full">
                          <AvatarImage
                            imageUrl={profileData?.profileImageUri}
                            name={profileData?.name}
                            size={45}
                            className="hover:scale-110"
                          />
                          <div className="flex w-full flex-col gap-1.5">
                            <Form
                              form={form}
                              autoComplete="off"
                              onFinish={() => postCommentHandler()}
                            >
                              <Form.Item
                                name="comment"
                                className="comment-focus border-0 border-b-grey w-full"
                                validateTrigger={["onBlur", "onChange"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Comment is required",
                                  },
                                  {
                                    pattern: /^(?!\s+$).*$/,
                                    message: "Blank spaces are not allowed!",
                                  },
                                  {
                                    min: 3,
                                    message:
                                      "Comment must be greater then 3 Character!",
                                  },
                                  {
                                    max: 1000,
                                    message:
                                      "Comment must be less then 1000 Character!",
                                  },
                                ]}
                              >
                                <div className="flex gap-2 w-full  justify-center items-center ">
                                  <div className="w-full rounded-lg border-1 !border-purple">
                                    <TextArea
                                      autoFocus
                                      rows={4}
                                      placeholder="Write a comment.."
                                      className=" textarea-placeholder p-3 !shadow-none !resize-none text-base font-normal !bg-transparent !text-blue border-none border-b-8"
                                      onChange={(e) =>
                                        setProposalMsg(e?.target?.value)
                                      }
                                    />
                                  </div>
                                </div>
                              </Form.Item>
                              <div className="w-full flex justify-between items-start">
                                <p className="text-base text-white">
                                  <span className="font-normal text-blue">
                                    <b className="text-white">10 influstar</b>{" "}
                                    will be deducted from your account to post
                                    comment.
                                  </span>
                                </p>
                                <button
                                  disabled={
                                    !proposalMsg || loading ? true : false
                                  }
                                  className="w-44 h-11 hover:shadow-custom-white border-primary  rounded-4xl rounded-1 font-semibold text-black bg-white text-base mt-2"
                                >
                                  <ButtonSpinner loading={loading} />
                                  Post
                                </button>
                              </div>
                            </Form>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="md:hidden block mt-4">
                    {proposalLoading && (
                      <div className="w-full h-11 bg-skeletonBg rounded-4xl"></div>
                    )}
                    {!proposalLoading && feedDetails?.allowedProposals && (
                      <button
                        onClick={() => {
                          document.body.style.overflow = "hidden";
                          if (
                            profileData?.creator?.creatorStar < minInFluStar
                          ) {
                            setBalanceInflustar(true);
                          } else {
                            setCommentModal(true);
                          }
                        }}
                        className=" w-full h-11 border-primary rounded-4xl rounded-1 font-semibold text-black bg-white text-base hover:shadow-custom-white"
                      >
                        Add Comment
                      </button>
                    )}
                  </div>
                </>
              )}
            </>

            <div className="absolute -right-9  max-xl-right-0 max-lg:-right-8 max-md:-right-9 -top-9">
              <BlurDot />
            </div>
          </div>

          {/* responsive comment inbox modal */}
          <div className="w-full">
            <AddCommentModal
              commentModal={commentModal}
              modalCloseHandler={modalCloseHandler}
              form={form}
              textareaRef={textareaRef}
              postCommentHandler={postCommentHandler}
              proposalMsg={proposalMsg}
              setProposalMsg={setProposalMsg}
              loading={loading}
            />
          </div>

          {/*Enough star influencer */}
          <BalanceInfluencer
            balanceInflustar={balanceInflustar}
            setBalanceInflustar={setBalanceInflustar}
          />
        </div>
      </div>
    </>
  );
};

export default FeedDetail;
