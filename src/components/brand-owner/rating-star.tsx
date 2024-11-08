import {
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
  useEffect,
  useRef,
} from "react";
import { Modal, Rate } from "antd";
import HttpService from "../../services/http.service";
import { API_CONFIG } from "../../utils/api";
import ButtonSpinner from "../common/button-spinner";
import AvatarImage from "../common/avatar-image/avatar-image";
import { useNotificationToaster } from "../../hooks/use-notification-toaster";
import Loader from "../common/loader";

interface IProps {
  reviewModal: boolean;
  setReviewModal: Dispatch<SetStateAction<boolean>>;
  addViewReviewData?: {
    title: string;
    profileImageUri: string;
    name: string;
    jobId?: string;
    threadId?: string;
    fromUserId?: string;
    review?: number;
    description?: string;
  };
  userDetails?: any;
  getDetailsApi: () => void;
}

const RatingStar = ({
  reviewModal,
  setReviewModal,
  addViewReviewData,
  getDetailsApi,
}: IProps) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState<string>("");
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [delayLoading, setDelayLoading] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const notify = useNotificationToaster();

  useEffect(() => {
    if (reviewModal && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [reviewModal]);

  const onRatingChange = (value: number) => {
    setRating(value);
    console.log(value);
  };

  const handleOkCancel = () => {
    setReviewModal(false);
    document.body.style.overflow = "unset";
  };

  const reviewPostHandler = useCallback(async () => {
    if (loading) return;
    setIsReviewSubmitted(true);
    if (rating > 0) {
      try {
        setLoading(true);
        const payload = {
          threadId: addViewReviewData?.threadId,
          review: rating,
          description: reviewText,
        };
        const response = await HttpService.post(
          `${API_CONFIG.path.review}/${addViewReviewData?.jobId}/submit`,
          {
            ...payload,
          }
        );
        if (response) {
          getDetailsApi();
          notify(
            "success",
            `Review added to ${addViewReviewData?.name} successfully`
          );
          setReviewModal(false);
          document.body.style.overflow = "unset";
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
        setIsReviewSubmitted(false);
      }
    } else {
      notify(
        "error",
        "Please ensure that the review includes a minimum of one star"
      );
      setIsReviewSubmitted(false);
    }
  }, [
    getDetailsApi,
    rating,
    reviewText,
    setReviewModal,
    loading,
    notify,
    addViewReviewData,
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [setDelayLoading]);

  return (
    <>
      <Modal
        className="common-modal modal-bottom sm:!max-w-450"
        open={reviewModal}
        onOk={handleOkCancel}
        onCancel={handleOkCancel}
        zIndex={9999}
        width={450}
        centered
      >
        <div className="w-full flex items-center flex-col justify-center rounded-18">
          <div className="w-full h-507 sm:h-529 rounded-18 border border-grey flex flex-col justify-center items-center p-5">
            {delayLoading && (
              <div className="h-507 flex justify-center items-center">
                <Loader />{" "}
              </div>
            )}
            {!delayLoading && (
              <>
                <h1 className="text-lightWhite sm:text-2xl text-xl font-semibold">
                  {addViewReviewData?.title}
                </h1>

                <AvatarImage
                  imageUrl={addViewReviewData?.profileImageUri}
                  size={100}
                  className="hover:scale-110 mt-2"
                />
                <p className="text-22 font-medium leading-10 text-white pt-3">
                  {addViewReviewData?.name}
                </p>
                <div className="flex pt-3">
                  {addViewReviewData?.review ? (
                    <Rate
                      disabled
                      defaultValue={addViewReviewData?.review}
                      className="custom-rate"
                    />
                  ) : (
                    <Rate
                      defaultValue={rating}
                      className="custom-rate"
                      onChange={onRatingChange}
                    />
                  )}
                </div>
                {addViewReviewData?.review ? (
                  <div className="w-full min-h-20 flex justify-center items-center">
                    <p className="w-full text-lg text-white font-normal flex justify-center items-center mt-5 text-center">
                      {addViewReviewData?.description}
                    </p>
                  </div>
                ) : (
                  <textarea
                    id="message"
                    rows={5}
                    ref={textareaRef}
                    onChange={(e) => setReviewText(e?.target?.value)}
                    className="block bg-primary !resize-none mt-6 sm:w-386 w-293 border-x-0 border-t-0 text-base text-blue font-normal border border-b-secondary dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write review"
                  ></textarea>
                )}

                {!addViewReviewData?.review && (
                  <button
                    disabled={isReviewSubmitted}
                    onClick={reviewPostHandler}
                    className="w-52 h-12 mt-8 text-base font-bold leading-4 text-primary max-xs:w-56 hover:shadow-custom-white bg-white rounded-sm flex justify-center p-2.5 items-center gap-2.5"
                  >
                    <ButtonSpinner loading={loading} />
                    Post
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RatingStar;
