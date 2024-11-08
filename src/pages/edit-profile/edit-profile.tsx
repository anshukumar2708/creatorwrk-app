import { useEffect, useState, useRef } from "react";
import rightArrowIcon from "../../../src/assets/images/common/arrow-right.png";
import { Link, useNavigate } from "react-router-dom";
import { DatePicker, Form, Select, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../interfaces/store";
import HttpService from "../../services/http.service";
import { API_CONFIG } from "../../utils/api";
import profileResponsiveIcon from "../../assets/images/common/profile-responsive-icon.png";
import editProfileResponsive from "../../assets/images/common/edit_profile_responsive_profile.png";
import Footer from "../../components/common/footer";
import { uploadFileToS3 } from "../../components/common/image-upload/image-upload";
import { createAction } from "../../utils/common";
import * as actionTypes from "../../store-items/action-types";
import UploadProfileImage from "../../components/common/profile/image-upload-profile";
import dayjs from "dayjs";
import CoverUploadProfile from "../../components/common/profile/cover-upload-profile";
import bgImage from "../../assets/images/common/businessProfile.png";
import { FormValues } from "../../interfaces/profile";
import ButtonSpinner from "../../components/common/button-spinner";
import SelectArrowIcon from "../../assets/images/common/selectarrow";
import ProfileIcon from "../../assets/images/common/profile";
import PhoneIcon from "../../assets/images/common/phone";
import { useNotificationToaster } from "../../hooks/use-notification-toaster";
import { handleDropdownVisibility } from "../../utils/helper";

const EditProfile = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<any>(null);
  const [coverImageFile, setCoverImageFile] = useState<any>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const stateData = useSelector((state: State) => state);

  const [imageErrorMsg, setImageErrorMsg] = useState<string | null>(null);
  const { categories, profile } = stateData;
  const categoryOptions = categories?.categories?.map((item) => ({
    label: item.name.charAt(0).toUpperCase() + item.name.slice(1),
    value: item.name.toLowerCase(),
  }));
  const [submittable, setSubmittable] = useState(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const notify = useNotificationToaster();

  const initialValuesRef = useRef({});

  const values = Form.useWatch([], form);

  useEffect(() => {
    if (form && values) {
      form.validateFields({ validateOnly: true }).then(
        () => {
          setSubmittable(
            JSON.stringify(values) !== JSON.stringify(initialValuesRef.current)
          );
        },
        () => {
          setSubmittable(false);
        }
      );
    }
  }, [values, form]);

  // Store initial form values
  useEffect(() => {
    initialValuesRef.current = form.getFieldsValue();
  }, [form]);

  useEffect(() => {
    if (profile) {
      form.setFieldsValue({
        name: profile?.profile.name,
        number: profile?.profile?.phoneNumber?.slice(3),
        gender: profile.profile.gender,
        dob: profile.profile.dateOfBirth
          ? dayjs(profile.profile.dateOfBirth)
          : undefined,
        category: profile.profile.categories,
        country: profile.profile.country,
        state: profile.profile.state,
        city: profile.profile.city,
        about: profile.profile.about,
      });
    }
  }, [profile, form]);

  const formSubmitHandler = async (values: FormValues) => {
    if (!imageFile && !profile.profile.profileImageUri) {
      setLoading(false);
      setImageErrorMsg("Please Select Profile Image");
      return;
    }
    setLoading(true);
    const payload: any = {
      name: values.name,
      phoneNumber: `+91${values.number}`,
      gender: values.gender,
      dateOfBirth: values.dob,
      categories: values.category,
      country: values.country,
      state: values.state,
      city: values.city,
      about: values.about,
    };

    try {
      if (imageFile && imageFile.size > 1024 * 1024) {
        setImageErrorMsg("Image size must be less than 1MB!");
        setLoading(false);
        return;
      }

      if (coverImageFile && coverImageFile.size > 1024 * 1024) {
        setImageErrorMsg("Image size must be less than 1MB!");
        setLoading(false);
        return;
      }

      if (imageFile) {
        setLoading(true);
        const res = await HttpService.post(API_CONFIG.path.signUrl, {
          ProfileImage: imageFile.type,
        });
        if (res) {
          setLoading(false);
          const profileImageResponse: string = await uploadFileToS3(
            res?.data?.profileImage,
            imageFile
          );
          if (profileImageResponse) {
            payload[
              "profileImage"
            ] = `${profileImageResponse}?v=${new Date().getTime()}`;
          }
        }
      }
      if (coverImageFile && coverImageFile.size > 1024 * 1024) {
        setImageErrorMsg("Image must be less than 1MB!");
        setLoading(false);
        return;
      }
      if (coverImageFile) {
        setImageErrorMsg(null);

        const res = await HttpService.post(API_CONFIG.path.signUrl, {
          BannerImage: coverImageFile.type,
        });
        if (res) {
          const coverImageResponse: string = await uploadFileToS3(
            res?.data?.bannerImage,
            coverImageFile
          );
          console.log(coverImageResponse, " res?.data?.bannerImage,");
          if (coverImageResponse) {
            payload[
              "coverImage"
            ] = `${coverImageResponse}?v=${new Date().getTime()}`;
          }
        }
      }
      const updateProfileResponse = await HttpService.patch(
        API_CONFIG.path.editProfile,
        {
          ...payload,
        }
      );
      if (updateProfileResponse) {
        dispatch(
          createAction(
            actionTypes.GET_PROFILE_DATA,
            updateProfileResponse?.data
          )
        );
        setLoading(false);
        localStorage.setItem("updateProfile", "updateProfile");
        // message.success("Your profile has been updated!");
        navigate("/profile");
        notify("success", "Your profile has been updated!");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  let coverImagePreview: any;
  if (coverImageFile) {
    coverImagePreview = URL.createObjectURL(coverImageFile);
  }

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!loading) {
      form.submit();
    }
  };

  return (
    <div className="flex flex-col justify-center z-40 items-center w-full">
      <div className="max-sm:px-0 profile_edit max-w-1140 w-full">
        <div className="w-full">
          <div className="hidden sm:block">
            <div className="flex gap-2 pb-4">
              <Link
                to="/profile"
                className="font-normal cursor-pointer  text-lg leading-21.11 text-mediumViolet "
              >
                Profile
              </Link>
              <div className="cursor-pointer">
                <img src={rightArrowIcon} loading="lazy" alt="icon" />
              </div>
              <div className="font-normal text-lg  cursor-pointer leading-21.11 text-mediumViolet opacity-50">
                Edit profile
              </div>
            </div>
          </div>
          <div className="bg-darkBlack border-1 sm:mb-16 mb-2 shadow-custom sm:border-customGray sm:rounded-18">
            <div className="flex flex-col gap-4">
              <div className="relative sm:hidden">
                <div className="w-full h-180">
                  <img
                    src={
                      coverImagePreview
                        ? coverImagePreview
                        : profile?.profile?.coverImageUri ??
                          editProfileResponsive
                    }
                    alt="cover"
                    loading="lazy"
                    className="h-full w-full "
                  />
                </div>
                <div className="absolute top-4 left-4">
                  <div>
                    <Link to="/profile">
                      <img
                        src={profileResponsiveIcon}
                        alt="profile"
                        loading="lazy"
                        className="w-8 h-8 rounded-500  object-cover"
                      />
                    </Link>
                  </div>
                </div>
                <div className="absolute top-2 right-4">
                  <CoverUploadProfile
                    setCoverImageFile={setCoverImageFile}
                    setIsEdit={setIsEdit}
                  />
                </div>
              </div>
              <div className="relative hidden sm:block">
                <div className="w-full max-h-265">
                  <img
                    className="w-full max-h-265 rounded-18"
                    src={
                      coverImagePreview
                        ? coverImagePreview
                        : profile?.profile?.coverImageUri ?? bgImage
                    }
                    loading="lazy"
                    alt="cover "
                  />
                </div>
                <div className="absolute top-4 right-6">
                  <CoverUploadProfile
                    setCoverImageFile={setCoverImageFile}
                    setIsEdit={setIsEdit}
                  />
                </div>
              </div>
              <div>
                <div className="sm:max-w-552 w-full p-4 sm:p-0 flex flex-col m-auto justify-center items-center gap-4">
                  <div className="flex md:justify-between  justify-center w-full -mt-[6rem] max-sm:-mt-32">
                    <div className="md:w-1/2">
                      <h1 className="text-white text-lg mt-[6rem] hidden md:block">
                        Upload profile
                      </h1>
                    </div>
                    <div>
                      <div className=" flex justify-end flex-col">
                        <UploadProfileImage
                          profileData={profile?.profile}
                          setImageFile={setImageFile}
                          setIsEdit={setIsEdit}
                          setImageErrorMsg={setImageErrorMsg}
                        />
                        {imageErrorMsg && (
                          <div className="text-red-500 mt-5">
                            {imageErrorMsg}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="w-full mt-7">
                    <Form
                      form={form}
                      autoComplete="off"
                      onFinish={(values) => formSubmitHandler(values)}
                      className="flex flex-col justify-center items-center gap-5 w-full"
                      onChange={() => {
                        setIsEdit(true);
                      }}
                    >
                      <Form.Item
                        name="name"
                        className="w-full text-base justify-between"
                        validateTrigger={["onBlur", "onChange"]}
                        rules={[
                          { required: true, message: "Name is required" },
                          {
                            pattern: /^[A-Za-z\s]+$/,
                            message: "Only letters (A-Z, a-z) are allowed!",
                          },
                          {
                            pattern: /^(?!\s+$).*$/,
                            message: "Blank spaces are not allowed!",
                          },
                          {
                            min: 3,
                            message: "Name must be greater then 3 Character!",
                          },
                          {
                            max: 25,
                            message: "Name must be less then 25 Character!",
                          },
                        ]}
                      >
                        <Space.Compact className="select-container">
                          <input
                            style={{ width: "100%" }}
                            placeholder="kiran"
                            className="bg-transparent text-base text-white"
                            defaultValue={profile?.profile.name}
                          />
                          <ProfileIcon />
                        </Space.Compact>
                      </Form.Item>
                      <Form.Item
                        name="number"
                        className="w-full text-base"
                        validateTrigger={["onBlur", "onChange"]}
                        rules={[
                          {
                            required: true,
                            message: "Mobile Number is required",
                          },
                          {
                            pattern: /^[0-9]{10}$/,
                            message: "Mobile Number must be exactly 10 digits",
                          },
                          {
                            pattern: /^(?!\s+$).*$/,
                            message: "Blank spaces are not allowed!",
                          },
                        ]}
                      >
                        <Space.Compact className="select-container">
                          <input
                            style={{ width: "12%" }}
                            defaultValue="+91"
                            disabled
                            className="text-white bg-transparent text-base"
                          />
                          <span className="number-divider"></span>
                          <input
                            type="number"
                            style={{ width: "88%" }}
                            placeholder="Number*"
                            className="pl-3 bg-transparent text-base text-white"
                            defaultValue={profile?.profile?.phoneNumber?.slice(
                              3
                            )}
                          />
                          <PhoneIcon />
                          {/* <img src={phoneIcon} alt="phoneIcon" /> */}
                        </Space.Compact>
                      </Form.Item>
                      <Space.Compact className="w-full flex  justify-between items-center gap-5 pb-0 mb-0">
                        <Form.Item
                          name="gender"
                          className="w-1/2 !sm:w-48 text-base"
                          validateTrigger={["onBlur", "onChange"]}
                          rules={[
                            { required: true, message: "Gender is required" },
                            {
                              pattern: /^(?!\s+$).*$/,
                              message: "Blank spaces are not allowed!",
                            },
                          ]}
                        >
                          <Select
                            size="large"
                            className="select-container w-full text-white"
                            onChange={() => {
                              setIsEdit(true);
                            }}
                            placeholder={
                              <span className="text-blue w-full text-base">
                                Gender*
                              </span>
                            }
                            options={[
                              { value: "male", label: "Male" },
                              { value: "female", label: "Female" },
                            ]}
                            suffixIcon={
                              <>
                                <SelectArrowIcon />
                              </>
                            }
                            onDropdownVisibleChange={handleDropdownVisibility}
                          />
                        </Form.Item>
                        <Form.Item
                          name="dob"
                          className="w-1/2 !sm:w-48 text-base"
                          validateTrigger={["onBlur", "onChange"]}
                          rules={[
                            {
                              required: true,
                              message: "Date of Birth is required",
                            },
                            {
                              pattern: /^(?!\s+$).*$/,
                              message: "Blank spaces are not allowed!",
                            },
                          ]}
                        >
                          <DatePicker
                            placeholder="DOB*"
                            size="large"
                            className="w-full text-blue text-base"
                            // maxDate={dayjs()}
                            allowClear={false}
                            style={{ color: "#8688A5" }}
                            suffixIcon={<SelectArrowIcon />}
                            value={
                              form.getFieldValue("dob")
                                ? dayjs(form.getFieldValue("dob"))
                                : undefined
                            }
                            onChange={(date) => {
                              form.setFieldsValue({ dob: date });
                              console.log(date);
                              setIsEdit(true);
                            }}
                            disabledDate={(current) => {
                              return current && current > dayjs().endOf("day");
                            }}
                            onOpenChange={handleDropdownVisibility}
                          />
                        </Form.Item>
                      </Space.Compact>
                      <Form.Item
                        name="category"
                        className="w-full text-base"
                        validateTrigger={["onBlur", "onChange"]}
                        rules={[
                          { required: true, message: "Category is required" },
                          {
                            pattern: /^(?!\s+$).*$/,
                            message: "Blank spaces are not allowed!",
                          },
                        ]}
                      >
                        <Select
                          mode="multiple"
                          size="large"
                          className="select-container"
                          onChange={() => {
                            setIsEdit(true);
                          }}
                          placeholder={
                            <span
                              style={{ padding: 0 }}
                              className="text-blue w-full text-base"
                            >
                              Category*
                            </span>
                          }
                          style={{ width: "100%" }}
                          options={categoryOptions}
                          suffixIcon={<SelectArrowIcon />}
                          onDropdownVisibleChange={handleDropdownVisibility}
                        />
                      </Form.Item>
                      <Form.Item
                        name="country"
                        className="w-full text-base"
                        validateTrigger={["onBlur", "onChange"]}
                        rules={[
                          { required: true, message: "Country is required" },
                          {
                            pattern: /^(?!\s+$).*$/,
                            message: "Blank spaces are not allowed!",
                          },
                        ]}
                      >
                        <Select
                          size="large"
                          className="select-container"
                          onChange={() => {
                            setIsEdit(true);
                          }}
                          placeholder={
                            <span className="text-blue text-base">
                              Country*
                            </span>
                          }
                          style={{ width: "100%" }}
                          options={[{ value: "india", label: "India" }]}
                          suffixIcon={<SelectArrowIcon />}
                          onDropdownVisibleChange={handleDropdownVisibility}
                        />
                      </Form.Item>
                      <Form.Item
                        name="state"
                        className="w-full text-base"
                        validateTrigger={["onBlur", "onChange"]}
                        rules={[
                          { required: true, message: "State is required" },
                          {
                            pattern: /^(?!\s+$).*$/,
                            message: "Blank spaces are not allowed!",
                          },
                        ]}
                      >
                        <Select
                          size="large"
                          className="select-container"
                          onChange={() => {
                            setIsEdit(true);
                          }}
                          placeholder={
                            <span className="text-blue text-base">State*</span>
                          }
                          options={[{ value: "gujarat", label: "Gujarat" }]}
                          suffixIcon={<SelectArrowIcon />}
                          onDropdownVisibleChange={handleDropdownVisibility}
                        />
                      </Form.Item>
                      <Form.Item
                        name="city"
                        className="w-full text-base"
                        validateTrigger={["onBlur", "onChange"]}
                        rules={[
                          { required: true, message: "City is required" },
                          {
                            pattern: /^(?!\s+$).*$/,
                            message: "Blank spaces are not allowed!",
                          },
                        ]}
                      >
                        <Select
                          placeholder={
                            <span className="text-blue text-base">City*</span>
                          }
                          size="large"
                          className="select-container"
                          onChange={() => {
                            setIsEdit(true);
                          }}
                          options={[
                            { value: "ahmedabad", label: "Ahmedabad" },
                            { value: "surat", label: "Surat" },
                            { value: "rajkot", label: "Rajkot" },
                          ]}
                          suffixIcon={<SelectArrowIcon />}
                          onDropdownVisibleChange={handleDropdownVisibility}
                        />
                      </Form.Item>
                      <Form.Item
                        name="about"
                        className=" border-0 border-b-grey w-full"
                        validateTrigger={["onBlur", "onChange"]}
                        rules={[
                          { required: true, message: "About is required" },
                          {
                            pattern: /^(?!\s+$).*$/,
                            message: "Blank spaces are not allowed!",
                          },
                        ]}
                      >
                        {profile?.profile?.userType === "creator" ? (
                          <TextArea
                            rows={5}
                            placeholder="Passionate storyteller sharing snippets of life's
                                 journey through words and visuals. Exploring the
                                world, one adventure at a time. Lover of art,
                                 culture."
                            maxLength={600}
                            className="!resize-none textarea-placeholder w-full text-base font-normal !bg-transparent !shadow-none p-0 !border-none text-white"
                          />
                        ) : (
                          <TextArea
                            rows={5}
                            placeholder="About*"
                            maxLength={600}
                            className="!resize-none textarea-placeholder w-full text-base font-normal !bg-transparent !shadow-none p-0 !border-none text-white"
                          />
                        )}
                      </Form.Item>
                      <div className="mb-5 w-full ">
                        <div className="flex flex-col justify-center items-center gap-3 ">
                          <div className="flex items-center justify-center w-386 max-sm:w-full max-sm:mt-2">
                            {profile.profile.gender ? (
                              <button
                                onClick={handleButtonClick}
                                disabled={
                                  !submittable || loading || isEdit
                                    ? false
                                    : true
                                }
                                className={`${
                                  !submittable || loading || isEdit
                                    ? "cursor-pointer"
                                    : "cursor-not-allowed bg-primary-btn"
                                } set_up_primary__button sm:mt-10  text-black`}
                              >
                                {!loading ? "Save & Update" : <ButtonSpinner />}
                              </button>
                            ) : (
                              <button
                                // onClick={handleButtonClick}
                                disabled={
                                  !submittable || loading ? true : false
                                }
                                className={`${
                                  !submittable || loading
                                    ? "cursor-not-allowed bg-primary-btn"
                                    : "cursor-pointer"
                                } set_up_primary__button sm:mt-10  text-black`}
                              >
                                {!loading ? "Save & Update" : <ButtonSpinner />}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container max-sm:hidden">
        <Footer />
      </div>
    </div>
  );
};

export default EditProfile;
