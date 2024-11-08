import { ImyJobFilter } from "../../../interfaces/myJob";
import BoThreeDotsAction from "../../brand-owner/bo-three-dots-action";
import AssignUserAvatar from "../assign-user-avatar/assign-user-avatar";
import AssignMessageIcon from "../assign-message-icon/assign-message-icon";
import { Dispatch, SetStateAction } from "react";

const ActionButton = ({
  data,
  cards,
  threeDots,
  setResetData,
  setFilters,
  getJobDetailsData,
  setReviewModal,
  setAddViewReviewData,
}: {
  data?: any;
  cards?: string;
  threeDots?: string;
  DropDownContent?: any;
  setResetData?: Dispatch<SetStateAction<boolean>>;
  setFilters?: Dispatch<SetStateAction<ImyJobFilter>>;
  getJobDetailsData?: () => void;
  setReviewModal?: Dispatch<SetStateAction<boolean>>;
  setAddViewReviewData?: any;
}) => {
  return (
    <>
      <div
        className="flex justify-end items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center items-start sm:gap-4 sms:gap-2 gap-4">
          <div className={`${cards}`}>
            {data?.assignedUser && data?.assignedUser?.length > 0 && (
              <AssignUserAvatar data={data?.assignedUser[0]} />
            )}
          </div>
          {data?.assignedUser && data?.assignedUser?.length > 0 && (
            <div className={`${cards}`}>
              <AssignMessageIcon data={data?.assignedUser[0]?.threadId} />
            </div>
          )}
          {(data?.status === "active" || data?.reviews?.creatorReview) && (
            <div className={`${threeDots} cursor-pointer`}>
              <BoThreeDotsAction
                data={data}
                setResetData={setResetData}
                setFilters={setFilters}
                getJobDetailsData={getJobDetailsData}
                setReviewModal={setReviewModal}
                setAddViewReviewData={setAddViewReviewData}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ActionButton;
