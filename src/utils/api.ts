import isEmpty from "lodash/isEmpty";
import queryString from "query-string";

export const API_CONFIG = {
  baseUrl: `${process.env.REACT_APP_BASE_URL}`, //
  //all the api endpoints goes here
  path: {
    signUp: "auth/signup",
    login: "auth/login",
    sendVerificationMail: "auth/verification/resend-code",
    emailVerification: "auth/verification/verify-code",
    forgotPassword: "auth/forgot-password",
    resetPassword: "auth/reset-password",
    feeds: "feeds",
    categories: "categories",
    profile: "account/me",
    editProfile: "account/edit",
    changePassword: "account/change-password",
    signUrl: "account/sign-url",
    createJob: "job/create",
    myJob: "job",
    influencerJobs: "creator/jobs",
    jobPostProposal: "feeds/proposals",
    feedProposals: "feeds/user-proposal",
    threadsInit: "threads/init",
    allThreads: "threads",
    youtubeCallbackUrl: "integrations/youtube/callback-url",
    review: "reviews",
    youtubeConnect: "integrations/youtube/connect",
    youtubeSync: "integrations/youtube/sync",
    ProfileReview: "profile/reviews",
    sendMessage: "chat",
    chatList: "events",
    instagramCallbackUrl: "integrations/instagram/callback-url",
    instagramConnect: "integrations/instagram/connect",
    instagramSync: "integrations/instagram/sync",
    instagramProfile: "integrations/instagram/profile",
    lastReadAt: "thread/lastReadAt",
  },
};

export const getUrl = (url: string, params = {}) => {
  if (!url.includes("https")) {
    let urlString = `${API_CONFIG.baseUrl}/${url}`; //add api url here
    if (params && !isEmpty(params)) {
      urlString += `?${queryString.stringify(params)}`;
    }
    return urlString;
  }
  return url;
};
