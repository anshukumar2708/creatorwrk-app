import Linkify from "react-linkify";
import TextareaAutosize from "react-textarea-autosize";
import {
  IActiveThread,
  IChatList,
  IComponentDecorator,
} from "../../../interfaces/message";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import HttpService from "../../../services/http.service";
import { useSelector } from "react-redux";
import { State } from "../../../interfaces/store";
import InfiniteScroll from "react-infinite-scroll-component";
import ButtonSpinner from "../button-spinner";
import dayjs from "dayjs";
import { IFilters } from "../../../interfaces/common";
import SendIcon from "../../../assets/images/svg/send-icon";
import { CHAT_BASE_URL } from "../../../assets/locales/constant";
import noMessage from "../../../assets/images/svg/no-message.svg";
import { useMediaQuery } from "@uidotdev/usehooks";
import DropDownDark from "../../../assets/images/svg/drop-down-dark";
import DropDownLight from "../../../assets/images/svg/drop-down-light";
import { useNotificationToaster } from "../../../hooks/use-notification-toaster";
import ChatListSkeleton from "../../skeleton/skeleton-chat-list";

interface ChatListProps {
  activeThreadData: IActiveThread | null;
  chatFilters: IFilters;
  setChatFilters: Dispatch<SetStateAction<IFilters>>;
  chatListReset: boolean;
  setChatListReset: Dispatch<SetStateAction<boolean>>;
  msgInput: string;
  setMsgInput: Dispatch<SetStateAction<string>>;
  chatList: IChatList[];
  setChatList: Dispatch<SetStateAction<IChatList[]>>;
  chatListLoading: boolean;
  setChatListLoading: Dispatch<SetStateAction<boolean>>;
}

const ChatList = ({
  activeThreadData,
  chatFilters,
  setChatFilters,
  chatListReset,
  setChatListReset,
  msgInput,
  chatList,
  setMsgInput,
  setChatList,
  chatListLoading,
  setChatListLoading,
}: ChatListProps) => {
  const [hasMore, setHasMore] = useState(true);
  const [expandedMessages, setExpandedMessages] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const scrollableDivRef = useRef<HTMLDivElement>(null);
  const [dynamicHeight, setDynamicHeight] = useState(345);
  const [textAreaHeight, setTextAreaHeight] = useState<number>(24);
  const [scrollFromBottom, setScrollFromBottom] = useState<number>(0);
  const profileData = useSelector((state: State) => state?.profile?.profile);
  const isSmallDevice = useMediaQuery("only screen and (max-width : 639px)");
  const isLargeDevice = useMediaQuery("only screen and (min-width : 640px)");
  const [isHoveringIcon, setIsHoveringIcon] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const notify = useNotificationToaster();
  // const { search } = useLocation();
  // const query = new URLSearchParams(search);
  // const urlThreadId = query.get("threadId");

  useEffect(() => {
    if (textareaRef.current) {
      // Scroll to the bottom when the textarea grows beyond maxRows
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [msgInput]);

  useEffect(() => {
    if (isLargeDevice) {
      setDynamicHeight(345);
    }
    if (isSmallDevice) {
      setDynamicHeight(290);
    }
  }, [isSmallDevice, isLargeDevice, setDynamicHeight]);

  // Function to scroll to the bottom on message send
  const ChatListScrollToBottom = () => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTo({
        top: scrollableDivRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  // get chat list API
  const getChatList = useCallback(async () => {
    if (activeThreadData?.id) {
      try {
        const response = await HttpService.get(
          `${CHAT_BASE_URL}/messages?page=${chatFilters?.page}&perPage=${chatFilters?.perPage}&orderBy=${chatFilters?.orderBy}&threadId=${activeThreadData?.id}`
        );
        if (response) {
          setHasMore(response?.data?.pagination?.hasNext);
          if (chatListReset) {
            setChatList(response?.data?.items);
          } else {
            setChatList((prevData: IChatList[]) => [
              ...prevData,
              ...response?.data.items,
            ]);
          }
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setChatListLoading(false);
      }
    } else {
      setTimeout(() => {
        setChatListLoading(false);
      }, 1000);
    }
  }, [
    activeThreadData?.id,
    chatListReset,
    chatFilters,
    setChatListLoading,
    setChatList,
  ]);

  useEffect(() => {
    getChatList();
  }, [getChatList]);

  // fetch feed data on scroll down
  const getChatListsOnScroll = () => {
    setChatListReset(false);
    setChatFilters({
      ...chatFilters,
      page: (chatFilters.page += 1),
    });
  };

  useEffect(() => {
    ChatListScrollToBottom();
    setScrollFromBottom(0);
  }, [chatListLoading]);

  // send message API
  const smgSubmitHandler = useCallback(async () => {
    if (!msgInput) return;
    setIsSubmitting(true);
    if (msgInput?.length <= 1000) {
      try {
        const response = await HttpService.post(
          `${CHAT_BASE_URL}/${activeThreadData?.id}`,
          { message: msgInput.slice(0, 1000) }
        );
        if (response) {
          setMsgInput("");
          ChatListScrollToBottom();
        }
      } catch (error) {
        console.error("Error submitting message:", error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      notify("error", "You can send max 1000 letter at a time");
      setIsSubmitting(false);
    }
  }, [msgInput, activeThreadData?.id, setMsgInput, notify]);

  // read more & read less in message chat
  const toggleMessageLength = (id: string) => {
    setExpandedMessages((prev: any) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const customLinkifyDecorator: IComponentDecorator = (href, text, key) => (
    <a
      href={href}
      key={key}
      target="_blank"
      rel="noopener noreferrer"
      className="text-secondary"
    >
      {text}
    </a>
  );

  return (
    <div className="w-full relative message-blank-screen flex justify-center items-center">
      <div className="w-full h-full">
        <div className="w-full h-full sm:mb-10 max-lg:mb-10">
          <div className="w-full relative">
            <div
              ref={scrollableDivRef}
              id="scrollableDiv"
              className={`w-full mt-2 flex flex-col-reverse
              
                gap-4 overflow-auto ${
                  activeThreadData?.status === "archived" &&
                  "justify-center items-center"
                } `}
              style={{
                height: `calc(100vh - ${textAreaHeight + dynamicHeight}px )`,
              }}
            >
              {chatListLoading && <ChatListSkeleton />}

              {!chatListLoading && activeThreadData && (
                <InfiniteScroll
                  dataLength={chatList?.length || 0}
                  next={getChatListsOnScroll}
                  hasMore={hasMore}
                  loader={
                    <div className="w-full h-16 flex flex-row justify-center items-center">
                      {chatList?.length > 50 && (
                        <ButtonSpinner loading={true} />
                      )}
                    </div>
                  }
                  endMessage={
                    <p className="w-full flex flex-row justify-center items-center">
                      {chatFilters?.page > 1 && (
                        <span className="text-chatNoMessage text-sm font-normal">
                          No earlier messages.
                        </span>
                      )}
                    </p>
                  }
                  // scrollThreshold={0.2}
                  inverse={true}
                  scrollableTarget="scrollableDiv"
                  initialScrollY={0}
                  onScroll={() => {
                    const scrollableDiv =
                      document.getElementById("scrollableDiv");
                    if (scrollableDiv) {
                      setScrollFromBottom(scrollableDiv?.scrollTop);
                    }
                  }}
                  style={{
                    display: "flex",
                    flexDirection: "column-reverse",
                    width: "100%",
                  }}
                >
                  {chatList?.map((item: IChatList, index: number) => {
                    const isExpanded: string = expandedMessages[item?.id];

                    const messageToDisplay = item?.message || "";

                    const formattedMessage = isExpanded
                      ? messageToDisplay
                      : messageToDisplay.slice(0, 240);

                    // const messageWithLineBreaks = formattedMessage
                    //   .split("\n")
                    //   .map((line, index, arr) => {
                    //     return (
                    //       <span key={index}>
                    //         {line}
                    //         {index < arr.length - 1 && <br />}
                    //       </span>
                    //     );
                    //   });

                    // const currentMessageDate = dayjs(item?.createdAt).format(
                    //   "DD-MM-YYYY"
                    // );

                    // const prevMessageDate =
                    //   index > 0
                    //     ? dayjs(chatList[index - 1]?.createdAt).format(
                    //         "DD-MM-YYYY"
                    //       )
                    //     : null;
                    // const shouldShowDateHeader =
                    //   currentMessageDate !== prevMessageDate;

                    // console.log(
                    //   shouldShowDateHeader,
                    //   currentMessageDate,
                    //   "shouldShowDateHeader"
                    // );

                    return (
                      <div className="w-full mt-4" key={index}>
                        {/* {shouldShowDateHeader && (
                          <div className="flex justify-center items-center my-2 absolute top-1 left-0 w-full">
                            <p className="bg-grey-11 text-sm text-white px-3 py-1 text-bold rounded-18">
                              {currentMessageDate}
                            </p>
                          </div>
                        )} */}
                        <div
                          className={`w-full flex flex-col my-30px ${
                            profileData?.id !== item?.userId
                              ? "items-end"
                              : "item-start"
                          }`}
                          key={index}
                        >
                          <div
                            className={`${
                              profileData?.id !== item?.userId
                                ? "rounded-t-lg rounded-bl-lg bg-chatListBg"
                                : "rounded-b-lg rounded-tr-lg bg-grey-11"
                            } px-5 py-3 text-base font-normal w-fit max-w-80%`}
                          >
                            <div>
                              <Linkify
                                componentDecorator={customLinkifyDecorator}
                              >
                                <p className="text-white break-words whitespace-pre-wrap">
                                  {formattedMessage?.trim()}
                                  {/* {messageWithLineBreaks} */}
                                  {!isExpanded &&
                                    item?.message?.length > 240 &&
                                    "..."}
                                </p>
                                {item?.message?.length > 240 && (
                                  <p
                                    className={`${
                                      profileData?.id !== item?.userId
                                        ? "text-lightBlack"
                                        : "text-smallBlue"
                                    }  cursor-pointer`}
                                    onClick={() =>
                                      toggleMessageLength(item?.id)
                                    }
                                  >
                                    {isExpanded ? " read less" : " read more"}
                                  </p>
                                )}
                              </Linkify>
                            </div>
                          </div>
                          <p className="text-grey font-normal text-xs">
                            {dayjs(item?.createdAt).format("h:mm A")}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </InfiniteScroll>
              )}

              {!chatListLoading && !activeThreadData && (
                <div className="w-full max-lg:hidden h-80">
                  <div className="flex flex-col justify-start items-center gap-3 h-full">
                    <img src={noMessage} alt="noMessage" />
                    <h1 className="text-2xl font-semibold text-white">
                      No Messages, yet
                    </h1>
                    <p className="text-lg font-normal text-grey">
                      No message in your inbox.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {scrollFromBottom < 0 && (
              <div className="w-full bg-transparent absolute bottom-0 left-0 flex flex-row justify-center items-center group">
                <button
                  onMouseOver={() => setIsHoveringIcon(true)}
                  onMouseOut={() => setIsHoveringIcon(false)}
                  className="bg-secondary cursor-pointer border-2 w-8 h-8 rounded-full hover:bg-transparent hover:border-skyBlue flex flex-col justify-center items-center"
                  onClick={() => {
                    ChatListScrollToBottom();
                    setTimeout(() => {
                      setIsHoveringIcon(false);
                    }, 1000);
                  }}
                >
                  <span>
                    <DropDownDark isHoveringIcon={isHoveringIcon} />
                    <DropDownLight isHoveringIcon={isHoveringIcon} />
                  </span>
                </button>
              </div>
            )}
          </div>

          {activeThreadData && (
            <div
              className={`mt-2 w-full p-0.5 rounded-sm shadow-md ${
                msgInput.trim().length <= 1000 &&
                "bg-gradient-to-l from-teal-400 via-indigo-500 to-pink-500 "
              }`}
            >
              <div
                className={`bg-darkBlack w-full rounded-sm shadow-md border ${
                  msgInput.trim().length > 1000
                    ? " border-rose-600"
                    : "border-lightGrey"
                }  text-white flex justify-between items-center`}
              >
                <div className="h-full w-full flex justify-between items-end pr-2 pl-5 py-2">
                  <div className="w-full mr-5 h-full pb-0 mb-0">
                    <TextareaAutosize
                      // ref={textareaRef}
                      autoFocus
                      minRows={1}
                      maxRows={4}
                      className="bg-transparent outline-none w-full border-none text-chatText mr-3 h-full text-area-scrollbar"
                      placeholder="Write something.."
                      value={msgInput}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setMsgInput(e.target.value)
                      }
                      onHeightChange={(height: number) => {
                        setTextAreaHeight(height);
                      }}
                      onKeyDown={(e) => {
                        if (isLargeDevice) {
                          if (e.key === "Enter" && e.shiftKey) {
                            // Shift + Enter: do nothing (or handle specific behavior if needed)
                          } else if (e.key === "Enter") {
                            e.preventDefault();
                            if (
                              !isSubmitting &&
                              msgInput.trim().length > 0 &&
                              msgInput.trim().length <= 1000
                            ) {
                              smgSubmitHandler();
                            }
                          }
                        }
                      }}
                    />
                  </div>
                  <button
                    disabled={
                      isSubmitting ||
                      !msgInput ||
                      msgInput.trim().length === 0 ||
                      msgInput.trim().length > 1000
                    }
                    onClick={() => {
                      msgInput?.trim().length > 0 &&
                        msgInput?.trim().length <= 1000 &&
                        smgSubmitHandler();
                    }}
                    className={`
                      flex justify-center items-center rounded-50% w-9 h-9 ${
                        msgInput?.trim().length > 0 &&
                        msgInput?.trim().length <= 1000
                          ? "bg-white"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                  >
                    <SendIcon />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatList;
