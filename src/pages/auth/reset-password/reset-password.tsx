import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form } from "antd";
import HttpService from "../../../services/http.service";
import { API_CONFIG } from "../../../utils/api";
import { useSelector } from "react-redux";
import AuthLayout from "../../../components/auth/auth-layout";
import ButtonSpinner from "../../../components/common/button-spinner";
import { passwordValidation } from "../../../assets/locales/constant";
import HideIcon from "../../../assets/images/common/hide";
import PassShowIcon from "../../../assets/images/svg/pass-show";
import ForgotPswdTop from "../../../assets/images/svg/forgot-pswd";
import { useNotificationToaster } from "../../../hooks/use-notification-toaster";

const ResetPassword = () => {
  const [form] = Form.useForm();

  const [passShow, setPassShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const auth = useSelector((state: any) => state.auth);
  const navigate = useNavigate();
  const { token } = useParams();
  const [submittable, setSubmittable] = useState(false);
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

  const resetPasswordHandler = async (values: { password: string }) => {
    try {
      setLoading(true);
      const payload = {
        password: values?.password,
      };
      const response = await HttpService.post(
        `${API_CONFIG.path.resetPassword}/${token}`,
        {
          ...payload,
        }
      );
      if (response) {
        // message.success("Password reset Successful");
        navigate("/login");
        notify("success", "Password reset successful");
        setLoading(false);
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col items-center w-full justify-center max-w-388">
        {/* <img
          className="max-md:w-1xl max-md:h-20"
          src={forgotPassIcon}
          alt="forgot-password"
        /> */}
        <ForgotPswdTop />
        <h1 className="font-semibold text-2xl text-white leading-7 pt-8">
          Reset Password
        </h1>
        <h1 className="font-normal text-lg text-blue leading-7 text-center">
          Create your new password for{" "}
          <span className="text-white text-lg font-bold">
            {auth?.user?.email}
          </span>
        </h1>
        <div className="w-full flex flex-col justify-center items-center">
          <Form
            form={form}
            onFinish={(values) => resetPasswordHandler(values)}
            className="mt-10 space-y-12 flex flex-col items-center justify-center w-full"
          >
            <Form.Item
              name="password"
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
              ]}
            >
              <div className="select-container description-wrapper">
                <input
                  className="email-description w-full"
                  placeholder="New password*"
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
                    // <img src={eyeOffIcon} alt="eyeOff" />
                    <HideIcon />
                  )}
                </span>
              </div>
            </Form.Item>
            <div className="flex items-center justify-center max-sm:w-full">
              <button
                disabled={!submittable || loading ? true : false}
                className={`sm:px-12 ${
                  !submittable || loading
                    ? "cursor-not-allowed bg-primary-btn"
                    : "cursor-pointer"
                } primary__button w-full text-black`}
              >
                {!loading ? (
                  " RESET PASSWORD"
                ) : (
                  <ButtonSpinner loading={loading} />
                )}
              </button>
            </div>
          </Form>
        </div>
        <div className="text-blue text-base font-normal mt-14 max-md:mt-14 mb-2">
          Back to{" "}
          <Link to="/login" className="text-white">
            {" "}
            Login
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
