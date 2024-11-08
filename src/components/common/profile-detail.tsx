import { Link, useLocation } from "react-router-dom";
import bgImage from "../../assets/images/common/businessProfile.png";
import editProfileResponsive from "../../assets/images/common/edit_profile_responsive_profile.png";
import vectorProfile from "../../assets/images/common/vector-profile.png";
import profileResponsiveIcon from "../../assets/images/common/profile-responsive-icon.png";
import ProfileRating from "./profile-rating";
import Slider from "react-slick";
import vectorActive from "../../assets/images/common/verified.png";
import DangerTriangle from "../../assets/images/svg/danger-triangle";
import ProfileSliderIcon from "../../assets/images/svg/profile-slider-icon";

const ProfileDetail: React.FC<any> = ({ activeProfileData }) => {
  const location = useLocation();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight: true,
    nextArrow: (
      <span className="md:hidden max-sm:w-6">
        <ProfileSliderIcon />
      </span>
    ),
  };

  return (
    <>
      <div className="border-1 border-customBlue rounded-25 max-lg:h-auto shadow-custom-inner hidden lg:block bg-profileBg">
        <div className="relative">
          <div className="w-full h-265 lg:rounded-18">
            <img
              src={
                activeProfileData?.coverImageUri
                  ? activeProfileData?.coverImageUri
                  : bgImage
              }
              loading="lazy"
              alt="cover_image"
              className="h-full w-full !rounded-tr-25 !rounded-tl-25"
            />
          </div>
          {location?.pathname === "/profile" && (
            <Link to="/edit-profile">
              <div className="absolute top-8 right-6 ">
                <div className="sm:w-180 sm:h-41  bg-gray-200 hover:shadow-custom-hover cursor-pointer bg-custom-gradient rounded-500 text-white font-semibold text-base leading-18.77 flex justify-center items-center">
                  Edit Profile
                </div>
              </div>
            </Link>
          )}
        </div>
        <div className="p-4 flex gap-8">
          <div className="relative sm:w-250 top-[-140px] left-[35px] sm:h-250 rounded-18  border-1 border-profileRed  bg-smallBlue">
            {activeProfileData?.profileImageUri && (
              <img
                src={activeProfileData?.profileImageUri}
                className="avtProfile m-0 p-0 h-full w-full"
                loading="lazy"
                alt="profile-img"
              />
            )}
            {!activeProfileData?.profileImageUri && (
              <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
                <h1 className="text-2xl text-white">
                  {activeProfileData?.name
                    ? activeProfileData?.name.charAt(0).toUpperCase()
                    : ""}
                </h1>
              </div>
            )}
          </div>
          <div className="w-3/4 flex flex-col gap-4 mb-3 ms-12">
            <div className="flex justify-between">
              <div className="flex flex-col gap-2 pt-2">
                <div className="flex flex-col gap-2">
                  <div className="flex gap-1 items-center">
                    <div className="text-2xl font-medium leading-28.15 text-mediumViolet capitalize">
                      {activeProfileData?.name
                        ? activeProfileData?.name
                        : activeProfileData?.email}
                      {/* {activeProfileData?.dateOfBirth && ","}{" "}
                      {dayjs().diff(activeProfileData?.dateOfBirth, "years")} */}
                    </div>
                    {/* {activeProfileData?.status === "active" ? (
                      <div className="flex items-center">
                        <img
                          loading="lazy"
                          src={vectorActive}
                          alt="vector_profile"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center ml-1">
                        <img
                          loading="lazy"
                          src={vectorProfile}
                          alt="vector_profile"
                        />
                      </div>
                    )} */}
                  </div>
                  {activeProfileData?.city && (
                    <div className="font-normal text-xl leading-23.46 text-mediumViolet mt-2 capitalize">
                      <span className="capitalize">
                        {activeProfileData?.city},
                      </span>{" "}
                      <span className="capitalize">
                        {activeProfileData?.state},
                      </span>{" "}
                      <span className="capitalize">
                        {activeProfileData?.country}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-start gap-1 pr-8">
                <ProfileRating profileData={activeProfileData} />
              </div>
            </div>
            <div className="lg:w-590 leading-30.24 text-lg font-normal text-mediumBlue text-left">
              {activeProfileData?.about
                ? activeProfileData?.about
                : location?.pathname === "/profile" && (
                    <p className="leading-30.24 text-lg font-normal text-mediumBlue text-left">
                      Your profile is not completed yet, please complete your
                      profile{" "}
                      <span className="inline-block">
                        <DangerTriangle />
                      </span>{" "}
                      of adding your personal info as well sync your social
                      media accounts,so it will help you to get job early
                    </p>
                  )}
            </div>
            <div>
              <div className="flex flex-wrap  gap-4 ">
                {activeProfileData?.categories?.map(
                  (category: string, index: number) => (
                    <div
                      className="flex justify-center items-center gap-4"
                      key={index}
                    >
                      <div className=" ">
                        <p className="category-text capitalize category">
                          {category}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* for mobile screen */}
      <div className="relative lg:hidden">
        <div className="-z-1">
          <div className="w-full h-180">
            <img
              src={
                activeProfileData?.coverImageUri
                  ? activeProfileData?.coverImageUri
                  : editProfileResponsive
              }
              loading="lazy"
              alt="cover_image"
              className="h-full w-full"
            />
          </div>
        </div>
        <div className="lg:hidden">
          <div className="relative ">
            {location?.pathname === "/profile" && (
              <Link to="/edit-profile">
                <div className="absolute right-4 ">
                  <div className="w-105 h-32 -mt-40 bg-custom-gradient bg-gray-200 hover:shadow-custom-hover cursor-pointer rounded-500 text-white font-semibold text-sm leading-18.77 flex justify-center items-center">
                    Edit profile
                  </div>
                </div>
              </Link>
            )}
          </div>
          <div className="absolute top-5 left-3 sm:hidden block">
            <Link to="/">
              <img
                src={profileResponsiveIcon}
                alt="profile"
                loading="lazy"
                className="w-8 h-8 rounded-500 rounded-tr-none rounded-tl-none object-cover"
              />
            </Link>
          </div>
        </div>
        <div className="sm:p-6 bg-profileBg">
          <div className="-mt-70px relative w-130 h-130 mx-auto bg-smallBlue avtProfile border-1 border-profileRed">
            {activeProfileData?.profileImageUri && (
              <img
                src={activeProfileData?.profileImageUri}
                className="avtProfile w-full"
                loading="lazy"
                alt="profile-img"
              />
            )}
            {!activeProfileData?.profileImageUri && (
              <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
                <h1 className="text-2xl  text-white">
                  {activeProfileData?.name
                    ? activeProfileData?.name.charAt(0).toUpperCase()
                    : ""}
                </h1>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3 w-full mt-4">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col justify-center items-center">
                <div className="flex gap-1 justify-center">
                  <div className="text-22 text-center font-medium text-mediumViolet">
                    {activeProfileData?.name}
                  </div>
                  {activeProfileData?.status === "active" ? (
                    <div className="flex items-center ml-1">
                      <img
                        loading="lazy"
                        src={vectorActive}
                        alt="vector_profile"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <img
                        loading="lazy"
                        src={vectorProfile}
                        alt="vector_profile"
                      />
                    </div>
                  )}
                </div>
                {activeProfileData?.state && (
                  <div className="font-normal max-lg:text-center text-base leading-18.77 text-mediumViolet">
                    <span className="capitalize">
                      {activeProfileData?.state},
                    </span>{" "}
                    <span className="capitalize">
                      {activeProfileData?.city},
                    </span>{" "}
                    <span className="capitalize">
                      {activeProfileData?.country}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="sm:px-0 px-4 text-base text-center font-normal text-mediumBlue">
              {activeProfileData?.about
                ? activeProfileData?.about
                : location?.pathname === "/profile" && (
                    <p className="text-base text-center font-normal text-mediumBlue">
                      {" "}
                      Your profile is not completed yet, please complete your
                      profile{" "}
                      <span className=" inline-block">
                        <DangerTriangle />
                      </span>{" "}
                      of adding your personal info as well sync your social
                      media accounts,so it will help you to get job early
                    </p>
                  )}
            </div>
            <div className="flex gap-2 m-auto justify-center items-center px-4 scroll-smooth">
              {/* Desktop View */}
              <div className="hidden lg:flex">
                <div className="flex flex-wrap gap-4 justify-center">
                  {activeProfileData?.categories?.map(
                    (category: string, index: number) => (
                      <div
                        className="flex justify-center items-center gap-4"
                        key={index}
                      >
                        <div>
                          <p className="category-text capitalize">{category}</p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Mobile View */}
              <div className="flex gap-2 m-auto justify-center items-center">
                <div className="flex justify-center items-center px-4 w-300 category-slider profile-arrow">
                  {/* Slider for mobile view */}
                  {activeProfileData?.categories?.length >= 3 && (
                    <Slider {...settings} className="w-full lg:hidden">
                      {activeProfileData?.categories?.map(
                        (category: string, index: number) => (
                          <div
                            className="flex justify-center items-center gap-4 w-10"
                            key={index}
                          >
                            <div className="category ml-10">
                              <p className="category-text capitalize">
                                {category}
                              </p>
                            </div>
                          </div>
                        )
                      )}
                    </Slider>
                  )}

                  {/* Display categories directly if less than 3 */}
                  {activeProfileData?.categories?.length < 3 && (
                    <div className="flex justify-start items-center gap-2">
                      {activeProfileData?.categories?.map(
                        (category: string, index: number) => (
                          <div
                            className="flex justify-center items-center gap-4"
                            key={index}
                          >
                            <div className="category">
                              <p className="category-text capitalize">
                                {category}
                              </p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-col items-center gap-1 ">
                <div>
                  <ProfileRating profileData={activeProfileData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileDetail;
