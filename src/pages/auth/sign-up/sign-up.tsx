import { FC, useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ROUTES } from "../../../assets/locales/routes";
import { Checkbox, Form } from "antd";
import HttpService from "../../../services/http.service";
import { API_CONFIG } from "../../../utils/api";
import AuthService from "../../../services/auth.service";
import { createAction } from "../../../utils/common";
import logoLogin from "../../../assets/images/common/logo-login.png";
import * as actionTypes from "../../../store-items/action-types";
import { ISignUpValues } from "../../../interfaces/auth";
import AuthLayout from "../../../components/auth/auth-layout";
import ButtonSpinner from "../../../components/common/button-spinner";
import {
  emailRegex,
  landingPageUrl,
  passwordValidation,
} from "../../../assets/locales/constant";
import MessageIcon from "../../../assets/images/common/message";
import HideIcon from "../../../assets/images/common/hide";
import ProfileIcon from "../../../assets/images/common/profile";
import PassShowIcon from "../../../assets/images/svg/pass-show";
import { useNotificationToaster } from "../../../hooks/use-notification-toaster";

const SignUp: FC = () => {
  const [form] = Form.useForm();
  const [influencer, setInfluencer] = useState<boolean>(true);
  const [passShow, setPassShow] = useState<boolean>(false);
  const [conPassShow, setConPassShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [submittable, setSubmittable] = useState(false);
  const initialValuesRef = useRef({});
  const values = Form.useWatch([], form);
  const notify = useNotificationToaster();

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
    const type = new URLSearchParams(location.search).get("type");
    if (type === "business_owner") {
      setInfluencer(false);
    } else {
      setInfluencer(true);
    }
  }, [location.search]);

  const signUpHandler = async (values: ISignUpValues) => {
    try {
      setLoading(true);
      const payload = {
        type: influencer ? "creator" : "business_owner",
        name: values?.name,
        email: values?.email,
        password: values?.password,
        confirmPassword: values?.confirmPassword,
      };
      const response = await HttpService.post(API_CONFIG.path.signUp, {
        ...payload,
      });
      if (response) {
        AuthService.setAccessToken(response?.data?.token);
        dispatch(createAction(actionTypes.AUTH_SUCCESS, response?.data));
        // for Send email
        const mailResponse = await HttpService.get(
          API_CONFIG.path.sendVerificationMail
        );
        if (mailResponse) {
          navigate("/email-verification");
          notify("success", "OTP sent to your email please check");
        }
        setLoading(false);
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col items-center justify-center max-w-388 w-full ">
        <div className="mb-6 max-md:mb-0">
          <Link to={`${landingPageUrl}`} className="flex gap-4">
            <div>
              <img src={logoLogin} alt="logo" />
            </div>
            {/* <div className="text-white  font-semibold text-22.69 leading-26.62 flex items-center ">
              Creatorwrk
            </div> */}
          </Link>
        </div>
        <h1 className="text-3xl max-sm:text-22 font-extrabold text-white leading-7">
          Create your account
        </h1>
        {/* <h1 className="font-normal text-lg text-blue leading-7">
          New account to continue.
        </h1> */}
        <div className="w-full flex gap-5 max-sm:gap-3 mt-6">
          <div
            onClick={() => setInfluencer(true)}
            className="cursor-pointer w-1/2 "
          >
            {influencer ? (
              <div className="bg-gradient-to-r  from-teal-400 via-indigo-500 to-pink-500 p-0.5 border-8 relative rounded-4xl">
                <div className="w-full max-w-12 h-11  flex bg-primary flex-row-reverse justify-around items-center rounded-4xl">
                  <div className="bg-gradient-to-r from-teal-400 via-indigo-500 to-pink-500 p-0.5 border-8 relative rounded-4xl">
                    <div className="w-5 h-5 rounded-xl bg-primary"></div>
                  </div>
                  <label className="text-lightWhite cursor-pointer text-sm font-normal">
                    Influencer
                  </label>
                </div>
              </div>
            ) : (
              <div className="w-full  max-w-44 h-12  flex flex-row-reverse justify-around items-center border border-lightGrey rounded-full">
                <div className="border-lightGrey p-0.5 border-[3.6px] relative rounded-4xl">
                  <div className="w-5 h-5 rounded-xl bg-primary"></div>
                </div>
                <label className="text-lightWhite cursor-pointer text-sm font-normal">
                  Influencer
                </label>
              </div>
            )}
          </div>
          <div
            onClick={() => setInfluencer(false)}
            className="cursor-pointer w-1/2"
          >
            {influencer ? (
              <div className="w-full max-w-44 h-12 flex flex-row-reverse justify-around items-center border border-lightGrey rounded-full">
                <div className="border-lightGrey p-0.5 border-[3.6px] relative rounded-4xl">
                  <div className="w-5 h-5 rounded-xl bg-primary"></div>
                </div>
                <label className="text-lightWhite cursor-pointer text-sm font-normal">
                  Brand owner
                </label>
              </div>
            ) : (
              <div className=" bg-gradient-to-r from-teal-400 via-indigo-500 to-pink-500 p-0.5 border-8 relative rounded-4xl">
                <div className="w-full max-w-12 h-11 flex bg-primary flex-row-reverse justify-around items-center rounded-4xl">
                  <div className="bg-gradient-to-r from-teal-400 via-indigo-500 to-pink-500 p-0.5 border-8 relative rounded-4xl">
                    <div className="w-5 h-5 rounded-xl bg-primary"></div>
                  </div>
                  <label className="text-lightWhite cursor-pointer text-sm font-normal">
                    Brand owner
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-full">
          <Form
            form={form}
            autoComplete="off"
            onFinish={(values) => signUpHandler(values)}
            className="mt-10 form space-y-4 flex flex-col items-center justify-center w-full"
          >
            <Form.Item
              name="name"
              validateTrigger={["onBlur", "onChange"]}
              rules={[
                { required: true, message: "Full Name is required" },
                {
                  min: 3,
                  message: "Name must be greater then 3 Character!",
                },
                {
                  max: 25,
                  message: "Name must be less then 25 Character!",
                },
                {
                  pattern: /^[A-Za-z\s]+$/,
                  message: "Only letters (A-Z, a-z) are allowed!",
                },
                {
                  pattern: /^(?!\s+$).*$/,
                  message: "Blank spaces are not allowed!",
                },
              ]}
            >
              <div className="select-container description-wrapper">
                <input
                  className="email-description"
                  placeholder="Full Name*"
                  type="text"
                />
                <ProfileIcon />
              </div>
            </Form.Item>
            <Form.Item
              name="email"
              validateTrigger={["onBlur", "onChange"]}
              rules={[
                { required: true, message: "Email is required" },
                {
                  pattern: emailRegex,
                  message: "please enter valid email input",
                },
                {
                  pattern: /^(?!\s+$).*$/,
                  message: "Blank spaces are not allowed!",
                },
              ]}
            >
              <div className="select-container description-wrapper">
                <input
                  className="email-description"
                  placeholder="Email*"
                  type="email"
                />
                <MessageIcon />
              </div>
            </Form.Item>

            <Form.Item
              name="password"
              validateTrigger={["onBlur", "onChange"]}
              rules={[
                { required: true, message: "Password is required" },
                {
                  pattern: passwordValidation?.pattern,
                  message: passwordValidation?.message,
                },
                {
                  pattern: /^(?!\s+$).*$/,
                  message: "Blank spaces are not allowed!",
                },
              ]}
            >
              <div className="select-container description-wrapper ">
                <input
                  className="email-description"
                  placeholder="Password*"
                  type={!passShow ? "password" : "text"}
                />
                <span
                  onClick={() => setPassShow(!passShow)}
                  className="cursor-pointer"
                >
                  {passShow ? (
                    // <img src={passShowIcon} alt="passShowIcon" />
                    <PassShowIcon />
                  ) : (
                    <HideIcon />
                  )}
                </span>
              </div>
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              validateTrigger={["onBlur", "onChange"]}
              rules={[
                { required: true, message: "Password is required" },
                {
                  pattern: /^(?!\s+$).*$/,
                  message: "Blank spaces are not allowed!",
                },
                {
                  pattern: passwordValidation?.pattern,
                  message: passwordValidation?.message,
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (value && value !== getFieldValue("password")) {
                      return Promise.reject(
                        new Error("Passwords do not match!")
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <div className="select-container description-wrapper">
                <input
                  className="email-description"
                  placeholder="Confirm Password*"
                  type={!conPassShow ? "password" : "text"}
                />
                <span
                  onClick={() => setConPassShow(!conPassShow)}
                  className="cursor-pointer"
                >
                  {conPassShow ? (
                    // <img src={passShowIcon} alt="passShowIcon" />
                    <PassShowIcon />
                  ) : (
                    <HideIcon />
                  )}
                </span>
              </div>
            </Form.Item>

            <div className="!mb-8 custom-checkbox ">
              <Form.Item
                name="remember"
                className="!border-b-0"
                valuePropName="checked"
                validateTrigger={["onBlur", "onChange"]}
                rules={[
                  {
                    required: true,
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(
                            "Please accept Terms of Service and Privacy Policy."
                          ),
                  },
                  {
                    pattern: /^(?!\s+$).*$/,
                    message: "Blank spaces are not allowed!",
                  },
                ]}
              >
                <Checkbox>
                  <div className="pl-[10px]">
                    <span className="text-blue text-sm font-normal">
                      By signing up you accept
                    </span>{" "}
                    <span className="text-mediumPurple text-sm font-normal">
                      <Link to={`${landingPageUrl}/terms`}>
                        {" "}
                        Terms of Service
                      </Link>
                    </span>{" "}
                    <span className="text-blue text-sm font-normal">
                      and
                    </span>{" "}
                    <span className="text-mediumPurple text-sm font-normal">
                      {" "}
                      <Link to={`${landingPageUrl}/privacy`}>
                        Privacy Policy
                      </Link>
                    </span>
                    <span className="text-blue text-sm font-normal">*</span>
                  </div>
                </Checkbox>
              </Form.Item>
            </div>
            <div className="flex items-center justify-center w-full">
              <button
                disabled={!submittable || loading ? true : false}
                className={`${
                  !submittable || loading
                    ? "cursor-not-allowed bg-primary-btn"
                    : "cursor-pointer"
                } primary__button !mt-0  text-black`}
              >
                {!loading ? " CREATE ACCOUNT" : <ButtonSpinner />}
              </button>
            </div>
          </Form>
        </div>
        <div
          className={`text-blue text-base font-normal sm:mt-12 mt-8 max-sm:text-sm max-md:text-center mb-2`}
        >
          Already have an account?
          <Link to={ROUTES?.login} className="text-lightWhite font-semibold">
            {"   "}
            Login
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
