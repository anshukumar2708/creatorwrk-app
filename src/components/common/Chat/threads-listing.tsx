import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IThreads } from "../../../interfaces/message";
import { Dispatch, SetStateAction, useMemo } from "react";
import { TimeAgo } from "../../../utils/date";
import { State } from "../../../interfaces/store";
import AvatarImage from "../avatar-image/avatar-image";
import { Virtuoso } from "react-virtuoso";
import { useMediaQuery } from "@uidotdev/usehooks";
import noMessage from "../../../assets/images/svg/no-message.svg";
import { IFilters } from "../../../interfaces/common";
import TreadListSkeleton from "../../skeleton/skeleton-tread-list";

interface threadsListingProps {
  threadsData: IThreads[];
  fetchThreadsOnScroll: () => void;
  threadLoading: boolean;
  activeThreadId: string | null;
  setMsgInput: Dispatch<SetStateAction<string>>;
  newThreadListLoading: boolean;
  filters: IFilters;
  setChatListLoading: Dispatch<SetStateAction<boolean>>;
}

const ThreadsListing = ({
  threadsData,
  fetchThreadsOnScroll,
  threadLoading,
  activeThreadId,
  setMsgInput,
  newThreadListLoading,
  filters,
  setChatListLoading,
}: threadsListingProps) => {
  const navigate = useNavigate();
  const isLargeDevice = useMediaQuery("only screen and (min-width : 1024px)");
  const profileData = useSelector((state: State) => state?.profile?.profile);

  const sortedThreads = useMemo(() => {
    return [...threadsData].sort((a: IThreads, b: IThreads) => {
      const dateA = a.lastMessage?.lastCreatedAt
        ? new Date(a.lastMessage.lastCreatedAt).getTime()
        : 0;
      const dateB = b.lastMessage?.lastCreatedAt
        ? new Date(b.lastMessage.lastCreatedAt).getTime()
        : 0;

      return dateB - dateA;
    });
  }, [threadsData]);

  const itemContent = (index: number, item: any) => {
    const hasSameActiveThread = activeThreadId === item.id;

    const hasUnreadMessage =
      !hasSameActiveThread &&
      item?.lastMessage?.lastCreatedAt !== item?.lastReadAt &&
      item?.lastMessage?.lastSenderId !== profileData?.id;

    // const hasPulseActive =
    //   !hasSameActiveThread &&
    //   hasUnreadMessage &&
    //   item?.lastMessage?.lastSenderId !== profileData?.id;

    return (
      <div
        onClick={() => {
          if (activeThreadId !== item.id) {
            setMsgInput("");
            setChatListLoading(true);
            navigate(`/message?threadId=${item.id}`, {
              replace: true,
            });
          }
        }}
        className={`message-wrapper items-center cursor-pointer hover:bg-secondaryOpacity lg:px-3 py-2 mb-2 w-full ${
          activeThreadId === item?.id && "bg-secondaryOpacity"
        }`}
        key={index}
      >
        <div className="flex items-center gap-4 w-full">
          <div>
            <AvatarImage imageUrl={item?.user?.profileImageUri} size={55} />
          </div>
          <div className="w-full flex flex-col justify-center items-start gap-0.5">
            <div className="flex justify-between items-center w-full">
              <div className="w-full flex justify-between items-center gap-2">
                <div className="flex items-center gap-2">
                  <p
                    className={`text-base capitalize ${
                      hasUnreadMessage
                        ? "font-semibold text-white"
                        : "font-medium text-mediumViolet"
                    }`}
                  >
                    {item?.user?.name?.slice(0, 18)}
                    {item?.user?.name?.length > 18 && "..."}
                  </p>
                </div>
                {item?.status === "approved" && (
                  <div className="flex flex-row justify-start items-center gap-2">
                    <p className="text-sm font-medium leading-4 bg-gradient-to-t from-secondary to-primary text-transparent bg-clip-text">
                      Assigned
                    </p>
                  </div>
                )}
              </div>
            </div>
            {item?.lastMessage?.lastMessage && (
              <div className="w-full flex justify-between items-center">
                <p
                  className={`text-sm ${
                    hasUnreadMessage
                      ? "font-semibold text-white"
                      : "font-medium text-mediumGrey"
                  }`}
                >
                  {item?.lastMessage?.lastMessage?.slice(0, 30)}
                  {item?.lastMessage?.lastMessage?.length > 30 && "..."}
                </p>
                {hasUnreadMessage && <div className="pulseUnreadMessage"></div>}
              </div>
            )}
            <div className="w-full flex justify-between items-center ">
              <p className="text-jobText text-xs font-normal">
                Job : {item?.jobs?.jobTitle?.slice(0, 22)}
                {item?.jobs?.jobTitle?.length > 22 && "..."}
              </p>

              {item?.lastMessage?.lastCreatedAt && (
                <p className={`text-xs font-normal text-white`}>
                  {TimeAgo(new Date(item?.lastMessage?.lastCreatedAt || ""))}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Footer = () => {
    return (
      <div className="flex flex-col justify-center items-center sm:pb-1 max-sm:pt-1 max-sm:pb-4">
        {newThreadListLoading && filters.page > 1
          ? Array.from({ length: 1 }, (_, index) => (
              <TreadListSkeleton key={index} />
            ))
          : filters.page > 1 && (
              <span className="text-chatNoMessage text-sm font-normal">
                No more contacts to show.
              </span>
            )}
      </div>
    );
  };

  return (
    <>
      {threadLoading && (
        <div className="w-full thread-list-screen flex flex-col justify-center items-center max-lg:gap-2 overflow-auto lg:pt-5">
          {Array.from({ length: 9 }, (_, index) => (
            <TreadListSkeleton key={index} />
          ))}
        </div>
      )}

      {!threadLoading && sortedThreads?.length > 0 && (
        <div className="w-full h-full flex flex-col thread-list-screen">
          <Virtuoso
            data={sortedThreads}
            totalCount={sortedThreads.length}
            endReached={fetchThreadsOnScroll}
            increaseViewportBy={isLargeDevice ? 50 : 30}
            itemContent={itemContent}
            components={{ Footer }}
            initialScrollTop={0}
          />
        </div>
      )}

      {!threadLoading && sortedThreads?.length === 0 && (
        <div className="w-full lg:hidden">
          <div className="thread-list-screen flex justify-center items-center">
            <div className="flex flex-col justify-center items-center gap-3">
              <img src={noMessage} alt="noMessage" />
              <h1 className="text-2xl font-semibold text-white">
                No Messages, yet
              </h1>
              <p className="text-lg font-normal text-grey">
                No message in your inbox.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ThreadsListing;
