import { useState } from "react";
import BlackChatIcon from "../../../assets/images/svg/black-chat-icon";
import MessageIcon from "../../../assets/images/svg/message-icon";

const ProposalListMessageButton = ({ data }: { data: any }) => {
  const [proposalId, setProposalId] = useState<string>("");
  return (
    <>
      {" "}
      <div
        className="flex justify-center items-center gap-3 sm:h-9 border-2 hover:bg-white border-grey bg-black md:rounded-3xl rounded-full sm:px-4 max-sm:p-2"
        onMouseOver={() => {
          setProposalId(data?.id);
        }}
        onMouseLeave={() => {
          setProposalId("");
        }}
      >
        <div className="flex justify-center items-center gap-3">
          {proposalId === data?.id ? <BlackChatIcon /> : <MessageIcon />}
          <span
            className={`${
              proposalId === data?.id ? " text-black" : " text-mediumViolet"
            }  text-base font-medium max-sm:hidden`}
          >
            Message
          </span>
        </div>
      </div>
    </>
  );
};

export default ProposalListMessageButton;
