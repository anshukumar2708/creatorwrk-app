import { Modal } from "antd";
import { useSelector } from "react-redux";
import ButtonSpinner from "../common/button-spinner";
import { TimeAgo } from "../../utils/date";
import { State } from "../../interfaces/store";
import { Dispatch, SetStateAction, useState } from "react";
import { IProposalsListing } from "../../interfaces/feed-details";
import DeleteIcon from "../../assets/images/svg/delete-icon";
import AvatarImage from "../common/avatar-image/avatar-image";
import BoProposalListing from "../skeleton/bo-proposal-listing";
import { capitalizeFirstWord } from "../../utils/helper";
import BlackDeleteIcon from "../../assets/images/svg/black-delete-icon";
import { Link } from "react-router-dom";
import AssignMessageButton from "../common/assign-message-button/assign-message-button";

interface IProps {
  proposalsData: IProposalsListing[];
  showModal: () => void;
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
  proposalDeleteHandler: () => void;
  loading: boolean;
  setProposalId: Dispatch<SetStateAction<boolean>>;
  feedDetails: any;
  proposalLoading: boolean;
  setBalanceInflustar: (d: boolean) => void;
  setCommentModal: (d: boolean) => void;
  feedDetailsLoading: boolean;
}

const ProposalsListing = (props: IProps) => {
  const [isMouseIn, setIsMouseIn] = useState<boolean>(false);
  const profileData = useSelector((state: State) => state?.profile?.profile);
  const {
    proposalsData,
    showModal,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    proposalDeleteHandler,
    loading,
    setProposalId,
    proposalLoading,
    feedDetailsLoading,
  } = props;

  const filterData = proposalsData.filter(
    (item) => item?.user?.id === profileData?.id
  );

  const closeModalHandler = () => {
    document.body.style.overflow = "unset";
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      {(proposalLoading || feedDetailsLoading) && (
        <div className="flex flex-col justify-center items-center max-h-400 overflow-auto">
          {Array.from({ length: 1 }, (_, index) => (
            <BoProposalListing key={index} />
          ))}
        </div>
      )}

      {!proposalLoading &&
        filterData.length > 0 &&
        filterData.map((item: any, index: number) => {
          return (
            <div key={index} className="max-md:px-0  px-0 pb-10">
              <div className="flex w-full justify-between items-center ">
                <div className="flex gap-3">
                  <AvatarImage
                    imageUrl={item?.user?.profileImageUri}
                    size={45}
                    className="hover:scale-110"
                    name={item?.user.name}
                  />
                  <div className="flex flex-col gap-1.5">
                    <div className="flex gap-2 justify-start items-center">
                      <h1 className="comment-name capitalize">
                        {item?.user?.name}
                      </h1>
                      {/* <VerifiedProfile width={12} height={12} /> */}
                    </div>
                    <h3 className="comment-time">
                      {TimeAgo(new Date(item?.createdAt))}
                    </h3>
                  </div>
                </div>

                {!item?.threadDetails?.threadId ? (
                  <button
                    className={`flex gap-2 items-center justify-center rounded-3xl w-28 h-9 max-sm:w-10 max-sm:h-10 border-2 border-grey ${
                      isMouseIn ? "bg-white" : ""
                    }`}
                    onClick={() => {
                      setProposalId(item?.id);
                      showModal();
                    }}
                    onMouseEnter={() => {
                      setIsMouseIn(true);
                    }}
                    onMouseLeave={() => {
                      setIsMouseIn(false);
                    }}
                  >
                    {isMouseIn ? <BlackDeleteIcon /> : <DeleteIcon />}
                    <h2
                      className={`text-base font-medium leading-6 max-sm:hidden  ${
                        isMouseIn ? "text-black" : "text-white"
                      } `}
                    >
                      Delete
                    </h2>
                  </button>
                ) : (
                  <Link
                    to={`/message?threadId=${item?.threadDetails?.threadId}`}
                  >
                    <AssignMessageButton />
                  </Link>
                )}
                <Modal
                  centered
                  className="common-modal modal-bottom sm:!max-w-450"
                  open={isDeleteModalOpen}
                  onOk={() => closeModalHandler()}
                  onCancel={() => closeModalHandler()}
                  width={450}
                >
                  <div className=" flex flex-col justify-center items-center rounded-lg">
                    <div className="flex flex-col justify-center items-center w-full sm:h-214 h-291 border border-grey rounded-18 space-y-1.5 p-8 text-center">
                      <div className="w-full max-w-96 my-5">
                        <h2 className="text-lightWhite sm:text-2xl text-xl  font-semibold leading-6">
                          Delete Comment
                        </h2>
                        <p className="text-[16px] sm:text-[18px] font-normal text-blue pt-2">
                          Are you sure you want to delete comment?
                        </p>
                        <div className="w-full flex sm:flex-row flex-col-reverse justify-center sm:gap-3 gap-6 !mt-8">
                          <button
                            onClick={() => {
                              closeModalHandler();
                            }}
                            className="md:w-smallMedium w-210 h-11 m-auto hover:bg-white hover:border-1 hover:text-black  border border-primary rounded-4xl rounded-1 font-semibold text-white text-base"
                          >
                            No
                          </button>
                          <button
                            onClick={proposalDeleteHandler}
                            disabled={loading ? true : false}
                            className="md:w-smallMedium w-210 flex justify-center items-center h-11 m-auto hover:shadow-custom-white border-primary rounded-4xl rounded-1 font-semibold text-black bg-white text-base"
                          >
                            {loading ? (
                              <ButtonSpinner loading={loading} />
                            ) : (
                              "Delete Comment"
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Modal>
              </div>
              <p className="comment--para max-w-4xl md:pl-14 sm:mt-1 mt-2">
                {capitalizeFirstWord(item?.proposal)}
              </p>
            </div>
          );
        })}
    </>
  );
};

export default ProposalsListing;
