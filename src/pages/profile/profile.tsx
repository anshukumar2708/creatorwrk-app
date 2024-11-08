import Footer from "../../components/common/footer";
import ProfileDetail from "../../components/common/profile-detail";
import SocialMediaProfile from "../../components/common/social-media-profile";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import HttpService from "../../services/http.service";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { API_CONFIG } from "../../utils/api";
import { State } from "../../interfaces/store";
import { IProfile } from "../../interfaces/profile";
import { createAction } from "../../utils/common";
import * as actionTypes from "../../store-items/action-types";
import dayjs from "dayjs";
import rightArrowIcon from "../../../src/assets/images/common/arrow-right.png";
import ProfileSkeleton from "../../components/skeleton/skeleton-profile";

const Profile = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeProfileData, setActiveProfileData] = useState<IProfile | null>(
    null
  );
  const profileData: any = useSelector(
    (state: State) => state?.profile?.profile
  );
  // Time 24 hours ago from now
  const twentyFourHoursAgoFormate = dayjs().subtract(24, "hours");

  const twentyFourHoursAgo = (date: string) => {
    return dayjs(date).isBefore(twentyFourHoursAgoFormate);
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [location?.pathname]);

  useEffect(() => {
    const getPublicProfileData = async () => {
      try {
        if (location.pathname !== "/profile") {
          const response = await HttpService.get(`profile/${slug}/view`);
          const userData = response?.data;
          if (response) {
            setActiveProfileData(userData);
          }
        } else {
          setActiveProfileData(profileData);
        }
      } catch (error) {
        console.log(error);
        navigate("/not-found");
      }
    };
    getPublicProfileData();
  }, [location.pathname, slug, profileData, navigate]);

  const allowYouTubeSyncApi =
    location.pathname === "/profile" &&
    profileData?.userType === "creator" &&
    profileData?.creator?.youtubeDetails?.lastSynced &&
    twentyFourHoursAgo(profileData?.creator?.youtubeDetails?.lastSynced);

  const allowInstagramSyncApi =
    location.pathname === "/profile" &&
    profileData?.userType === "creator" &&
    profileData?.creator?.instagramDetails?.lastSynced &&
    twentyFourHoursAgo(profileData?.creator?.instagramDetails?.lastSynced);

  const getYoutubeSyncData = useCallback(async () => {
    try {
      if (allowYouTubeSyncApi) {
        const syncResponse = await HttpService.get(API_CONFIG.path.youtubeSync);
        if (syncResponse && syncResponse.data) {
          dispatch(
            createAction(actionTypes.GET_PROFILE_DATA, {
              ...profileData,
              creator: {
                ...profileData.creator,
                ...syncResponse.data,
              },
            })
          );
        }
      }
    } catch (error) {
      console.error("Error syncing YouTube data:", error);
    }
  }, [allowYouTubeSyncApi, profileData, dispatch]);

  const getInstagramSyncData = useCallback(async () => {
    try {
      if (allowInstagramSyncApi) {
        const syncResponse = await HttpService.get(
          API_CONFIG.path.instagramSync
        );
        if (syncResponse) {
          dispatch(
            createAction(actionTypes.GET_PROFILE_DATA, {
              ...profileData,
              creator: {
                ...profileData?.creator,
                ...syncResponse?.data,
              },
            })
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [allowInstagramSyncApi, profileData, dispatch]);

  useEffect(() => {
    getYoutubeSyncData();
  }, []);

  useEffect(() => {
    getInstagramSyncData();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full z-40 max-sm:bg-profileBg">
        <div
          className={`pb-16  m-auto flex flex-col max-md:px-0 profile_edit max-w-1140 w-full ${
            location?.pathname === "/profile" ? "lg:gap-4" : "gap-6"
          }`}
        >
          <div className="hidden sm:block">
            <div className="flex gap-2 profile-breadcrumb">
              <Link
                to="/"
                className="font-normal cursor-pointer text-lg leading-21.11 text-mediumViolet "
              >
                Home
              </Link>
              <div className="cursor-pointer">
                <img src={rightArrowIcon} loading="lazy" alt="icon" />
              </div>
              <div className="font-normal text-lg cursor-pointer leading-21.11 text-mediumViolet opacity-50">
                View Profile
              </div>
            </div>
          </div>

          {isLoading && (
            <ProfileSkeleton activeProfileData={activeProfileData} />
          )}

          {!isLoading && (
            <>
              <ProfileDetail activeProfileData={activeProfileData} />
              <SocialMediaProfile activeProfileData={activeProfileData} />
            </>
          )}
        </div>
        <div className="container sm:block hidden md:flex justify-center md:mx-5">
          <Footer />
        </div>
      </div>
    </>
  );
};
export default Profile;
