import { useState } from "react";
import shalini from "../../../src/assets/images/svg/shalini.svg";
import { Modal } from "antd";
import VerifiedProfile from "../../assets/images/svg/verified-profile";
import DeleteIcon from "../../assets/images/svg/delete-icon";

const FeedDetailComment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  return (
    <div className="comment-container">
      <div className="flex w-full justify-between items-center">
        <div className="flex  gap-3">
          <img
            loading="lazy"
            className="w-11 h-11"
            src={shalini}
            alt="shalini"
          />

          <div className="flex flex-col gap-1.5">
            <div className="flex gap-2 justify-center items-center">
              <h1 className="comment-name">Jayshri Tiwari</h1>
              <VerifiedProfile width={12} height={12} />
            </div>
            <h3 className="comment-time">1 days ago</h3>
          </div>
        </div>

        <button
          // className="!my-0 flex gap-2 items-center"
          className="my-5 flex gap-2 items-center justify-center mr-5 rounded-3xl w-28 max-sm:w-10 h-10 group hover:border-2 hover:border-grey"
          // type="primary"
          onClick={showModal}
        >
          <DeleteIcon />
          <h2 className="text-white text-base font-medium leading-6">Delete</h2>
        </button>

        <Modal className="common-modal" open={isModalOpen}>
          <div className=" flex flex-col justify-center items-center ">
            <div className="flex flex-col justify-center items-center w-full border border-grey rounded-lg space-y-1.5 p-8 text-center">
              <h2 className="text-lightWhite text-2xl font-semibold leading-6">
                Delete Comment
              </h2>

              <p className="text-lg font-normal text-blue  ">
                Are you sure you want to delete comment?
              </p>
              <div className="flex justify-center max-sm:flex-col gap-3 !my-12">
                <button className="w-44 h-11 hover:bg-white hover:border-1 hover:text-black  border border-primary  rounded-4xl rounded-1 font-semibold text-white text-base">
                  No
                </button>

                <button className="w-44 h-11 hover:text-white hover:border hover:bg-transparent border-primary  rounded-4xl rounded-1 font-semibold text-black bg-white text-base">
                  Delete Comment
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>

      <p className="comment--para max-w-42">
        This sounds like a fantastic opportunity for both your restaurant and
        the influencer! Leveraging social media and video content is key in
        today's digital age, and I'm sure partnering with a girl influencer will
        bring a fresh perspective and attract new customers to your
        establishment.
      </p>
      <span className="border-lightGrey border-8"></span>
    </div>
  );
};
export default FeedDetailComment;
