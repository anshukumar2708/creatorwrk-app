import { Link, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import AuthLayout from "../../../components/auth/auth-layout";
import { State } from "../../../interfaces/store";
import ConnectErrorIcon from "../../../assets/images/svg/connect-error-icon";

const SocialAccountError = () => {
  const [searchParams] = useSearchParams();
  const socialType = searchParams.get("errorType");
  const profileData = useSelector((state: State) => state.profile?.profile);

  return (
    <AuthLayout>
      <div className="flex flex-col justify-center items-center lg:mt-28 md:mt-14">
        <div className="flex justify-center items-center flex-col gap-5 max-w-600">
          <ConnectErrorIcon />
          <div className=" flex flex-col justify-center items-center gap-10">
            <h1 className="text-lightWhite text-2xl font-semibold leading-8 text-center">
              <span className="capitalize">{profileData?.name}</span> your
              account has not connected with {socialType?.split("-")[0]}
            </h1>
            <div className="flex flex-col justify-center items-center w-full">
              <Link
                to="/social-account"
                className="primary__button flex flex-row justify-center items-center"
              >
                Please Connect
              </Link>
              <Link
                to="/"
                className="text-base font-semibold sm:mt-6 mt-5 text-lightWhite hover:text-smallBlue"
              >
                skip
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SocialAccountError;
