import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import InnerLayout from "../../components/common/inner-layout";
import { SearchOutlined } from "@ant-design/icons";
import HttpService from "../../services/http.service";
import { API_CONFIG } from "../../utils/api";
import {
  IActiveThread,
  IChatList,
  IEventStream,
  IMessageItem,
  IThreads,
} from "../../interfaces/message";
import { debounce } from "../../utils/helper";
import ThreadsListing from "../../components/common/Chat/threads-listing";
import ThreadUserDetails from "../../components/common/Chat/thread-user-details";
import ChatList from "../../components/common/Chat/chat-list";
import { IFilters } from "../../interfaces/common";
import { useMediaQuery } from "@uidotdev/usehooks";
import { CHAT_BASE_URL } from "../../assets/locales/constant";
import Loader from "../../components/common/loader";
import { useSelector } from "react-redux";
import { State } from "../../interfaces/store";

const Message = () => {
  const currentUserId: string = useSelector(
    (state: State) => state?.profile?.profile?.id
  );

  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [threadData, setThreadsData] = useState<IThreads[]>([]);
  const [threadLoading, setThreadLoading] = useState<boolean>(true);
  const [isThreadDetailsLoading, setIsThreadDetailsLoading] = useState(true);
  const [threadReset, setThreadReset] = useState<boolean>(true);
  const [chatListReset, setChatListReset] = useState<boolean>(false);
  const [threadSearchQuery, setThreadSearchQuery] = useState<boolean>(false);
  const [msgInput, setMsgInput] = useState<string>("");
  const [newThreadListLoading, setNewThreadListLoading] =
    useState<boolean>(false);
  const isSmallDevice = useMediaQuery("only screen and (max-width : 1023px)");
  const isLargeDevice = useMediaQuery("only screen and (min-width : 1024px)");
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const urlThreadId = query.get("threadId");
  const [activeThreadData, setActiveThreadData] =
    useState<IActiveThread | null>(null);
  const [filters, setFilters] = useState<IFilters>({
    page: 1,
    perPage: 20,
    orderBy: "DESC",
    searchQuery: "",
  });

  // chat list
  const pageComponentRef = useRef<boolean>(true);
  const unreadCountRef = useRef(0); // Keep track of unread message count
  const originalTitle = useRef(document.title); // Store the original title
  const eventStreamLock = useRef(false); // Lock for preventing multiple subscriptions
  const [isDisconnected, setIsDisconnected] = useState(false); // Track if disconnected
  const controllerRef = useRef<AbortController | null>(null); // Explicitly type the ref
  const [isManuallyAborted, setIsManuallyAborted] = useState(false); // State to track manual abort
  const [eventStreamData, setEventStreamData] = useState<IEventStream | null>(
    null
  );
  const [chatList, setChatList] = useState<IChatList[]>([]);
  const [chatListLoading, setChatListLoading] = useState<boolean>(true);
  let token = localStorage.getItem("token");
  const [chatFilters, setChatFilters] = useState<IFilters>({
    page: 1,
    perPage: 50,
    orderBy: "DESC",
  });

  const canCallLastReadAtMethod = (item: IThreads): boolean => {
    return (
      !!item &&
      !!item?.lastMessage &&
      item.lastMessage.lastSenderId !== currentUserId &&
      item.lastMessage.lastCreatedAt !== item.lastReadAt
    );
  };

  useEffect(() => {
    return () => {
      pageComponentRef.current = false;
      // console.log(">>>>unmounted");
    };
  }, []);

  useEffect(() => {
    if (activeThreadId) {
      navigate(`/message?threadId=${activeThreadId}`, {
        replace: true,
      });
    } else {
      // navigate("/message", {
      //   replace: true,
      // });
    }
  }, [activeThreadId, navigate]);

  useEffect(() => {
    setActiveThreadId(urlThreadId ? urlThreadId : null);
    setEventStreamData(null);
  }, [urlThreadId]);

  const setActiveThreadIdForDesktop = useCallback(
    (newThreadId: string) => {
      if (isLargeDevice && !urlThreadId && !activeThreadId && !!newThreadId) {
        console.log("Data:-------", newThreadId);
        setActiveThreadId(newThreadId);
      }
    },
    [isLargeDevice, activeThreadId, urlThreadId]
  );

  useEffect(() => {
    if (
      !activeThreadId &&
      isLargeDevice &&
      !urlThreadId &&
      threadData?.length > 0 &&
      !!threadData[0]?.id
    ) {
      setActiveThreadIdForDesktop(threadData[0]?.id);
    }
  }, [
    threadData,
    urlThreadId,
    activeThreadId,
    isLargeDevice,
    setActiveThreadIdForDesktop,
  ]);

  useEffect(() => {
    if (!activeThreadId || !threadData.length) {
      return;
    }

    let lastReadMessageUpdateCall: NodeJS.Timer;

    if (activeThreadId) {
      // TODO : disable reinit set interval
      lastReadMessageUpdateCall = setInterval(async () => {
        const callableApis = threadData
          .filter(
            (threadData: IThreads) =>
              threadData.id === activeThreadId &&
              canCallLastReadAtMethod(threadData)
          )
          .map((item: IThreads) => sendBulkLastReadAtApi(item));

        if (callableApis.length) {
          const threadLastReadUpdatedLists = await Promise.all(callableApis);

          const updatedLists: {
            [index: string]: {
              lastReadAt: string;
            };
          } = {};

          threadLastReadUpdatedLists
            .filter((item: any) => !!item?.id && !!item?.lastReadAt)
            .reduce((acc: any, item: any) => {
              // Update the accumulator with the current item's data
              acc[item.id] = { lastReadAt: item.lastReadAt };
              return acc;
            }, updatedLists);

          setThreadsData([
            ...threadData.map((item) => {
              if (
                !!updatedLists?.[item.id] &&
                !!updatedLists[item.id]?.lastReadAt
              ) {
                return {
                  ...item,
                  lastReadAt: updatedLists[item.id]?.lastReadAt,
                };
              }
              return item;
            }),
          ]);
        }
      }, 3000);
    }

    // Cleanup interval on component unmount
    return () =>
      lastReadMessageUpdateCall && clearInterval(lastReadMessageUpdateCall);
  }, [threadData, activeThreadId, setThreadsData]);

  const sendBulkLastReadAtApi = async (
    threadData: IThreads
  ): Promise<{
    id?: string;
    lastReadAt?: string;
  }> => {
    const output = {
      id: undefined,
      lastReadAt: undefined,
    };
    try {
      const response = await HttpService.post(
        `${API_CONFIG.path.lastReadAt}?threadIds=${threadData.id}`
      );

      output.id = response?.data.length ? response?.data[0]?.id : undefined;
      output.lastReadAt = response?.data.length
        ? response?.data[0]?.lastReadAt
        : undefined;
      // output.lastReadAt = response?.data?.lastReadAt;
    } catch (error: any) {
      console.log("error", error);
    }
    return output;
  };

  // fetch threads Details  from API
  const getActiveThreadsDetails = async (threadId?: string) => {
    setIsThreadDetailsLoading(true);
    if (activeThreadId === threadId) {
      try {
        const { data } = await HttpService.post(`thread/${threadId}/details`);
        setActiveThreadData(data);
        setChatListReset(true);
        setChatFilters((prevFilters) => ({
          ...prevFilters,
          page: 1,
        }));
      } catch (error) {
        console.log("Failed to fetch thread details:", error);
        navigate("/not-found");
      } finally {
        setIsThreadDetailsLoading(false);
      }
    } else {
      setIsThreadDetailsLoading(false);
    }
  };

  const syncJobData = async (messageData: IMessageItem, tid: string | null) => {
    console.log("activeThreadId", tid, messageData);
    // TODO: critical - active thraed id not found sometime. need fix @anshu
    const exists = threadData.some(
      (item: IThreads) => item.id === messageData.threadId
    );

    let data: any = null;
    if (!exists || messageData?.messageType !== "NM") {
      const apiRes = await HttpService.post(
        `thread/${messageData.threadId}/details`
      );
      data = apiRes.data;
    }

    if (!data) {
      console.log("skip syncJobData");

      return;
    }

    try {
      const items = exists
        ? [...threadData]
        : [
            {
              user: data.user,
              id: data.proposalId,
              jobId: data.jobId,
              assignedUserId: data?.assignedUserId,
              proposalId: data.proposalId,
              status: data.threadDetails.threadStatus,
              updatedAt: data.updatedAt,
              // TODO: Ask pratik to provide lastReadAt in thread detail api
              lastReadAt: data.lastReadAt,
              fromThread: "",
              toThread: "",
              jobs: {
                jobId: data.jobId,
                jobTitle: data.title,
                slug: data.slug,
                status: data.jobStatus,
              },
              lastMessage: data.lastMessage,
            } as any,
            ...threadData,
          ];

      const updatedSyncThreadList: any = items.map((item: IThreads) => {
        if (messageData.threadId === item.id) {
          console.log("data  updating in thread list", data, messageData);
          return {
            ...item,
            assignedUserId: data?.assignedUserId,
            lastMessage: data.lastMessage,
            ...(data.lastMessage.lastSenderId !== currentUserId
              ? { lastReadAt: data.lastReadAt }
              : {}),
            status: data.threadDetails.threadStatus,
            jobs: {
              ...item.jobs,
              status: data.jobStatus,
            },
          };
        }
        return item;
      });
      console.log("updatedSyncThreadList------", updatedSyncThreadList);
      if (updatedSyncThreadList.length) {
        setThreadsData(updatedSyncThreadList);
      }

      if (
        !!data &&
        tid === messageData.threadId &&
        messageData?.messageType !== "NM"
      ) {
        setActiveThreadData(data);
      }
    } catch (e) {}
  };

  // fetch threads data API
  const getThreadsData = useCallback(async () => {
    setNewThreadListLoading(true);
    try {
      const response = await HttpService.get(
        `${API_CONFIG.path.allThreads}?page=${filters?.page}&perPage=${filters?.perPage}&orderBy=${filters?.orderBy}&search=${filters?.searchQuery}`
      );
      if (response) {
        setHasMore(response?.data?.pagination?.hasNext);
        if (threadReset) {
          setThreadsData(response?.data.items);
        } else {
          setThreadsData((prevData: any) => [
            ...prevData,
            ...response?.data.items,
          ]);
        }
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setThreadLoading(false);
      setNewThreadListLoading(false);
    }
  }, [filters, threadReset, setThreadsData]);

  // // fetch initially threads data API
  useEffect(() => {
    getThreadsData();
  }, [getThreadsData]);

  // fetch threads data on scroll down
  const fetchThreadsOnScroll = () => {
    if (hasMore) {
      setThreadReset(false);
      setFilters({
        ...filters,
        page: (filters.page += 1),
      });
    }
  };

  // fetch threads data on search
  const searchThreadHandler = debounce((searchQuery: string) => {
    if (searchQuery?.length >= 3) {
      setThreadLoading(true);
      setThreadReset(true);
      setFilters({
        ...filters,
        page: 1,
        searchQuery,
      });
    } else if (searchQuery?.length === 0) {
      setThreadLoading(true);
      setThreadReset(true);
      setFilters({
        ...filters,
        page: 1,
        searchQuery: "",
      });
    }
  });

  console.log("activeThreadId", activeThreadId);

  // initially call thread details api
  useEffect(() => {
    if (activeThreadId) {
      getActiveThreadsDetails(activeThreadId);
      // TODO: disabled due to backend dependencies. once pratik provide lastMessage data in thread detail api then we will reenabled.
      // setIsThreadListInitialLoad(false);
    } else {
      setIsThreadDetailsLoading(false);
    }
  }, [activeThreadId]);

  // Chat component
  const updateTitleWithUnreadCount = () => {
    if (document.hidden && unreadCountRef.current > 0) {
      document.title = `New Messages (${unreadCountRef.current})`;
    } else {
      document.title = originalTitle.current;
      unreadCountRef.current = 0; // Reset unread count when tab is active
    }
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState === "visible") {
      updateTitleWithUnreadCount();
      console.log("visible screen");
    } else if (document.visibilityState === "hidden") {
      console.log("[MESSAGE LISTENER] Abort here too");
      console.log("hide screen");
    }
  };

  useEffect(() => {
    if (!eventStreamData) {
      return;
    }
    if (document.hidden) {
      unreadCountRef.current += 1; // Increment unread count if the tab is not active
      updateTitleWithUnreadCount(); // Update title with unread count
    }

    console.log("activeThreadId 1111", activeThreadId);

    if (eventStreamData?.message) {
      syncJobData(eventStreamData?.message, activeThreadId);
    }
  }, [eventStreamData, activeThreadId]);

  const handleNewEventMessage = (parsedData: IEventStream) => {
    // TODO: Collect messages and put in queue and then set event data in interval like every 1second interval
    // This will reduce rerendering
    // console.debug(`[MESSAGE LISTENER] Received:`, parsedData);
    if (parsedData?.eventType === "message") {
      setEventStreamData(parsedData);
    }
  };

  const subscribeToEventStream = (note: string) => {
    console.log(`[MESSAGE LISTENER] method calling: mode:${note}`, {
      isManuallyAborted,
      isDisconnected,
    });
    if (isManuallyAborted || eventStreamLock.current) {
      console.log(`[MESSAGE LISTENER] method skipped: mode:${note}`, {
        isManuallyAborted,
        isDisconnected,
      });
      return;
    } // Prevent resubscription if manually aborted
    eventStreamLock.current = true; // Set the lock
    console.trace(`[MESSAGE LISTENER] method triggerred: mode:${note}`, {
      visibilityState: document.visibilityState,
      hidden: document.hidden,
      isDisconnected,
      isManuallyAborted,
    });

    controllerRef.current = new AbortController(); // Create a new AbortController instance
    const { signal } = controllerRef.current; // Get the abort signal

    fetchEventSource(`${CHAT_BASE_URL}/events`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
      openWhenHidden: true,
      signal: signal, // Pass the signal to the fetchEventSource
      onopen: async (response: any) => {
        setIsDisconnected(false); // Mark as connected
        // TODO: Add logic for refresh messages in background
        // Handle connection open event
        console.log(
          `[MESSAGE LISTENER] Started - mode:${note} status:${response.status}`
        );
      },
      onmessage(event) {
        const parsedData = JSON.parse(event.data);
        handleNewEventMessage(parsedData);
      },
      onclose() {
        eventStreamLock.current = false; // Release the lock
        console.log(`[MESSAGE LISTENER] Stopped - mode:${note}`);
        if (
          !isManuallyAborted &&
          pageComponentRef.current &&
          !document.hidden
        ) {
          subscribeToEventStream("ON_CLOSE_RESUBSCRIBED_INIT"); // Resubscribe if not manually aborted and tab is active
        } else {
          setIsDisconnected(true); // Mark as disconnected
        }
      },
      onerror(err) {
        console.error(
          `[MESSAGE LISTENER] Error - mode:${note} networkFailure:${
            err === "network error" ? "Yes" : "No"
          } error:${err}`
        );
        eventStreamLock.current = false; // Release the lock
        if (
          controllerRef.current &&
          controllerRef.current instanceof AbortController
        ) {
          setIsManuallyAborted(true); // Mark as manually aborted on cleanup
          controllerRef.current.abort(); // Abort the current fetchEventSource
        }
        setIsDisconnected(true);
      },
    });
  };

  // call API for connect event stream
  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    subscribeToEventStream("initial subscribe"); // Subscribe to the event stream on component mount
    return () => {
      console.log("component unmounting");
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (controllerRef.current) {
        setIsManuallyAborted(true); // Mark as manually aborted on cleanup
        (controllerRef.current as AbortController).abort(); // Abort the current fetchEventSource
      }
    };
  }, []);

  // update chat listing on every event stream
  const updateChatList = useCallback(
    debounce((message: any, tid: string) => {
      setChatList((prevMessages: any) => [message, ...prevMessages]);
    }, 1000),
    [setChatList]
  );

  useEffect(() => {
    if (
      eventStreamData &&
      activeThreadId === eventStreamData?.message?.threadId
    ) {
      updateChatList(eventStreamData.message, activeThreadId);
      // todo set null eventStreamData
    }
  }, [updateChatList, eventStreamData, activeThreadId]);

  // update thread listing on every event stream
  // TODO: CRITICAL remove debounce
  const updateThreadsData = useCallback(
    debounce(async () => {
      if (eventStreamData) {
        setThreadsData((prevThreadsData) => {
          return prevThreadsData.map((item) => {
            if (item.id === eventStreamData.message.threadId) {
              return {
                ...item,
                // lastReadAt: response?.data?.lastReadAt,
                lastMessage: {
                  ...item.lastMessage,
                  lastMessage: eventStreamData.message.message,
                  lastCreatedAt: eventStreamData.message.createdAt,
                  lastSenderId: eventStreamData.message.senderId,
                },
              };
            }
            return item;
          });
        });
      }
    }, 1000),
    [eventStreamData, activeThreadId]
  );

  // update thread listing on every event stream
  useEffect(() => {
    updateThreadsData();
  }, [updateThreadsData]);

  return (
    <InnerLayout>
      {/* content for large screen */}
      {isLargeDevice && (
        <div className="flex justify-center max-lg:flex-col items-start w-full message-screen">
          <div
            className={`thread-list lg:w-eSmall w-full md:py-5 ${
              activeThreadData ? "max-lg:hidden" : ""
            }`}
          >
            <div className="lg:mx-3">
              <div
                className={`w-full p-0.5 ${
                  threadSearchQuery
                    ? "bg-gradient-to-l from-teal-400 via-indigo-500 to-pink-500 rounded-4xl"
                    : " "
                }  `}
              >
                <div className="max-lg:z-1 h-12 bg-profileBg pl-3 pr-1.5 py-5 rounded-sm shadow-md border-6 border-grey text-white flex items-center">
                  <input
                    className="bg-transparent outline-none border-none text-mediumViolet w-full"
                    placeholder="Search"
                    onChange={(e) => {
                      searchThreadHandler(e.target.value);
                    }}
                    onFocus={() => setThreadSearchQuery(true)}
                    onBlur={() => setThreadSearchQuery(false)}
                  />
                  <div className="bg-white flex justify-center items-center rounded-50% w-9 h-9 p-1">
                    <SearchOutlined
                      width={30}
                      style={{ color: "black", fontSize: "20px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col pt-4 max-md:pb-10">
              <ThreadsListing
                threadLoading={threadLoading}
                threadsData={threadData}
                fetchThreadsOnScroll={fetchThreadsOnScroll}
                activeThreadId={activeThreadId}
                setMsgInput={setMsgInput}
                newThreadListLoading={newThreadListLoading}
                filters={filters}
                setChatListLoading={setChatListLoading}
              />
            </div>
          </div>

          <div className="chat-list lg:w-eLarge w-full lg:border-l-1 lg:border-l-secondary max-md:-mt-7 flex flex-col justify-center items-center">
            <div className="w-full flex justify-between items-center sticky top-0 h-20 py-3 md:px-4 border-b-1 border-grey">
              <ThreadUserDetails
                getThreadsData={getThreadsData}
                activeThreadData={activeThreadData}
                setActiveThreadData={setActiveThreadData}
                getActiveThreadsDetails={getActiveThreadsDetails}
                isThreadDetailsLoading={isThreadDetailsLoading}
                setChatList={setChatList}
              />
            </div>
            <div className="flex flex-col justify-center items-center md:px-4 w-full">
              <ChatList
                activeThreadData={activeThreadData}
                chatFilters={chatFilters}
                setChatFilters={setChatFilters}
                chatListReset={chatListReset}
                setChatListReset={setChatListReset}
                msgInput={msgInput}
                setMsgInput={setMsgInput}
                chatList={chatList}
                setChatList={setChatList}
                chatListLoading={chatListLoading}
                setChatListLoading={setChatListLoading}
              />
            </div>
          </div>
        </div>
      )}
      {/* content for mobile screen */}

      {isSmallDevice && urlThreadId && activeThreadId && !activeThreadData && (
        <div>
          <Loader />
        </div>
      )}

      {isSmallDevice && (
        <div className="flex justify-center max-lg:flex-col items-start w-full message-screen">
          {!urlThreadId && !activeThreadId && !activeThreadData && (
            <div
              className={`thread-list lg:w-eSmall w-full md:py-5 ${
                activeThreadData ? "max-lg:hidden" : ""
              }`}
            >
              <div className="lg:mx-3 pt-2">
                <div
                  className={`w-full p-0.5 ${
                    threadSearchQuery
                      ? "bg-gradient-to-l from-teal-400 via-indigo-500 to-pink-500 rounded-4xl"
                      : " "
                  }  `}
                >
                  <div className="max-lg:z-1 h-12 bg-darkBlack pl-3 pr-1.5 py-5 rounded-sm shadow-md border-6 border-grey text-white flex items-center">
                    <input
                      className="bg-transparent outline-none border-none text-mediumViolet w-full"
                      placeholder="Search"
                      onChange={(e) => {
                        searchThreadHandler(e.target.value);
                      }}
                      onFocus={() => setThreadSearchQuery(true)}
                      onBlur={() => setThreadSearchQuery(false)}
                    />
                    <div className="bg-white flex justify-center items-center rounded-50% w-9 h-9 p-1">
                      <SearchOutlined
                        width={30}
                        style={{ color: "black", fontSize: "20px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col pt-4 max-md:pb-10">
                <ThreadsListing
                  threadLoading={threadLoading}
                  threadsData={threadData}
                  fetchThreadsOnScroll={fetchThreadsOnScroll}
                  activeThreadId={activeThreadId}
                  setMsgInput={setMsgInput}
                  newThreadListLoading={newThreadListLoading}
                  filters={filters}
                  setChatListLoading={setChatListLoading}
                />
              </div>
            </div>
          )}

          {!!activeThreadData && (
            <div
              className={`chat-list lg:w-eLarge w-full lg:border-l-1 lg:border-l-secondary max-md:mt-0 flex flex-col justify-center items-center ${
                activeThreadData ? " " : "hidden"
              } `}
            >
              <div
                className={`w-full ${
                  activeThreadData ? "block" : "lg:block hidden"
                } `}
              >
                <div className="w-full flex justify-between items-center sticky top-0 h-20 py-3 md:px-4 border-b-1 border-grey">
                  <ThreadUserDetails
                    getThreadsData={getThreadsData}
                    activeThreadData={activeThreadData}
                    setActiveThreadData={setActiveThreadData}
                    getActiveThreadsDetails={getActiveThreadsDetails}
                    isThreadDetailsLoading={isThreadDetailsLoading}
                    setChatList={setChatList}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center items-center md:px-4 w-full max-lg:mb-1">
                <ChatList
                  activeThreadData={activeThreadData}
                  chatFilters={chatFilters}
                  setChatFilters={setChatFilters}
                  chatListReset={chatListReset}
                  setChatListReset={setChatListReset}
                  msgInput={msgInput}
                  setMsgInput={setMsgInput}
                  chatList={chatList}
                  setChatList={setChatList}
                  chatListLoading={chatListLoading}
                  setChatListLoading={setChatListLoading}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </InnerLayout>
  );
};
export default Message;
