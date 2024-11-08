import { useState } from "react";
import { Link } from "react-router-dom";
import MessageHoverIcon from "../../../assets/images/svg/message-hover-icon";
import ChatIcon from "../../../assets/images/svg/chat-icon";

const AssignMessageIcon = ({ data }: { data: string }) => {
  const [isMouseIn, seIstMouseIn] = useState<boolean>(false);
  return (
    <>
      <Link
        to={`/message?threadId=${data}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="rounded-4xl bg-message-bg w-8 h-8 flex justify-center items-center"
          onMouseOver={() => {
            seIstMouseIn(true);
          }}
          onMouseLeave={() => {
            seIstMouseIn(false);
          }}
        >
          <div
            className={`w-7 h-7 rounded-4xl flex justify-center items-center ${
              isMouseIn ? "bg-black" : " "
            }`}
          >
            {isMouseIn ? <MessageHoverIcon /> : <ChatIcon />}
          </div>
        </div>
      </Link>
    </>
  );
};

export default AssignMessageIcon;
