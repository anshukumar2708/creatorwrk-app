import { FC, lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { State } from "./interfaces/store";

const PageNotFound = lazy(
  () => import("./pages/page-not-found/page-not-found")
);
const SocialAccountError = lazy(
  () => import("./pages/auth/social-account-error/social-account-error")
);
const SetUpProfile = lazy(
  () => import("./pages/set-up-profile/set-up-profile")
);
const PostJob = lazy(() => import("./pages/auth/post-job/post-job"));
const SocialAccount = lazy(
  () => import("./pages/auth/social-account/social-account")
);
const ChangePassword = lazy(
  () => import("./pages/auth/change-password/change-password")
);
const JobPostDetails = lazy(
  () => import("./pages/job-post-details/job-post-details")
);
const MyJob = lazy(() => import("./pages/my-job/my-job"));
const Profile = lazy(() => import("./pages/profile/profile"));
const CreateUpdateJob = lazy(() => import("./pages/job/create-update-job"));
const Message = lazy(() => import("./pages/message/message"));
const EditProfile = lazy(() => import("./pages/edit-profile/edit-profile"));
const SignUp = lazy(() => import("./pages/auth/sign-up/sign-up"));
const Login = lazy(() => import("./pages/auth/login/login"));
const Home = lazy(() => import("./pages/home/home"));
const EmailVerification = lazy(
  () => import("./pages/auth/email-verification/email-verification")
);
const ForgotPassword = lazy(
  () => import("./pages/auth/forgot-password/forgot-password")
);
const ResetPassword = lazy(
  () => import("./pages/auth/reset-password/reset-password")
);
const Successful = lazy(() => import("./pages/auth/successful/successful"));
const FeedDetails = lazy(() => import("./pages/feed-details/feed-details"));

// interface RouterProps {
//   api: any;
// }
const Router: FC = () => {
  // const [loading, setLoading] = useState(false);
  const location = useLocation();
  const auth = useSelector((state: State) => state?.auth);
  const {
    emailVerifiedAt: isEmailVerify,
    userType,
    status: userStatus,
  } = useSelector((state: State) => state?.profile?.profile);

  const isLoggedIn = auth.login;

  // useEffect(() => {
  //   if (isLoggedIn && isEmailVerify) {
  //     setLoading(true);
  //     const timer = setTimeout(() => {
  //       setLoading(false);
  //     }, 1000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [isLoggedIn, isEmailVerify]);

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path={"/sign-up"} element={<SignUp />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/forgot-password"} element={<ForgotPassword />} />
        <Route path={"/reset-password/:token"} element={<ResetPassword />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  if (isEmailVerify === null || undefined) {
    return (
      <Routes>
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="*" element={<Navigate to="/email-verification" />} />
      </Routes>
    );
  }

  // if (loading) {
  //   return <Loader note="From router" />;
  // }

  if (userType === "creator" && isEmailVerify !== null) {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/successful" element={<Successful />} />
        <Route path="/social-account/error" element={<SocialAccountError />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/message" element={<Message />} />
        <Route path="/my-job" element={<MyJob />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/set-up-profile" element={<SetUpProfile />} />
        {userStatus === "active" && (
          <Route path="/feed-details/:feedSlug" element={<FeedDetails />} />
        )}
        {userStatus === "active" && (
          <Route
            path="/my-job/feed-details/:feedSlug"
            element={<FeedDetails />}
          />
        )}
        <Route path="/social-account" element={<SocialAccount />} />
        <Route path="/social-account/youtube/*" element={<SocialAccount />} />
        <Route path="/social-account/instagram/*" element={<SocialAccount />} />
        <Route
          path="/business-owner-profile/:slug"
          element={<Profile />}
        />{" "}
        <Route path="/not-found" element={<PageNotFound />} />
        <Route
          path="*"
          element={
            <Navigate
              to={
                location.pathname === "/login" ||
                location.pathname === "/sign-up"
                  ? "/"
                  : "/not-found"
              }
            />
          }
        />
      </Routes>
    );
  }

  if (userType === "business_owner" && isEmailVerify !== null) {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/successful" element={<Successful />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/set-up-profile" element={<SetUpProfile />} />
        <Route path="/message" element={<Message />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/my-job" element={<MyJob />} />
        <Route path="/create-job" element={<CreateUpdateJob />} />
        <Route path="/update-job/:jobSlug" element={<CreateUpdateJob />} />
        <Route path="/job-post-details/:jobSlug" element={<JobPostDetails />} />
        <Route
          path="/my-job/job-post-details/:jobSlug"
          element={<JobPostDetails />}
        />
        <Route path="/influencer-profile/:slug" element={<Profile />} />{" "}
        <Route path="/not-found" element={<PageNotFound />} />
        <Route
          path="*"
          element={
            <Navigate
              to={
                location.pathname === "/login" ||
                location.pathname === "/sign-up"
                  ? "/"
                  : "/not-found"
              }
            />
          }
        />
      </Routes>
    );
  }
};

export default Router;
