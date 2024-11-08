import GradientStar from "../../assets/images/svg/gradient-star";
import AssignMessageIcon from "../common/assign-message-icon/assign-message-icon";

const AssignUserTitleIcon = ({
  threadStatus,
  threadId,
}: {
  threadStatus: string | undefined;
  threadId: string;
}) => {
  return (
    <>
      <div className="w-full flex gap-2 items-center">
        {threadStatus === "approved" && (
          <div className="w-full bg-gradient-to-r from-teal-400 via-indigo-500 to-pink-500 p-0.5 bg-transparent border-5 relative rounded-4xl">
            <div className="sm:w-190 w-full flex bg-primary flex-row justify-center items-center rounded-4xl px-3 py-1.5 gap-3">
              <GradientStar />
              <p className="text-sm font-medium leading-4 text-white">
                Job Assigned to You
              </p>
            </div>
          </div>
        )}
        {threadStatus !== "archived" && <AssignMessageIcon data={threadId} />}
      </div>
    </>
  );
};

export default AssignUserTitleIcon;
