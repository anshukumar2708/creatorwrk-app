export interface IThreads {
  user: IUser;
  id: string;
  proposalId: string;
  updatedAt: string;
  isJobAssigned: boolean;
  unReadMessageCount: number;
  lastMessage: IMessages;
  jobs: IJobs;
  lastReadAt: string | null;
  fromThread: string;
  status: string;
  senderName: string;
}
export interface IActiveThread {
  user: IUser;
  id: string;
  jobId: string;
  jobStatus: string;
  proposalId: string;
  updatedAt: string;
  isJobAssigned: boolean;
  slug?: string;
  title: string;
  isJobCompleted?: boolean;
  assignedUserId?: string;
  isReviewed: boolean;
  isBusinessOwnerReviewed: boolean;
  isCreatorReviewed: boolean;
  status: string;
  reviews: IReviews;
  threadDetails: IThreadDetails;
}
export interface IUser {
  id: string;
  name: string;
  profileImageUri: string;
  slug: string;
}

export interface IThreadDetails {
  threadId: string;
  threadStatus: string;
}

export interface IMessages {
  lastMessageId: string;
  lastMessage: string;
  lastCreatedAt: string;
  lastSenderId: string;
}

export interface IJobs {
  jobId: string;
  jobTitle: string;
  slug: string;
}

export interface IReviews {
  creatorReview: {
    fromUserId: string;
    review: number;
    description: string;
  };
  businessOwnerReview: {
    fromUserId: string;
    review: number;
    description: string;
  };
}

export type IComponentDecorator = (
  href: string,
  text: string,
  key: number
) => React.ReactNode;

export interface IChatList {
  id: string;
  userId: string;
  message: string;
  threadId: string;
  createdAt: string;
  lastReadAt?: string;
}

export interface IMessageItem {
  threadId: string;
  senderId: string;
  userId: string;
  message: string;
  metaData: string;
  messageType?: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
}

export interface IEventStream {
  message: IMessageItem;
  eventType: string;
}
