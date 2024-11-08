import { useState, useRef, useEffect } from "react";
import { Form } from "antd";
import AuthLayout from "../../../components/auth/auth-layout";
import HttpService from "../../../services/http.service";
import { API_CONFIG } from "../../../utils/api";
import { IChangePassword } from "../../../interfaces/auth";
import { Link, useNavigate } from "react-router-dom";
import ButtonSpinner from "../../../components/common/button-spinner";
import { passwordValidation } from "../../../assets/locales/constant";
import HideIcon from "../../../assets/images/common/hide";
import PassShowIcon from "../../../assets/images/svg/pass-show";
// import NotificationToaster from "../../../components/common/notification-toaster";
import RightArrowFeed from "../../../assets/images/svg/right-arrow-feed";
import { useNotificationToaster } from "../../../hooks/use-notification-toaster";

const ChangePassword = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  // const [successful, setSuccessful] = useState<boolean>(false);
  const [currentPassShow, setCurrentPassShow] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const [submittable, setSubmittable] = useState(false);

  const initialValuesRef = useRef({});
  const notify = useNotificationToaster();

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

  const ChangePasswordHandler = async (values: IChangePassword) => {
    try {
      setLoading(true);
      const payload = {
        currentPassword: values?.currentPassword,
        newPassword: values?.newPassword,
        confirmPassword: values?.confirmPassword,
      };
      const response = await HttpService.post(API_CONFIG.path.changePassword, {
        ...payload,
      });
      if (response) {
        setLoading(false);
        // setSuccessful(true);
        notify("success", "Your password has been changed successfully.");
        setTimeout(() => {
          navigate("/");
          // setSuccessful(false);
        }, 1000);
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full flex flex-col justify-start items-start -z-50 pb-6">
        <div className="flex gap-1 justify-start items-center mb-5 max-md:hidden">
          <Link to="/" className="comment-name max-md:hidden">
            Home
          </Link>
          {/* <img src={rightArrowFeed} alt="rightArrowFeed" />
           */}
          <span className="max-md:hidden">
            <RightArrowFeed />
          </span>
          <h3 className="comment-name opacity-50 border-lightGrey max-md:hidden">
            Change Password
          </h3>
        </div>
        <div className="w-full flex flex-col justify-center items-center sm:bg-black rounded-18 sm:border-1 sm:border-grey max-md:mt-2">
          <div className="flex flex-col items-center w-full sm:max-w-388 z-1 justify-center gap-5 md:my-20 sm:my-16">
            <div className="flex w-full justify-start items-start flex-col">
              <h1 className="font-semibold text-2xl text-lightWhite leading-7">
                Change Password
              </h1>
              <p className="font-normal text-xl max-md:text-base text-blue leading-7 pt-1">
                Change your old password with new.
              </p>
            </div>
            <div className="w-full flex flex-col justify-center items-center">
              <Form
                form={form}
                onFinish={(values) => ChangePasswordHandler(values)}
                className="space-y-4 flex flex-col items-center justify-center w-full"
              >
                <Form.Item
                  name="currentPassword"
                  className="w-full flex flex-col justify-center items-center"
                  validateTrigger={["onBlur", "onChange"]}
                  rules={[
                    { required: true, message: "Password is required" },
                    {
                      pattern: /^(?!\s+$).*$/,
                      message: "Blank spaces are not allowed!",
                    },
                  ]}
                >
                  <div className="select-container flex items-center">
                    <input
                      className="email-description w-full"
                      placeholder="Old password"
                      type={!currentPassShow ? "password" : "text"}
                    />
                    <span
                      onClick={() => setCurrentPassShow(!currentPassShow)}
                      className="cursor-pointer"
                    >
                      {currentPassShow ? <PassShowIcon /> : <HideIcon />}
                    </span>
                  </div>
                </Form.Item>
                <Form.Item
                  name="newPassword"
                  className="w-full flex flex-col justify-center items-center"
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
                        const currentPassword =
                          getFieldValue("currentPassword");
                        if (
                          value &&
                          currentPassword &&
                          value === currentPassword
                        ) {
                          return Promise.reject(
                            new Error(
                              "New password must be different from the current password"
                            )
                          );
                        }
                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <div className="select-container flex items-center">
                    <input
                      className="email-description w-full"
                      placeholder="New password"
                      type={!newPassword ? "password" : "text"}
                    />
                    <span
                      onClick={() => setNewPassword(!newPassword)}
                      className="cursor-pointer"
                    >
                      {newPassword ? <PassShowIcon /> : <HideIcon />}
                    </span>
                  </div>
                </Form.Item>
                <Form.Item
                  name="confirmPassword"
                  dependencies={["newPassword"]}
                  className="w-full flex flex-col justify-center items-center"
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
                        if (value && value !== getFieldValue("newPassword")) {
                          return Promise.reject(
                            new Error("Passwords do not match!")
                          );
                        }
                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <div className="select-container flex items-center">
                    <input
                      className="email-description w-full"
                      placeholder="Confirm password"
                      type={!confirmPassword ? "password" : "text"}
                    />
                    <span
                      onClick={() => setConfirmPassword(!confirmPassword)}
                      className="cursor-pointer"
                    >
                      {confirmPassword ? <PassShowIcon /> : <HideIcon />}
                    </span>
                  </div>
                </Form.Item>

                <div className="flex items-center justify-center w-full">
                  <button
                    disabled={!submittable || loading ? true : false}
                    className={`${
                      !submittable || loading
                        ? "cursor-not-allowed bg-primary-btn"
                        : "cursor-pointer"
                    } primary__button !mt-14  text-black`}
                  >
                    {!loading ? " Change Password" : <ButtonSpinner />}
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};
export default ChangePassword;
