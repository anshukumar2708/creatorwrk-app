import { useEffect, useState, useRef } from "react";
import { Form } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { ILoginValues } from "../../../interfaces/auth";
import HttpService from "../../../services/http.service";
import AuthService from "../../../services/auth.service";
import { createAction } from "../../../utils/common";
import { API_CONFIG } from "../../../utils/api";
import * as actionTypes from "../../../store-items/action-types";
import logoLogin from "../../../assets/images/common/logo-login.png";
import AuthLayout from "../../../components/auth/auth-layout";
import ButtonSpinner from "../../../components/common/button-spinner";
import MessageIcon from "../../../assets/images/common/message";
import HideIcon from "../../../assets/images/common/hide";
import PassShowIcon from "../../../assets/images/svg/pass-show";
import { landingPageUrl } from "../../../assets/locales/constant";
import { useNotificationToaster } from "../../../hooks/use-notification-toaster";

const Login = () => {
  const [form] = Form.useForm();
  const [passShow, setPassShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const loginHandler = async (values: ILoginValues) => {
    try {
      setLoading(true);
      const payload = {
        email: values?.email,
        password: values?.password,
      };
      const response = await HttpService.post(API_CONFIG.path.login, {
        ...payload,
      });
      if (response) {
        AuthService.setAccessToken(response?.data?.token);
        dispatch(createAction(actionTypes.AUTH_SUCCESS, response?.data));
        setLoading(false);
        navigate("/");
        notify("success", "Login successful");
      }
    } catch (error: any) {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-col max-md:px-0  w-full justify-center items-center mb-9">
          <div className="flex justify-between items-center max-w-388  w-full m-auto flex-col max-xs:px-0 !max-md:justify-between">
            <div className="mb-7 max-sm:mb-0 first-line">
              <Link to={`${landingPageUrl}`} className="flex gap-4 ">
                <div>
                  <img src={logoLogin} alt="logo" />
                </div>
                {/* <div className="text-white font-semibold text-22.69 leading-26.62 flex items-center ">
                  Creatorwrk
                </div> */}
              </Link>
            </div>
            <div className="flex flex-col justify-between items-center w-full">
              <div className="flex flex-col w-full">
                <div className="text-center">
                  <h1 className="font-bold text-3xl max-sm:text-xl text-lightWhite leading-7 max-md:pt-0">
                    Login to continue
                  </h1>
                  {/* <h3 className="font-normal text-lg text-blue  leading-7 pt-1">
                    Login your account to continue.
                  </h3> */}
                </div>
                <Form
                  form={form}
                  onFinish={(values) => loginHandler(values)}
                  className="mt-7 space-y-4 flex flex-col items-center justify-center w-full"
                >
                  <Form.Item
                    name="email"
                    className=""
                    validateTrigger={["onBlur", "onChange"]}
                    rules={[
                      { required: true, message: "Email is required" },
                      {
                        pattern: /^(?!\s+$).*$/,
                        message: "Blank spaces are not allowed!",
                      },
                    ]}
                  >
                    <div className="select-container description-wrapper flex justify-between">
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
                    className="max-lg:w-full"
                    validateTrigger={["onBlur", "onChange"]}
                    rules={[
                      { required: true, message: "Password is required" },
                      {
                        pattern: /^(?!\s+$).*$/,
                        message: "Blank spaces are not allowed!",
                      },
                    ]}
                  >
                    <div className="select-container description-wrapper flex justify-between">
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

                  <Link
                    to="/forgot-password"
                    className="text-blue py-4 text-sm font-normal"
                  >
                    Forgot Password ?
                  </Link>

                  <div className="flex items-center justify-center w-full">
                    <button
                      disabled={!submittable || loading ? true : false}
                      className={`${
                        !submittable || loading
                          ? "cursor-not-allowed bg-primary-btn"
                          : "cursor-pointer"
                      } primary__button   text-black`}
                    >
                      {!loading ? " LOG IN" : <ButtonSpinner />}
                    </button>
                  </div>
                </Form>
              </div>
              <div
                className={`text-blue text-base font-normal sm:mt-12 mt-8  max-sm:text-sm  max-md:text-center
            `}
              >
                Don’t have an account?{" "}
                <Link to="/sign-up" className="text-white font-semibold">
                  {"   "}
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
