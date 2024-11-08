import { Link } from "react-router-dom";
import ToolTip from "../tool-tip/tool-tip";
import WhiteStarIcon from "../../../assets/images/svg/white-star-icon";
import { Avatar } from "antd";
import { IAssignedUser } from "../../../interfaces/job-post-details";

const AssignUserAvatar = ({ data }: { data: IAssignedUser }) => {
  return (
    <>
      {" "}
      <ToolTip title={data?.name}>
        <Link to={`/influencer-profile/${data?.slug}`} className="relative">
          <div className="p-0.5 bg-assign-user-bg rounded-full">
            <Avatar
              src={data?.profileImageUri}
              size={30}
              className="bg-smallBlue"
            >
              <span className="text-bold capitalize">
                {data?.name.slice(0, 1)}
              </span>
            </Avatar>
          </div>
          <div className=" w-full flex justify-center items-center">
            <div className="bg-assign-icon-yellow rounded-full p-0 m-0 flex justify-center items-center w-3 h-3 absolute -bottom-1">
              <WhiteStarIcon width={10} height={10} />
            </div>
          </div>
        </Link>
      </ToolTip>
    </>
  );
};

export default AssignUserAvatar;
