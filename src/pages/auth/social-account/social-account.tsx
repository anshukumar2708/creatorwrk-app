import { useCallback, useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import AuthLayout from "../../../components/auth/auth-layout";
import HttpService from "../../../services/http.service";
import { API_CONFIG } from "../../../utils/api";
import ButtonSpinner from "../../../components/common/button-spinner";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../../interfaces/store";
import { createAction } from "../../../utils/common";
import * as actionTypes from "../../../store-items/action-types";
import InstagramSocialIcon from "../../../assets/images/svg/instagram-social";
import VerifiedGreen from "../../../assets/images/svg/verified-green";
import Youtube from "../../../assets/images/svg/youtube";
import Loader from "../../../components/common/loader";

const SocialAccount = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loadingInstagram, setLoadingInstagram] = useState(false);
  const [loadingYoutube, setLoadingYoutube] = useState(false);
  const [connectLoading, setConnectLoading] = useState(false);
  const ProfileData = useSelector((state: State) => state?.profile?.profile);
  const socialType = searchParams.get("socialType");
  const access_denied = searchParams.get("error_code");
  const access_denied1 = searchParams.get("error");

  // youtube sync
  const youtubeCallBackHandler = useCallback(async () => {
    try {
      setLoadingYoutube(true);
      const response = await HttpService.get(
        API_CONFIG.path.youtubeCallbackUrl
      );
      if (response?.data?.url) {
        navigateToUrl(response.data.url);
      } else {
        console.error("Invalid YouTube callback URL response");
      }
    } catch (error) {
      console.error("Error fetching YouTube data:", error);
    } finally {
      setLoadingYoutube(false);
    }
  }, []);

  const youTubeConnectHandler = useCallback(
    async (code: string) => {
      if (!ProfileData?.creator?.youtubeDetails?.lastSynced) {
        try {
          setConnectLoading(true);
          const connectResponse = await HttpService.get(
            API_CONFIG.path.youtubeConnect,
            { code }
          );
          if (connectResponse?.data) {
            const syncResponse = await HttpService.get(
              API_CONFIG.path.youtubeSync
            );
            if (syncResponse?.data) {
              let updatedUserData = {
                ...ProfileData,
                creator: {
                  ...ProfileData.creator,
                  ...syncResponse?.data,
                },
              };
              if (Object.keys(updatedUserData).length > 0) {
                dispatch(
                  createAction(actionTypes.GET_PROFILE_DATA, updatedUserData)
                );
              }
              navigate(`/successful?successType=youtube-connect`, {
                state: {
                  message: "your account has connected with youtube",
                },
              });
            } else {
              console.error("Invalid YouTube sync response");
            }
          } else {
            console.error("Invalid YouTube connect response");
          }
        } catch (error) {
          console.error("Error handling YouTube code:", error);
        } finally {
          setConnectLoading(false);
        }
      }
    },
    [dispatch, navigate]
  );

  // instagram sync
  const instagramCallBackHandler = useCallback(async () => {
    try {
      setLoadingInstagram(true);
      const response = await HttpService.get(
        API_CONFIG.path.instagramCallbackUrl
      );
      if (response?.data?.url) {
        navigateToUrl(response.data.url);
        console.log("callBack", response.data.url);
      } else {
        console.error("Invalid Instagram callback URL response");
      }
    } catch (error) {
      console.error("Error fetching Instagram data:", error);
    } finally {
      setLoadingInstagram(false);
    }
  }, [setLoadingInstagram]);

  const instagramConnectHandler = useCallback(
    async (code: string) => {
      if (!ProfileData?.creator?.instagramDetails?.lastSynced) {
        try {
          setConnectLoading(true);
          console.log("Instagram code received:", code);
          const connectResponse = await HttpService.get(
            API_CONFIG.path.instagramConnect,
            { code }
          );
          if (connectResponse?.data) {
            let updatedUserData = {
              ...ProfileData,
              creator: {
                ...ProfileData.creator,
                ...connectResponse?.data,
              },
            };
            if (Object.keys(updatedUserData).length > 0) {
              dispatch(
                createAction(actionTypes.GET_PROFILE_DATA, updatedUserData)
              );
            }
            navigate(`/successful?successType=instagram-connect`, {
              state: {
                message: "your account has connected with instagram",
              },
            });
          } else {
            console.error("Invalid Instagram connect response");
          }
        } catch (error) {
          console.error("Error handling Instagram code:", error);
        } finally {
          setConnectLoading(false);
        }
      }
    },
    [dispatch, navigate]
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");
    if (code) {
      const currentUrl = window.location.href;
      if (currentUrl.includes("instagram")) {
        instagramConnectHandler(code);
        console.log("instagram connect", code);
      } else if (currentUrl.includes("youtube")) {
        youTubeConnectHandler(code);
        console.log("youtube connect", code);
      }
    } else {
      console.log("No code parameter found in URL");
    }
  }, [location.search, youTubeConnectHandler, instagramConnectHandler]);

  const navigateToUrl = (url: string) => {
    window.location.href =
      url.startsWith("http://") || url.startsWith("https://")
        ? url
        : `http://localhost:3000/social-account/${url}`;
  };

  useEffect(() => {
    const socialType = window.location.href.includes("instagram")
      ? "instagram-connect"
      : "youtube-connect";
    if (access_denied || access_denied1) {
      navigate(`/social-account/error?errorType=${socialType}`);
    }
  }, [access_denied, access_denied1, navigate]);

  return (
    <AuthLayout>
      {connectLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col">
              <div className="flex flex-col w-full">
                <h1 className="text-lightWhite sm:text-2xl text-xl font-semibold leading-7">
                  Connect with social account
                </h1>
                <h4 className="text-blue text-lg font-normal max-xs:text-sm">
                  Please sync your social media account.
                </h4>
              </div>

              {socialType !== "youtube" &&
                !window.location.href.includes("youtube") && (
                  <button
                    className="social__button my-6"
                    onClick={instagramCallBackHandler}
                    disabled={
                      ProfileData?.creator?.instagramDetails?.lastSynced
                    }
                  >
                    <InstagramSocialIcon />
                    <div className="flex items-center gap-4">
                      {ProfileData?.creator?.instagramDetails?.lastSynced && (
                        <VerifiedGreen />
                      )}
                      <ButtonSpinner loading={loadingInstagram} />
                      {ProfileData?.creator?.instagramDetails?.lastSynced
                        ? "Connected"
                        : "Connect now"}
                    </div>
                  </button>
                )}

              {!socialType &&
                (window.location.href.includes("instagram") ||
                  !window.location.href.includes("youtube")) && (
                  <div className="flex justify-center items-center mb-1">
                    <span className="border-1 border-lightGrey w-xl max-md:w-full"></span>
                  </div>
                )}

              {socialType !== "instagram" &&
                !window.location.href.includes("instagram") && (
                  <button
                    className="social__button my-4"
                    onClick={youtubeCallBackHandler}
                    disabled={ProfileData?.creator?.youtubeDetails?.lastSynced}
                  >
                    <Youtube />
                    <div className="flex items-center gap-4">
                      {ProfileData?.creator?.youtubeDetails?.lastSynced && (
                        <VerifiedGreen />
                      )}
                      <ButtonSpinner loading={loadingYoutube} />
                      {ProfileData?.creator?.youtubeDetails?.lastSynced
                        ? "Connected"
                        : "Connect now"}
                    </div>
                  </button>
                )}

              <p className="text-blue text-base max-xs:text-sm font-normal leading-6 max-w-388 text-center">
                Sync your Instagram and YouTube account so brand owners can see
                your account statistics.
              </p>
            </div>

            <div className="mt-4">
              <Link to="/" className="skip-para hover:text-smallBlue">
                Skip now
              </Link>
            </div>
          </div>
        </div>
      )}
    </AuthLayout>
  );
};

export default SocialAccount;
