import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Modal, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import * as actionTypes from "../../../store-items/action-types";
import CongratulationIcon from "../../../assets/images/svg/congratulation";
import EmailVerifiedIcon from "../../../assets/images/svg/email-verified";
import HttpService from "../../../services/http.service";
import { API_CONFIG } from "../../../utils/api";
import AuthLayout from "../../../components/auth/auth-layout";
import { createAction } from "../../../utils/common";
import ButtonSpinner from "../../../components/common/button-spinner";
import { State } from "../../../interfaces/store";
import { emailRegex } from "../../../assets/locales/constant";
import MessageIcon from "../../../assets/images/common/message";
import SetUpProfileComponent from "../../../components/common/set-up-profile/set-up-profile";
import { useNotificationToaster } from "../../../hooks/use-notification-toaster";

const EmailVerification = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [verified, setVerified] = useState<boolean>(false);
  const [emailModal, setEmailModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const stateData = useSelector((state: State) => state);
  const { profile } = stateData;
  const [submittable, setSubmittable] = useState(false);
  const [isSetProfileActive, setIsSetProfileActive] = useState(false);
  const [profileData, setProfileData] = useState();
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

  const handleOk = () => {
    setEmailModal(false);
  };

  const handleCancel = () => {
    setEmailModal(false);
  };

  const otpSubmitHandler = async (value: { otp: number }) => {
    try {
      setLoading(true);
      const payload = {
        code: value.otp,
      };
      const response = await HttpService.post(
        API_CONFIG.path.emailVerification,
        {
          ...payload,
        }
      );
      if (response) {
        // dispatch(createAction(actionTypes.GET_PROFILE_DATA, response?.data));
        setProfileData(response?.data);
        setVerified(true);
        setLoading(false);
        setTimeout(function () {
          // navigate("/set-up-profile");
          setVerified(false);
          setIsSetProfileActive(true);
        }, 1000);
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  // Resend Email
  const otpResendHandler = async () => {
    const mailResponse = await HttpService.get(
      API_CONFIG.path.sendVerificationMail
    );
    if (mailResponse) {
      // message.success("OTP sent to your email please check");
      notify("success", "OTP sent to your email please check");
    }
  };

  const changeEmailHandler = async (value: { email: string }) => {
    setLoading(true);
    try {
      const response = await HttpService.patch(API_CONFIG.path.editProfile, {
        email: value?.email,
      });
      if (response) {
        dispatch(createAction(actionTypes.GET_PROFILE_DATA, response?.data));
        otpResendHandler();
        form.resetFields();
        setEmailModal(false);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full flex flex-col justify-center items-center">
        {!isSetProfileActive ? (
          <div className="flex flex-col justify-center  items-center w-full max-md:mt-10">
            <div className="flex flex-col justify-center items-center">
              <EmailVerifiedIcon />
              <h1 className="text-lightWhite text-2xl font-semibold leading-7 pt-8">
                Verify Email Input
              </h1>
              <h4 className="text-blue text-lg font-normal text-center max-sm:text-base ">
                Confirm your email input with the email we sent to
                <span className="text-white text-lg font-bold md:hidden block  pl-2">
                  {profile?.profile?.email}
                </span>
              </h4>
              <h2 className="text-white text-lg font-semibold md:block hidden">
                {" "}
                {profile?.profile?.email}
              </h2>
            </div>
            <Form
              form={form}
              onFinish={(value) => otpSubmitHandler(value)}
              className="flex flex-col items-center justify-center mt-8 email-verification"
            >
              <Form.Item
                name="otp"
                validateTrigger={["onBlur", "onChange"]}
                rules={[
                  {
                    required: true,
                    message: "Please Enter your OTP!",
                  },
                  {
                    len: 6,
                    message: "OTP must be 6 characters long!",
                  },
                  {
                    pattern: /^(?!\s+$).*$/,
                    message: "Blank spaces are not allowed!",
                  },
                ]}
                hasFeedback
                validateStatus="success"
              >
                <Input.OTP />
              </Form.Item>

              <div className="flex items-center justify-center w-full">
                <button
                  disabled={!submittable || loading ? true : false}
                  className={`${
                    !submittable || loading
                      ? "cursor-not-allowed bg-[#B2B2B2]"
                      : "cursor-pointer"
                  } primary__button mt-11  text-black`}
                >
                  {!loading ? " CONFIRM" : <ButtonSpinner />}
                </button>
              </div>
            </Form>
            <p className="text-blue text-base font-normal leading-4 max-w-sm text-center mt-14">
              Didn't receive code{" "}
              <button
                onClick={otpResendHandler}
                className="text-lightWhite font-semibold"
              >
                {" "}
                Resend{" "}
              </button>
            </p>
            <p className="text-blue text-base font-normal leading-4 max-w-sm text-center mt-10">
              Change your email{" "}
              <span
                className="text-lightWhite font-semibold cursor-pointer"
                onClick={() => setEmailModal(true)}
              >
                Change now
              </span>
              <Modal
                centered
                className="common-modal"
                open={emailModal}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <div className="bg-primary max-md:px-3 flex flex-col justify-center items-center lg:w-2xl w-full">
                  <div className="flex flex-col justify-center items-center border border-grey lg:w-2xl w-full rounded-lg space-y-1.5 p-5 text-center change-mail">
                    <h1 className="text-lightWhite text-lg font-semibold">
                      Change Email
                    </h1>
                    <Form
                      className="w-full"
                      form={form}
                      autoComplete="off"
                      onFinish={(value) => changeEmailHandler(value)}
                    >
                      <Form.Item
                        name="email"
                        className="w-full flex justify-start items-start"
                        validateTrigger={["onBlur", "onChange"]}
                        rules={[
                          { required: true, message: "Email is required" },
                          {
                            pattern: emailRegex,
                            message: "Please enter valid email input",
                          },
                          {
                            pattern: /^(?!\s+$).*$/,
                            message: "Blank spaces are not allowed!",
                          },
                        ]}
                      >
                        <div className="select-container description-wrapper mt-8 w-full flex justify-start items-start">
                          <input
                            className="email-description text-white"
                            placeholder="Email*"
                            type="email"
                            style={{ textTransform: "lowercase" }}
                          />
                          <MessageIcon />
                        </div>
                      </Form.Item>
                      <button className="md:w-80 w-full h-11 !my-8 rounded-3xl bg-white hover:bg-transparent hover:border hover:border-white font-semibold hover:text-white text-black text-base">
                        <ButtonSpinner loading={loading} />
                        Change Now
                      </button>
                    </Form>
                  </div>
                </div>
              </Modal>
            </p>
            <div className="mt-16">
              <Spin
                spinning={loading}
                indicator={
                  <LoadingOutlined
                    style={{ fontSize: "25px ", marginRight: "12px" }}
                    spin
                  />
                }
              />
            </div>
            {verified && (
              <div className="w-full flex justify-center items-center absolute -bottom-0 sm:mb-16 mb-4">
                <div className="border bg-darkBlack border-lightGrey p-3 flex gap-4 items-center justify-start rounded-lg w-350 h-20">
                  <CongratulationIcon width={32} height={32} />
                  <div className="max-sm:w-64">
                    <h1 className="pb-1.5 text-lightWhite text-lg font-semibold leading-5">
                      Email Verified
                    </h1>
                    <h3 className="text-blue text-base font-normal leading-3">
                      Email verification successfully!
                    </h3>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <SetUpProfileComponent profileData={profileData} />
        )}
      </div>
    </AuthLayout>
  );
};

export default EmailVerification;
