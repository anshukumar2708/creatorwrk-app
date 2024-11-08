import { useNavigate } from "react-router-dom";
import { DatePicker, Form, Select, Space } from "antd";
import * as actionTypes from "../../../store-items/action-types";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState, useRef } from "react";
import HttpService from "../../../services/http.service";
import { API_CONFIG } from "../../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { createAction } from "../../../utils/common";
import { State } from "../../../interfaces/store";
import UploadProfileImage from "../../../components/home-page/upload-profile-image";
import { uploadFileToS3 } from "../../../components/common/image-upload/image-upload";
import dayjs from "dayjs";
import "./crop-modal.css";
import ButtonSpinner from "../../../components/common/button-spinner";
import SelectArrowIcon from "../../../assets/images/common/selectarrow";
import PhoneIcon from "../../../assets/images/common/phone";
import DropDownArrow from "../../../assets/images/svg/dropdown-arrow";
import { useNotificationToaster } from "../../../hooks/use-notification-toaster";
import { handleDropdownVisibility } from "../../../utils/helper";

const SetUpProfileComponent = ({ profileData }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState<any>(null);
  const { categories, profile } = useSelector((state: State) => state);
  const [submittable, setSubmittable] = useState(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isImgErrorMsg, setImgIsErrorMsg] = useState<string | null>(null);
  const [isUploadedImageFile, setIsUploadedImageFile] = useState<string>("");
  const initialValuesRef = useRef({});
  const notify = useNotificationToaster();

  // Add category Data in Object for listing
  const categoryOptions = categories?.categories?.map((item) => ({
    label: item.name,
    value: item.name.toLowerCase(),
  }));
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
        email: profile?.profile?.email,
        name: profile?.profile?.name,
        number: profile?.profile?.phoneNumber?.slice(3),
        gender: profile?.profile?.gender,
        dob: profile?.profile?.dateOfBirth
          ? dayjs(profile?.profile?.dateOfBirth)
          : undefined,
        category: profile?.profile?.categories,
        country: profile?.profile?.country,
        state: profile?.profile?.state,
        city: profile?.profile?.city,
        about: profile?.profile?.about,
      });
    }
  }, [profile, form]);

  const formSubmitHandler = async (values: any) => {
    try {
      setLoading(true);
      let imageUploadToS3: string | null = null;
      if (imageFile && !isUploadedImageFile) {
        const signUrlResponse = await HttpService.post(
          API_CONFIG.path.signUrl,
          {
            ProfileImage: imageFile.type,
          }
        );

        if (signUrlResponse) {
          imageUploadToS3 = await uploadFileToS3(
            signUrlResponse?.data?.profileImage,
            imageFile
          );

          if (imageUploadToS3) {
            setIsUploadedImageFile(imageUploadToS3);
          }
        }
      }
      if (
        isUploadedImageFile ||
        imageUploadToS3 ||
        profile?.profile?.profileImageUri
      ) {
        const payload = {
          name: profile?.profile?.name,
          phoneNumber: `+91${values.number}`,
          gender: values.gender,
          dateOfBirth: values.dob,
          ...(imageUploadToS3 || isUploadedImageFile
            ? {
                profileImage: `${
                  imageUploadToS3 || isUploadedImageFile
                }?v=${new Date().getTime()}`,
              }
            : {}),
          categories: values.category,
          country: values.country,
          state: values.state,
          city: values.city,
          about: values.about,
        };
        const updateProfileResponse = await HttpService.patch(
          API_CONFIG.path.editProfile,
          { ...payload }
        );
        if (updateProfileResponse) {
          dispatch(
            createAction(
              actionTypes.GET_PROFILE_DATA,
              updateProfileResponse?.data
            )
          );
          form.resetFields();
          setTimeout(() => {
            notify("success", "Profile set up successful");
            if (profile?.profile?.userType === "business_owner") {
              navigate("/post-job");
            } else if (profile?.profile?.userType === "creator") {
              navigate("/social-account");
            }
          }, 0);
        }
      } else if (!imageFile) {
        setImgIsErrorMsg("Please Select Profile Image");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  // const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  //   if (!loading) {
  //     form.submit();
  //     navigate("/");
  //   }
  // };

  const skipButtonHandler = () => {
    if (profileData) {
      dispatch(createAction(actionTypes.GET_PROFILE_DATA, profileData));
    }
    navigate("/");
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full max-md:justify-start">
        <div className="max-w-388 gap-8 flex flex-col justify-center items-center">
          <div className="flex flex-col justify-start items-start w-full">
            <h1 className="text-lightWhite text-2xl font-bold ">
              Set-up Profile
            </h1>
            <p className="text-blue text-lg font-normal leading-5">
              Enter your personal details.
            </p>
          </div>
          <div className="w-full">
            <div className="flex justify-between items-center relative">
              <h1 className="text-white">Upload profile*</h1>
              <UploadProfileImage
                profileData={profile?.profile}
                setImageFile={setImageFile}
                setIsEdit={setIsEdit}
                setImgIsErrorMsg={setImgIsErrorMsg}
                setIsUploadedImageFile={setIsUploadedImageFile}
              />
            </div>
            {isImgErrorMsg && (
              <div className="text-red-500 md:mt-11 mt-14 text-right">
                {isImgErrorMsg}
              </div>
            )}
          </div>
          <div className={`w-full ${isImgErrorMsg ? "mt-0" : "mt-10"} `}>
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
                name="number"
                className="w-full text-base"
                validateTrigger={["onBlur", "onChange"]}
                rules={[
                  { required: true, message: "Mobile Number is required" },
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
                    defaultValue={profile?.profile?.phoneNumber?.slice(3)}
                  />
                  <PhoneIcon />
                  {/* <img src={phoneIcon} alt="phoneIcon" /> */}
                </Space.Compact>
              </Form.Item>

              <Space.Compact className="w-full flex flex-col sm:flex-row justify-between items-center gap-5 pb-0 mb-0">
                <Form.Item
                  name="gender"
                  className="w-full !sm:w-48 text-base"
                  validateTrigger={["onBlur", "onChange"]}
                  rules={[{ required: true, message: "Gender is required" }]}
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
                    defaultValue={profile?.profile?.gender}
                    options={[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" },
                    ]}
                    suffixIcon={<SelectArrowIcon />}
                    onDropdownVisibleChange={handleDropdownVisibility}
                  />
                </Form.Item>

                <Form.Item
                  name="dob"
                  className="w-full !sm:w-48 text-base"
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
                    maxDate={dayjs()}
                    style={{ color: "#8688A5" }}
                    allowClear={false}
                    suffixIcon={<DropDownArrow />}
                    value={
                      form.getFieldValue("dob")
                        ? dayjs(form.getFieldValue("dob"))
                        : undefined
                    }
                    // onChange={(date, dateString) => {}}
                    onChange={() => {
                      setIsEdit(true);
                    }}
                    onOpenChange={handleDropdownVisibility}
                  />
                </Form.Item>
              </Space.Compact>

              <Form.Item
                name="category"
                className="w-full text-base"
                validateTrigger={["onBlur", "onChange"]}
                rules={[{ required: true, message: "Category is required" }]}
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
                    <span className="text-blue text-base">Country*</span>
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
                <TextArea
                  rows={4}
                  placeholder="About*"
                  maxLength={600}
                  className="!resize-none textarea-placeholder w-full text-base font-normal !bg-transparent !shadow-none p-0 !border-none text-white"
                />
              </Form.Item>

              <div className="flex flex-col justify-center items-center gap-3 mb-5 w-full">
                <div className="flex items-center justify-center w-full">
                  <button
                    disabled={!submittable || loading || isEdit ? false : true}
                    className={`${
                      !submittable || loading || isEdit
                        ? "cursor-pointer"
                        : "cursor-not-allowed bg-[#B2B2B2]"
                    } set_up_primary__button sm:mt-10  text-black`}
                  >
                    {!loading ? "NEXT" : <ButtonSpinner />}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => skipButtonHandler()}
                  className="text-base font-semibold sm:mt-6 mt-5 text-lightWhite hover:text-smallBlue"
                >
                  Skip now
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SetUpProfileComponent;
