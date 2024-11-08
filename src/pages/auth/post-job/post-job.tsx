import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Radio, RadioChangeEvent, Select, Space, Spin } from "antd";
import { useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { State } from "../../../interfaces/store";
import AuthLayout from "../../../components/auth/auth-layout";
import HttpService from "../../../services/http.service";
import { API_CONFIG } from "../../../utils/api";
import { ICreateJobValues } from "../../../interfaces/myJob";
import ButtonSpinner from "../../../components/common/button-spinner";
import SelectArrowIcon from "../../../assets/images/common/selectarrow";
import Location from "../../../assets/images/svg/location";
import ClockIcon from "../../../assets/images/svg/clock-icon";
import AvatarImage from "../../../components/common/avatar-image/avatar-image";
import useReCaptcha from "../../../hooks/useReCaptcha";
import { useNotificationToaster } from "../../../hooks/use-notification-toaster";
import { handleDropdownVisibility } from "../../../utils/helper";

const PostJob = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [price, setPrice] = useState(1);
  const [review, setReview] = useState(false);
  const [reviewData, setReviewData] = useState<ICreateJobValues | null>(null);
  const stateData = useSelector((state: State) => state);
  const { categories, profile } = stateData;
  const navigate = useNavigate();
  const [submittable, setSubmittable] = useState(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const initialValuesRef = useRef({});
  const notify = useNotificationToaster();

  const values = Form.useWatch([], form);

  //for reCaptcha render
  const reCaptchaToken = useReCaptcha();

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

  // Add category Data in Object for listing
  const categoryOptions = categories?.categories?.map((item) => ({
    label: item.name,
    value: item.name.toLowerCase(),
  }));

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setPrice(e.target.value);
  };

  const formSubmitHandler = (values: any) => {
    setReviewData(values);
    setReview(true);
  };

  const confirmPostHandler = async () => {
    if (reCaptchaToken) {
      try {
        setLoading(true);
        const payload = {
          title: reviewData?.jobTitle,
          description: reviewData?.description,
          categories: reviewData?.category,
          location: [reviewData?.location],
          maxPrice: reviewData?.fixPrice
            ? reviewData?.fixPrice
            : reviewData?.maxPrice,
          minPrice: reviewData?.fixPrice
            ? reviewData?.fixPrice
            : reviewData?.minPrice,
          recaptchaToken: reCaptchaToken,
        };

        const response = await HttpService.post(API_CONFIG.path.createJob, {
          ...payload,
        });
        if (response) {
          // message.success("Job Post Successfully");
          navigate("/successful", {
            state: {
              message:
                "Now your profile as Business owner has been created successfully, create more jobs and get the influencer which you like..",
            },
          });
          notify("success", "Job post successfully");
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const editJobHandler = () => {
    setReview(false);
    setIsEdit(true);
  };

  useEffect(() => {
    if (reviewData) {
      form.setFieldsValue({
        jobTitle: reviewData?.jobTitle,
        category: reviewData?.category,
        description: reviewData?.description,
        location: reviewData?.location,
      });
    }
  }, [reviewData, form]);
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!loading) {
      form.submit();
    }
  };

  return (
    <>
      <AuthLayout>
        {!review && (
          <div className="flex justify-center items-center gap-5 flex-col max-w-388 pb-5 w-full">
            <div className="w-full flex flex-col items-start justify-center">
              <h1 className="w-full text-lightWhite text-2xl font-semibold leading-7 pb-1.5">
                {!reviewData ? "Post" : "Edit"} Job
              </h1>
              <p className="w-full text-lg font-normal text-blue text-left">
                Do welcome to your first post
              </p>
              <div className="w-full flex flex-col items-center justify-start mt-4">
                <div className="w-full">
                  <Form
                    form={form}
                    autoComplete="off"
                    onFinish={(values) => formSubmitHandler(values)}
                    className="flex flex-col justify-center items-center gap-5 w-full"
                    onChange={() => {
                      setIsEdit(false);
                    }}
                  >
                    <Form.Item
                      name="jobTitle"
                      className="w-full text-base"
                      validateTrigger={["onBlur", "onChange"]}
                      rules={[
                        {
                          required: true,
                          message: "Job Title is required",
                        },
                        {
                          min: 3,
                          message: "Title must be greater then 3 Character!",
                        },
                        {
                          max: 100,
                          message: "Job title not more then 100 Character!",
                        },
                        {
                          pattern: /^(?!\s+$).*$/,
                          message: "Blank spaces are not allowed!",
                        },
                        {
                          pattern: /^[a-zA-Z0-9\s]+$/,
                          message: "Only a-z A-Z 0-9 are allowed!",
                        },
                      ]}
                    >
                      <input
                        className="email-description text-white"
                        placeholder="Job Title*"
                        type="text"
                      />
                    </Form.Item>

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
                        className="select-container"
                        size="large"
                        onChange={() => {
                          setIsEdit(false);
                          console.log("onChange");
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
                      name="description"
                      validateTrigger={["onBlur", "onChange"]}
                      rules={[
                        { required: true, message: "Description is required" },
                        {
                          pattern: /^(?!\s+$).*$/,
                          message: "Blank spaces are not allowed!",
                        },
                        {
                          min: 3,
                          message:
                            "Description must be greater then 3 Character!",
                        },
                        {
                          max: 500,
                          message:
                            "Description must be less then 500 Character!",
                        },
                      ]}
                    >
                      <TextArea
                        rows={4}
                        placeholder="Description*"
                        maxLength={600}
                        className="textarea-placeholder !shadow-none !resize-none text-base font-normal !bg-transparent text-white border-none border-b-8 !border-secondary"
                      />
                    </Form.Item>

                    <Form.Item
                      name="location"
                      className="w-full text-base"
                      validateTrigger={["onBlur", "onChange"]}
                      rules={[
                        { required: true, message: "Location is required" },
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
                          setIsEdit(false);
                        }}
                        placeholder={
                          <span className="text-blue w-full text-base">
                            Location*
                          </span>
                        }
                        style={{ width: "100%" }}
                        options={[
                          { value: "ahmedabad", label: "Ahmedabad" },
                          { value: "surat", label: "Surat" },
                          { value: "rajkot", label: "Rajkot" },
                        ]}
                        suffixIcon={<SelectArrowIcon />}
                        onDropdownVisibleChange={handleDropdownVisibility}
                      />
                    </Form.Item>

                    <div className="w-full flex flex-col items-start gap-4">
                      <div className="flex flex-col justify-start items-start">
                        <h1 className="text-lightWhite text-base font-bold leading-7">
                          Set Price*
                        </h1>
                        <p className="text-base font-normal text-blue">
                          Price will be different for each
                        </p>
                      </div>
                      <Radio.Group onChange={onChange} value={price}>
                        <Radio
                          className="text-white text-base font-normal"
                          value={1}
                          type="button"
                        >
                          {" "}
                          Fixed price
                        </Radio>
                        <Radio
                          className="text-white text-base font-normal sm:ml-10 ml-2"
                          value={2}
                          type="button"
                        >
                          {" "}
                          Price range
                        </Radio>
                      </Radio.Group>

                      {price === 1 && (
                        <div className="fix-range-price w-full">
                          <Form.Item
                            name="fixPrice"
                            className="w-full text-base"
                            validateTrigger={["onBlur", "onChange"]}
                            rules={[
                              {
                                required: price === 1 && true,
                                message: "Price is required!",
                              },
                              {
                                pattern: /^(?!\s+$).*$/,
                                message: "Blank spaces are not allowed!",
                              },
                              {
                                validator: (_, value) => {
                                  if (value && value.length > 10) {
                                    return Promise.reject(
                                      new Error(
                                        "Price cannot exceed 10 characters!"
                                      )
                                    );
                                  }
                                  if (value >= 1) {
                                    return Promise.resolve();
                                  }
                                  return Promise.reject(
                                    new Error("Price must be at least 1!")
                                  );
                                },
                              },
                            ]}
                          >
                            <Space.Compact>
                              <input
                                defaultValue="₹"
                                disabled
                                className="text-blue bg-transparent text-base w-3"
                              />
                              <input
                                placeholder="200"
                                type="number"
                                className="bg-transparent text-base text-white font-bold w-full"
                                defaultValue={reviewData?.fixPrice}
                              />
                            </Space.Compact>
                          </Form.Item>
                        </div>
                      )}
                      {price === 2 && (
                        <Space.Compact className="w-full flex flex-row justify-between items-center max-w-388 !pb-0">
                          <div className="fix-range-price !w-5/12">
                            <Form.Item
                              name="minPrice"
                              className="text-base full"
                              validateTrigger={["onBlur", "onChange"]}
                              rules={[
                                {
                                  required: price === 2 && true,
                                  message: "Price is required!",
                                },
                                {
                                  pattern: /^(?!\s+$).*$/,
                                  message: "Blank spaces are not allowed!",
                                },
                                {
                                  validator: (_, value) => {
                                    if (value && value.length > 10) {
                                      return Promise.reject(
                                        new Error(
                                          "Price cannot exceed 10 characters!"
                                        )
                                      );
                                    }
                                    if (value >= 1) {
                                      return Promise.resolve();
                                    }
                                    return Promise.reject(
                                      new Error("Price must be at least 1!")
                                    );
                                  },
                                },
                              ]}
                            >
                              <Space.Compact>
                                <input
                                  defaultValue="₹"
                                  disabled
                                  className="text-blue bg-transparent text-base w-3"
                                />
                                <input
                                  placeholder="200"
                                  type="number"
                                  className="bg-transparent text-base text-white font-bold w-full"
                                  defaultValue={reviewData?.minPrice}
                                />
                              </Space.Compact>
                            </Form.Item>
                          </div>
                          <p className="text-blue text-base">To</p>
                          <div className="fix-range-price !w-5/12">
                            <Form.Item
                              name="maxPrice"
                              dependencies={["minPrice"]}
                              className="text-base font-bold w-full"
                              validateTrigger={["onBlur", "onChange"]}
                              rules={[
                                {
                                  required: price === 2,
                                  message: "Price is required!",
                                },
                                {
                                  pattern: /^(?!\s+$).*$/,
                                  message: "Blank spaces are not allowed!",
                                },
                                ({ getFieldValue }) => ({
                                  validator(_, value) {
                                    if (value && value.length > 10) {
                                      return Promise.reject(
                                        new Error(
                                          "Price cannot exceed 10 characters!"
                                        )
                                      );
                                    }
                                    if (
                                      value &&
                                      Number(value) <=
                                        Number(getFieldValue("minPrice"))
                                    ) {
                                      return Promise.reject(
                                        new Error(
                                          "Max Price should is not less or equal then Min Price"
                                        )
                                      );
                                    }
                                    return Promise.resolve();
                                  },
                                }),
                              ]}
                            >
                              <Space.Compact>
                                <input
                                  defaultValue="₹"
                                  disabled
                                  className="text-blue bg-transparent text-base w-3"
                                />
                                <input
                                  placeholder="200"
                                  type="number"
                                  className="bg-transparent text-base text-white w-full"
                                  defaultValue={reviewData?.maxPrice}
                                />
                              </Space.Compact>
                            </Form.Item>
                          </div>
                        </Space.Compact>
                      )}
                    </div>
                    <div className="flex flex-col justify-center items-center gap-5 my-3 w-full">
                      {reviewData ? (
                        <div className="flex items-center justify-center w-full">
                          <button
                            onClick={handleButtonClick}
                            disabled={
                              !submittable || loading || isEdit ? true : false
                            }
                            className={`${
                              !submittable || loading || isEdit
                                ? "cursor-not-allowed bg-[#B2B2B2]"
                                : "cursor-pointer"
                            } set_up_primary__button text-black`}
                          >
                            {!loading ? "NEXT" : <ButtonSpinner />}
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center w-full">
                          <button
                            disabled={!submittable || loading ? true : false}
                            className={`${
                              !submittable || loading
                                ? "cursor-not-allowed bg-[#B2B2B2]"
                                : "cursor-pointer"
                            } set_up_primary__button text-black`}
                          >
                            {!loading ? "NEXT" : <ButtonSpinner />}
                          </button>
                        </div>
                      )}

                      <Link
                        to="/"
                        className="text-base font-semibold text-lightWhite hover:text-smallBlue"
                      >
                        Skip now
                      </Link>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* second Part  review data*/}
        {review && (
          <div className="flex flex-col items-center justify-center gap-5 max-md:z-1 sm:mt-5 mt-4 max-w-388 mx-auto pb-5">
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-lightWhite text-2xl font-bold leading-7">
                Review Job
              </h1>
              <p className="text-lg font-normal text-blue text-center w-full">
                Ensure you review your post before it is published and visible
                to others
              </p>
            </div>
            <div className="border border-grey p-5 rounded-3xl w-full">
              <div className="flex justify-start items-center gap-5 w-full">
                <AvatarImage
                  imageUrl={profile?.profile?.profileImageUri}
                  size={45}
                  name={profile?.profile?.name}
                />
                <h3 className="text-white text-lg font-bold capitalize">
                  {profile?.profile?.name}
                </h3>
              </div>
              <h1 className="text-white text-lg max-xs:text-sm leading-5 font-semibold pt-6 capitalize">
                {reviewData?.jobTitle}
              </h1>
              <p className="text-mediumBlue text-base font-normal  pt-2.5">
                {reviewData?.description}
              </p>
              <div className="flex flex-wrap gap-2 my-8 max-lg:my-4 w-full">
                {reviewData?.category?.map((item: string, index: number) => {
                  return (
                    <p
                      key={index}
                      className="text-base font-medium text-white bg-mediumBlack px-4 py-2 rounded-lg capitalize"
                    >
                      {item}
                    </p>
                  );
                })}
              </div>
              <div className="flex items-start flex-col max-md:flex-wrap gap-5 w-full">
                <div className="flex gap-3 items-center w-full">
                  {/* <img src={location} alt="location" /> */}
                  <Location />
                  <h3 className="text-base font-semibold leading-4 text-mediumViolet capitalize">
                    {reviewData?.location}
                  </h3>
                </div>
                <div className="flex gap-3 items-start">
                  {/* <img src={clockIcon} alt="clockIcon" /> */}
                  <ClockIcon />
                  {reviewData?.fixPrice && (
                    <div className="text-mediumViolet text-base font-semibold leading-4">
                      <h4>₹ {reviewData?.fixPrice}</h4>
                      <p className="text-xs font-bold text-grey capitalize">
                        Fixed Price
                      </p>
                    </div>
                  )}

                  {!reviewData?.fixPrice && (
                    <div className="text-mediumViolet text-base font-semibold leading-4">
                      <h4>
                        ₹ {reviewData?.minPrice} - ₹ {reviewData?.maxPrice}
                      </h4>
                      <p className="text-xs font-bold text-grey capitalize">
                        Range Price
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button
              className="primary__button sm:mt-6"
              onClick={confirmPostHandler}
              disabled={loading ? true : false}
            >
              <Spin
                spinning={loading}
                indicator={
                  <LoadingOutlined
                    style={{
                      fontSize: "16px ",
                      fontWeight: "600",
                      marginRight: "12px",
                    }}
                    spin
                  />
                }
              />
              CONFIRM & POST
            </button>
            <button
              onClick={editJobHandler}
              className=" sm:mt-2 text-lightWhite text-base font-semibold hover:text-smallBlue"
            >
              Edit Post
            </button>
          </div>
        )}
      </AuthLayout>
    </>
  );
};
export default PostJob;
