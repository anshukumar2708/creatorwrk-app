import { Avatar } from "antd";
import AvatarImage from "../avatar-image/avatar-image";
import { IUserProposals } from "../../../interfaces/feed";

const ProposalCount = ({
  data,
  proposalCount,
}: {
  data: IUserProposals[];
  proposalCount: string;
}) => {
  return (
    <>
      {" "}
      <div className=" flex flex-row justify-between items-center gap-3">
        <div className="flex flex-row justify-start items-center gap-3">
          <Avatar.Group
            max={{
              count: 3,
              style: {
                color: "#000000",
                backgroundColor: "#5242B6",
              },
            }}
          >
            {data?.length > 0 &&
              data?.map((comments: IUserProposals, index: number) => {
                return (
                  <AvatarImage
                    key={index}
                    className="hover:scale-110"
                    imageUrl={comments?.profileImageUri}
                    name={comments?.name}
                    size={34}
                  />
                );
              })}
          </Avatar.Group>
          {parseInt(proposalCount) - 3 > 0 && (
            <div className="p-2 rounded-full border-6 border-grey w-10 h-10 flex justify-center items-center">
              <h5 className="text-sm font-normal leading-4 text-white">
                {parseInt(proposalCount) - 3}+
              </h5>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProposalCount;
