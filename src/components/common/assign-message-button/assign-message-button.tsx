import { useState } from "react";
import MessageIcon from "../../../assets/images/svg/message-icon";
import AssignMessageIcon from "../../../assets/images/svg/assign-message-icon";

const AssignMessageButton = () => {
  const [isMouseIn, seIstMouseIn] = useState<boolean>(false);
  return (
    <>
      {" "}
      <div
        className="flex flex-row items-center  bg-assign-message-bg rounded-full p-0.5"
        onMouseOver={() => {
          seIstMouseIn(true);
        }}
        onMouseLeave={() => {
          seIstMouseIn(false);
        }}
      >
        <div className="flex justify-center items-center gap-3 sm:h-8 hover:bg-assign-message-bg bg-black md:rounded-3xl rounded-full sm:px-4 max-sm:p-2">
          <div className="flex justify-center items-center gap-3">
            {isMouseIn ? <MessageIcon /> : <AssignMessageIcon />}

            <span
              className={` ${
                isMouseIn
                  ? "text-mediumViolet"
                  : "bg-assign-message-text bg-clip-text text-transparent"
              }  text-base font-medium max-sm:hidden `}
            >
              Message
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssignMessageButton;
