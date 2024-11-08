import { useEffect, useRef, useState } from "react";
import InnerLayout from "../../components/common/inner-layout";
import { useNavigate, useParams } from "react-router-dom";
import { Checkbox, Form, Radio, RadioChangeEvent, Select, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useSelector } from "react-redux";
import { State } from "../../interfaces/store";
import PreviewJob from "./preview-job";
import HttpService from "../../services/http.service";
import { API_CONFIG } from "../../utils/api";
import ButtonSpinner from "../../components/common/button-spinner";
import { ICreateJobValues, IMyJobData } from "../../interfaces/myJob";
import SelectArrowIcon from "../../assets/images/common/selectarrow";
import useReCaptcha from "../../hooks/useReCaptcha";
import { useNotificationToaster } from "../../hooks/use-notification-toaster";
import { handleDropdownVisibility } from "../../utils/helper";
import Loader from "../../components/common/loader";

const CreateUpdateJob = () => {
  const [form] = Form.useForm();
  const [price, setPrice] = useState(1);
  const [loadingApi, setLoadingAPI] = useState<boolean>(false);
  const [jobByIdLoading, setJobByIdLoading] = useState<boolean>(true);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [preview, setPreview] = useState<boolean>(false);
  const [previewData, setPreviewData] = useState<ICreateJobValues | null>(null);
  const [editJob, setEditJob] = useState<boolean>(false);
  const [getJobData, setGetJobData] = useState<IMyJobData | null>(null);
  const stateData = useSelector((state: State) => state);
  const { categories } = stateData;
  const navigate = useNavigate();
  const { jobSlug } = useParams();
  const notify = useNotificationToaster();

  const [submittable, setSubmittable] = useState(false);

  const initialValuesRef = useRef({});

  const values = Form.useWatch([], form);

  //for ReCaptcha Render
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
  const categoryOptions = categories?.categories?.map(
    (item: { id: string; name: string }) => ({
      label: item.name,
      value: item.name.toLowerCase(),
    })
  );

  // for set fixed & Range Price
  const onChange = (e: RadioChangeEvent) => {
    setPrice(e.target.value);
  };

  // get job data by id
  useEffect(() => {
    const getJobDataById = async () => {
      try {
        const response = await HttpService.get(
          `${API_CONFIG.path.myJob}/${jobSlug}/view`
        );
        if (response) {
          setGetJobData(response?.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setJobByIdLoading(false);
      }
    };
    jobSlug && getJobDataById();
  }, [jobSlug]);

  useEffect(() => {
    if (!jobSlug) {
      setJobByIdLoading(false);
    }
  }, [jobSlug]);

  // For Create Job API
  const createJobHandler = async (values: ICreateJobValues) => {
    if (values && reCaptchaToken) {
      try {
        setLoadingAPI(true);
        const payload = {
          title: values?.jobTitle,
          description: values?.description,
          categories: values?.category,
          location: values?.location,
          minPrice: values?.fixPrice ? values?.fixPrice : values?.minPrice,
          maxPrice: values?.fixPrice ? values?.fixPrice : values?.maxPrice,
          recaptchaToken: reCaptchaToken,
        };
        const response = await HttpService.post(API_CONFIG.path.createJob, {
          ...payload,
        });
        if (response) {
          // message.success("Job Create Successfully");
          navigate("/");
          notify("success", "Job create successfully");
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoadingAPI(false);
      }
    }
  };

  const updateJobHandler = async (values: ICreateJobValues) => {
    if (values) {
      try {
        setLoadingAPI(true);
        const payload = {
          title: values?.jobTitle,
          description: values?.description,
          categories: values?.category,
          location: values?.location,
          minPrice: values?.fixPrice ? values?.fixPrice : values?.minPrice,
          maxPrice: values?.fixPrice ? values?.fixPrice : values?.maxPrice,
        };
        const response = await HttpService.patch(
          `${API_CONFIG.path.myJob}/${getJobData?.id}/update`,
          {
            ...payload,
          }
        );
        if (response) {
          navigate("/");
          notify("success", "Job update successfully");
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoadingAPI(false);
      }
    }
  };

  // for preview data before post
  const formSubmitHandler = (values: ICreateJobValues) => {
    if (values?.remember) {
      setPreviewData(values);
      setPreview(true);
    } else {
      if (jobSlug) {
        updateJobHandler(values);
      } else {
        createJobHandler(values);
      }
    }
  };

  const postJobOnReview = (values: ICreateJobValues) => {
    if (jobSlug) {
      updateJobHandler(values);
    } else {
      createJobHandler(values);
    }
  };

  // set fieldValue on edit job
  useEffect(() => {
    if (getJobData) {
      setEditJob(true);
      form.setFieldsValue({
        jobTitle: getJobData?.title,
        category: getJobData?.categories,
        description: getJobData?.description,
        location: getJobData?.location,
        fixPrice:
          getJobData?.minPrice === getJobData?.maxPrice
            ? getJobData?.minPrice
            : previewData?.fixPrice,
        minPrice:
          getJobData?.minPrice !== getJobData?.maxPrice
            ? getJobData?.minPrice
            : previewData?.minPrice,
        maxPrice:
          getJobData?.minPrice !== getJobData?.maxPrice
            ? getJobData?.maxPrice
            : previewData?.maxPrice,
      });
      if (getJobData?.minPrice === getJobData?.maxPrice) {
        setPrice(1);
      } else {
        setPrice(2);
      }
    }
  }, [getJobData, form, previewData]);

  const validateSpaces = (_: any, value: string) => {
    if (value && value.trim().length === 0) {
      return Promise.reject(new Error("Blank spaces are not allowed!"));
    }
    return Promise.resolve();
  };
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!loadingApi) {
      form.submit();
    }
  };

  return (
    <>
      <div className="w-full sm:mb-6 mb-12">
        {!preview && (
          <InnerLayout>
            {jobByIdLoading && <Loader />}
            {!jobByIdLoading && (
              <div className="w-full flex flex-col items-start justify-center max-w-xl md:pt-12 md:pb-14 pb-5 max-sm:mt-5">
                <h1 className="text-lightWhite text-2xl font-bold">
                  {!editJob ? "Post" : "Edit"} Job
                </h1>
                <div className="w-full flex flex-col items-center justify-start mt-2.5">
                  <div className="w-full">
                    <Form
                      form={form}
                      autoComplete="off"
                      onFinish={(values) => formSubmitHandler(values)}
                      className="flex flex-col justify-center items-center gap-5 w-full"
                      onChange={() => {
                        if (jobSlug) {
                          setIsEdit(true);
                        }
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
                          { validator: validateSpaces },
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
                          size="large"
                          className="select-container"
                          onChange={() => {
                            if (jobSlug) {
                              setIsEdit(true);
                            }
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
                          {
                            required: true,
                            message: "Description is required",
                          },
                          { validator: validateSpaces },
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
                          {
                            pattern: /^(?!\s+$).*$/,
                            message: "Blank spaces are not allowed!",
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
                                  defaultValue={
                                    getJobData &&
                                    getJobData?.minPrice ===
                                      getJobData?.maxPrice
                                      ? getJobData?.minPrice
                                      : previewData?.fixPrice
                                  }
                                />
                              </Space.Compact>
                            </Form.Item>
                          </div>
                        )}
                        {price === 2 && (
                          <Space.Compact className="w-full flex flex-row justify-between items-center max-w-xl !pb-0">
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
                                    defaultValue={
                                      getJobData &&
                                      getJobData?.minPrice !==
                                        getJobData?.maxPrice
                                        ? getJobData?.minPrice
                                        : previewData?.minPrice
                                    }
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
                                            "Max Price should not be less than or equal to Min Price"
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
                                    defaultValue={
                                      getJobData &&
                                      getJobData?.minPrice !==
                                        getJobData?.maxPrice
                                        ? getJobData?.maxPrice
                                        : previewData?.maxPrice
                                    }
                                  />
                                </Space.Compact>
                              </Form.Item>
                            </div>
                          </Space.Compact>
                        )}
                      </div>

                      <div className="sm:mb-4 custom-checkbox min-w-full check-box-line">
                        <Form.Item
                          name="remember"
                          className="!border-b-0 "
                          valuePropName="checked"
                          validateTrigger={["onBlur", "onChange"]}
                        >
                          <Checkbox>
                            <div className="pl-2">
                              <span className="text-white text-base font-medium">
                                Preview job before
                              </span>
                            </div>
                          </Checkbox>
                        </Form.Item>
                      </div>

                      {jobSlug ? (
                        <div className="flex items-center justify-center w-full md:w-384 m-auto">
                          <button
                            onClick={handleButtonClick}
                            disabled={
                              !submittable || loadingApi || isEdit
                                ? false
                                : true
                            }
                            className={`${
                              !submittable || loadingApi || isEdit
                                ? "cursor-pointer"
                                : "cursor-not-allowed bg-primary-btn"
                            } sm:mt-4 w-full set_up_primary__button  text-black`}
                          >
                            {!loadingApi ? (
                              !editJob ? (
                                "POST JOB"
                              ) : (
                                "Save & Update"
                              )
                            ) : (
                              <ButtonSpinner />
                            )}
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center w-full md:w-384 m-auto">
                          <button
                            disabled={!submittable || loadingApi ? true : false}
                            className={`${
                              !submittable || loadingApi
                                ? "cursor-not-allowed bg-primary-btn"
                                : "cursor-pointer"
                            } sm:mt-4 w-full set_up_primary__button  text-black`}
                          >
                            {!loadingApi ? (
                              !editJob ? (
                                "POST JOB"
                              ) : (
                                "Save & Update"
                              )
                            ) : (
                              <ButtonSpinner />
                            )}
                          </button>
                        </div>
                      )}
                    </Form>
                  </div>
                </div>
              </div>
            )}
          </InnerLayout>
        )}
        {preview && (
          <PreviewJob
            previewData={previewData}
            setPreview={setPreview}
            postJobOnReview={postJobOnReview}
            loadingApi={loadingApi}
            setEditJob={setEditJob}
          />
        )}
      </div>
    </>
  );
};
export default CreateUpdateJob;
