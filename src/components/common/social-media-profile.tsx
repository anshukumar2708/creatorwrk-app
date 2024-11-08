import { useLocation, useNavigate } from "react-router-dom";
import bagImageResponsive from "../../assets/images/common/bag-responsive-image.png";
import socialImageResponsive from "../../assets/images/common/youtube-responsive-image.png";
import instagramImageResponsive from "../../assets/images/common/social-responsive-image.png";
import verified from "../../assets/images/common/verified.png";
import bagProfile from "../../assets/images/common/bag-image.png";
import instagram_profile_image from "../../assets/images/common/instagram-profile-image.png";
import socialProfileImage from "../../assets/images/common/social-profile-image.png";
import emailIcon from "../../assets/images/common/email-icon.png";
import phoneIcon from "../../assets/images/common/phone-icon.png";

const SocialMediaProfile: React.FC<any> = ({ activeProfileData }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-profileBg border-1 border-customGray p-8  w-full lg:rounded-18 hidden md:block">
        <div className="flex flex-col gap-6">
          {location?.pathname === "/profile" && (
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <div className="flex items-center">
                  <img src={emailIcon} loading="lazy" alt="email_icon" />
                </div>
                <div className="font-normal text-lg leading-21.11 text-mediumViolet flex items-center">
                  {activeProfileData?.email}
                </div>
                {activeProfileData?.status === "active" && (
                  <div className="flex items-center">
                    <img src={verified} loading="lazy" alt="verified" />
                  </div>
                )}
              </div>
            </div>
          )}

          {location?.pathname === "/profile" && (
            <div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <div>
                    <img src={phoneIcon} loading="lazy" alt="email_icon" />
                  </div>
                  <div className="font-normal text-lg leading-21.11 text-mediumViolet flex items-center">
                    {activeProfileData?.phoneNumber ?? "NA"}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeProfileData?.userType === "creator" && (
            <div className="h-0.5 bg-white opacity-20"></div>
          )}

          {activeProfileData?.userType === "creator" ? (
            <div className="flex gap-8">
              <div className="flex items-center">
                <img src={bagProfile} loading="lazy" alt="bag_profile" />
              </div>
              <div className="flex flex-col">
                <div className="font-normal text-lg leading-29.16 text-mediumBlue">
                  Completed Jobs
                </div>
                <div className="text-white text-lg font-normal leading-29.16">
                  {activeProfileData?.creator?.completedJobs
                    ? activeProfileData?.creator?.completedJobs
                    : 0}
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full flex justify-between">
              <div className="flex flex-col">
                <div className="font-normal text-lg leading-29.16 text-mediumBlue">
                  Posted Jobs
                </div>
                <div className="text-white text-lg font-normal leading-29.16">
                  {activeProfileData?.businessOwner?.postedJobs ?? 0}
                </div>
              </div>
              <div>
                <div className="flex items-center">
                  <img src={bagProfile} loading="lazy" alt="bag_profile" />
                </div>
              </div>
            </div>
          )}
          {activeProfileData?.userType === "creator" && (
            <>
              <div className="flex">
                <div className="w-1/2 flex gap-8 justify-start items-center">
                  <div className="w-12 h-48 flex justify-center">
                    <img
                      src={instagram_profile_image}
                      loading="lazy"
                      alt="instagram_profile_image"
                    />
                  </div>
                  <div className="text-white font-medium text-xl leading-23.46 flex items-center">
                    Instagram
                  </div>
                </div>
                <div className="w-1/2 flex">
                  <div className="w-2/5 flex flex-col">
                    <p className="text-base font-normal leading-18.77 text-mediumViolet">
                      Followers
                    </p>
                    <p className="text-white font-medium text-3xl">
                      {activeProfileData?.creator?.instagramDetails
                        ?.followers ?? 0}{" "}
                    </p>
                  </div>
                  <div className="w-3/5 flex justify-between">
                    <div>
                      {" "}
                      <p className="text-base font-normal leading-18.77 text-mediumViolet">
                        Following
                      </p>
                      <p className="text-white font-medium text-3xl">
                        {" "}
                        {activeProfileData?.creator?.instagramDetails
                          ?.following ?? 0}{" "}
                      </p>
                    </div>
                    {location?.pathname === "/profile" && (
                      <button
                        onClick={() =>
                          navigate(`/social-account?socialType=instagram`)
                        }
                        disabled={
                          activeProfileData?.creator?.instagramDetails
                            ?.lastSynced
                        }
                        className={`w-109 h-41 rounded-500 ${
                          activeProfileData?.creator?.instagramDetails
                            ?.lastSynced
                            ? "text-green border-lightGreen"
                            : "text-white border-gray-300 hover:bg-largeGrey"
                        }  text-base leading-18.77 font-medium border-1  `}
                      >
                        {activeProfileData?.creator?.instagramDetails
                          ?.lastSynced
                          ? "Connected"
                          : "Connect"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex">
                <div className="w-1/2 flex gap-8 justify-start items-center">
                  <div className="w-50 flex justify-start">
                    <img
                      src={socialProfileImage}
                      alt="social_profile_image"
                      loading="lazy"
                    />
                  </div>
                  <div className="text-white font-medium text-xl leading-23.46 flex items-center">
                    Youtube
                  </div>
                </div>
                <div className="w-1/2 flex ">
                  <div className="w-2/5 flex flex-col ">
                    <div className="text-base font-normal leading-18.77 text-mediumViolet">
                      Subscriber
                    </div>
                    <div className="text-white font-medium text-3xl">
                      {activeProfileData?.creator?.youtubeDetails
                        ?.youtubeSubscribers ?? 0}
                    </div>
                  </div>
                  <div className="w-3/5 flex justify-between">
                    <div>
                      <div className="text-base font-normal leading-18.77 text-mediumViolet">
                        Videos
                      </div>
                      <div className="text-white font-medium text-3xl">
                        {activeProfileData?.creator?.youtubeDetails
                          ?.youtubeVideos ?? 0}
                      </div>
                    </div>
                    <div>
                      {location?.pathname === "/profile" && (
                        <button
                          onClick={() =>
                            navigate(`/social-account?socialType=youtube`)
                          }
                          disabled={
                            activeProfileData?.creator?.youtubeDetails
                              ?.lastSynced
                          }
                          className={`w-109 h-41 rounded-500 ${
                            activeProfileData?.creator?.youtubeDetails
                              ?.lastSynced
                              ? "text-green border-lightGreen"
                              : "text-white border-gray-300 hover:bg-largeGrey"
                          }  text-base leading-18.77 font-medium border-1`}
                        >
                          {activeProfileData?.creator?.youtubeDetails
                            ?.lastSynced
                            ? "Connected"
                            : "Connect"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="md:hidden">
        <div className="flex flex-col gap-6 bg-profileBg">
          {location?.pathname === "/profile" && (
            <>
              <div className="border_class mt-6"></div>
              <div className="pl-4 flex flex-col justify-start items-start gap-3">
                <div className="flex gap-2">
                  <div className="flex items-center">
                    <img src={emailIcon} loading="lazy" alt="email_icon" />
                  </div>
                  <div className="font-normal text-lg leading-21.11 text-mediumViolet flex items-center">
                    {activeProfileData?.email}
                  </div>
                  {activeProfileData?.status === "active" && (
                    <div className="flex items-center">
                      <img src={verified} loading="lazy" alt="verified" />
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <img src={phoneIcon} loading="lazy" alt="phone_icon" />
                  <div className="font-normal text-lg leading-21.11 text-mediumViolet flex items-center">
                    {activeProfileData?.phoneNumber ?? "NA"}
                  </div>
                </div>
              </div>
            </>
          )}
          {activeProfileData?.userType === "business_owner" && (
            <div
              className={`w-full px-4 flex flex-row justify-between items-center ${
                location?.pathname.startsWith("/business-owner-profile")
                  ? "mt-5"
                  : " "
              }`}
            >
              <div className="flex flex-col gap-2">
                <div className="text-white font-medium text-lg leading-21.11">
                  Posted Jobs
                </div>
                <div className="font-medium text-lg leading-21.11 text-white">
                  {activeProfileData?.businessOwner?.postedJobs ?? 0}
                </div>
              </div>
              <img
                src={bagImageResponsive}
                loading="lazy"
                alt="bag_image_responsive"
              />
            </div>
          )}
          {activeProfileData?.userType === "creator" && (
            <>
              <div className="border_class"></div>
              <div className="flex justify-between px-4">
                <div className="flex flex-col gap-2">
                  <div className="text-white font-medium text-lg leading-21.11">
                    Completed Jobs
                  </div>
                  <div className="font-medium text-lg leading-21.11 text-white">
                    {activeProfileData?.creator?.completedJobs}
                  </div>
                </div>
                <div className="flex items-center">
                  <img
                    src={bagImageResponsive}
                    loading="lazy"
                    alt="bag_image_responsive"
                  />
                </div>
              </div>
              <div className="px-4 ">
                <div className="border_class"></div>
              </div>
              <div className="flex justify-between px-4">
                <div className="flex flex-col gap-6">
                  <div className="flex gap-6">
                    <div className="text-white font-medium text-lg leading-21.11">
                      Instagram
                    </div>
                    <div>
                      {location?.pathname === "/profile" && (
                        <button
                          onClick={() =>
                            navigate(`/social-account?socialType=instagram`)
                          }
                          disabled={
                            activeProfileData?.creator?.instagramDetails
                              ?.lastSynced
                          }
                          className={`w-109 h-32 rounded-500 ${
                            activeProfileData?.creator?.instagramDetails
                              ?.lastSynced
                              ? "text-green border-lightGreen"
                              : "text-white border-gray-300 hover:bg-largeGrey"
                          }  text-base leading-18.77 font-medium border-1  `}
                        >
                          {activeProfileData?.creator?.instagramDetails
                            ?.lastSynced
                            ? "Connected"
                            : "Connect"}
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-8">
                    <div>
                      {" "}
                      <p className="font-normal leading-18.77 text-base text-mediumViolet">
                        Followers
                      </p>
                      <p className="font-medium text-lg leading-21.11 text-white">
                        {activeProfileData?.creator?.instagramDetails
                          ?.followers ?? 0}{" "}
                      </p>
                    </div>
                    <div>
                      {" "}
                      <p className="font-normal leading-18.77 text-base text-mediumViolet">
                        Following
                      </p>
                      <p className="font-medium text-lg leading-21.11 text-white">
                        {activeProfileData?.creator?.instagramDetails
                          ?.following ?? 0}{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <img
                    src={instagramImageResponsive}
                    loading="lazy"
                    alt="instagram_image_responsive"
                  />
                </div>
              </div>
              <div className="px-4">
                <div className="border_class "></div>
              </div>
              <div className="flex justify-between px-4">
                <div className="flex flex-col gap-6">
                  <div className="flex gap-10">
                    <div className="text-white font-medium text-lg leading-21.11">
                      Youtube
                    </div>
                    <div>
                      {location?.pathname === "/profile" && (
                        <button
                          onClick={() =>
                            navigate(`/social-account?socialType=youtube`)
                          }
                          disabled={
                            activeProfileData?.creator?.youtubeDetails
                              ?.lastSynced
                          }
                          className={`w-109 h-32 rounded-500 ${
                            activeProfileData?.creator?.youtubeDetails
                              ?.lastSynced
                              ? "text-green border-lightGreen"
                              : "text-white border-gray-300 hover:bg-largeGrey"
                          }  text-base leading-18.77 font-medium border-1  `}
                        >
                          {activeProfileData?.creator?.youtubeDetails
                            ?.lastSynced
                            ? "Connected"
                            : "Connect"}
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-8">
                    <div>
                      {" "}
                      <div className="font-normal leading-18.77 text-base text-mediumViolet">
                        Subscriber
                      </div>
                      <div className="font-medium text-lg leading-21.11 text-white">
                        {activeProfileData?.creator?.youtubeDetails
                          ?.youtubeSubscribers ?? 0}
                      </div>
                    </div>
                    <div>
                      {" "}
                      <div className="font-normal leading-18.77 text-base text-mediumViolet">
                        Videos
                      </div>
                      <div className="font-medium text-lg leading-21.11 text-white">
                        {activeProfileData?.creator?.youtubeDetails
                          ?.youtubeVideos ?? 0}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <img
                    src={socialImageResponsive}
                    loading="lazy"
                    alt="social  responsive"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SocialMediaProfile;
