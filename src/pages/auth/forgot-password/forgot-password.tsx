import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "antd";
import HttpService from "../../../services/http.service";
import { API_CONFIG } from "../../../utils/api";
import AuthLayout from "../../../components/auth/auth-layout";
import ButtonSpinner from "../../../components/common/button-spinner";
import { emailRegex } from "../../../assets/locales/constant";
import MessageIcon from "../../../assets/images/common/message";
import ForgotPswdTop from "../../../assets/images/svg/forgot-pswd";
import { useNotificationToaster } from "../../../hooks/use-notification-toaster";

const ForgotPassword = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
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

  const addEmailHandler = async (value: { email: string }) => {
    try {
      setLoading(true);
      const payload = {
        email: value?.email,
      };
      const response = await HttpService.post(API_CONFIG.path.forgotPassword, {
        ...payload,
      });
      if (response) {
        setLoading(false);
        // message.success(
        //   "If you are a registered user then only you will receive the link to reset the password"
        // );
        notify(
          "success",
          "If you are a registered user then only you will receive the link to reset the password"
        );
        navigate("/login");
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col justify-center items-center w-full md:max-w-388 max-md:mt-10">
        <div className="flex flex-col w-full justify-center items-center">
          {/* <img
            className="max-md:w-1xl max-md:h-20"
            src={forgotPassIcon}
            alt="forgot-password"
          /> */}
          <ForgotPswdTop />
          <h1 className="text-lightWhite text-mxl font-extrabold mt-2">
            Forgot Password?
          </h1>
          <h4 className="text-blue text-lg font-normal text-center max-w-sm max-md:p-2.5 hidden max-md:block">
            Please enter your email which associate to your account
          </h4>
        </div>

        <Form
          form={form}
          onFinish={(value) => addEmailHandler(value)}
          className="w-full"
        >
          <div className="flex items-center mt-7 ">
            <Form.Item
              name="email"
              className="w-full"
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
              <div className="select-container description-wrapper ">
                <input className="email-description" placeholder="Email" />
                <MessageIcon />
              </div>
            </Form.Item>
          </div>

          <div className="flex items-center justify-center ">
            <button
              disabled={!submittable || loading ? true : false}
              className={`${
                !submittable || loading
                  ? "cursor-not-allowed bg-primary-btn"
                  : "cursor-pointer"
              } primary__button mt-16  text-black`}
            >
              {!loading ? "SEND NOW" : <ButtonSpinner />}
            </button>
          </div>
        </Form>
        <p className="text-blue text-sm font-normal leading-4 text-center pt-14 mb-2">
          Back to{" "}
          <Link to="/login" className="text-lightWhite text-sm font-normal ">
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
