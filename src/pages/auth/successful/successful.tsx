import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import AuthLayout from "../../../components/auth/auth-layout";
import { State } from "../../../interfaces/store";
import CongratulationIcon from "../../../assets/images/svg/congratulation";

const Successful = () => {
  const location = useLocation();
  const profileData = useSelector((state: State) => state.profile?.profile);

  console.log("location ", location);

  return (
    <AuthLayout>
      <div className="flex flex-col justify-center items-center lg:mt-28 md:mt-14">
        <div className="flex justify-center items-center flex-col gap-6">
          <CongratulationIcon width={82} height={82} />
          <div className="flex flex-col justify-center items-center gap-2">
            <h1 className="text-lightWhite text-2xl font-semibold leading-7 text-center capitalize">
              Congratulations, {profileData?.name}
            </h1>
            <h4 className="text-blue text-lg font-normal leading-7 max-w-96 text-center">
              {location?.state?.message}
            </h4>
          </div>
          <Link
            to="/"
            className="primary__button mt-12 mb-4 flex flex-row justify-center items-center"
          >
            {profileData?.userType === "creator"
              ? "EXPLORE FEED"
              : "Let's Create Jobs"}
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Successful;
