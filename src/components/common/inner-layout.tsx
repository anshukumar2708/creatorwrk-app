import { Link, useLocation } from "react-router-dom";
import RightArrowFeed from "../../assets/images/svg/right-arrow-feed";
import PageLayout from "./page-layout";

export const InnerLayout = ({ children }: any) => {
  const location = useLocation();

  return (
    <PageLayout>
      <div
        className={`flex justify-center w-full items-start flex-col  ${
          location?.pathname !== "/message" ? "mb-0" : "md:mb-0 mb-0"
        }`}
      >
        <div className="md:block hidden w-full">
          <div className="flex gap-2 justify-start items-center mb-5">
            <Link to="/" className="comment-name ">
              Home
            </Link>
            <RightArrowFeed />
            <h3 className="comment-name opacity-50 border-lightGrey">
              {location?.pathname === "/message" && "Message"}
              {location?.pathname === "/create-job" && "Create Job"}
              {location?.pathname?.startsWith("/update-job") && "Edit Job"}
            </h3>
          </div>
        </div>
        {/* <div className="flex justify-center h-full items-center gap-5 flex-col md:border-1 md:bg-[#060717] md:rounded-18 md:border-grey w-full"> */}
        <div
          className={`flex justify-center items-center gap-5 flex-col lg:border-1 lg:bg-[#060717] lg:rounded-18 lg:border-grey w-full lg:mb-16  ${
            location?.pathname !== "/message" ? "h-full" : ""
          }`}
        >
          {children}
        </div>
      </div>
    </PageLayout>
  );
};
export default InnerLayout;
