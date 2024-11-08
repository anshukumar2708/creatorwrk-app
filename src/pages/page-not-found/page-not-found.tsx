import { Link } from "react-router-dom";
import PageLayout from "../../components/common/page-layout";

const PageNotFound = () => {
  const landingPageUrl = process.env.REACT_APP_LANDING_PAGE_URL;

  return (
    <PageLayout>
      <div className="not-found-height flex flex-col mx-auto w-full justify-center items-center">
        <div className="w-full flex flex-col justify-center items-center sm:-mt-28">
          <p className="sm:text-220 text-150 sm:max-h-250 max-h-200 outer-text flex justify-center items-center gap-1 w-full">
            <span className="mr-1">4</span>
            <span>0</span>
            <span>4</span>
          </p>
          <h3 className="text-lightWhite sm:text-32 text-26 text-center font-bold">
            Oops! Page Not Found
          </h3>
          <p className="text-blue text-lg font-normal text-center mt-2">
            It looks like the page you’re trying to reach doesn’t exist.
          </p>
          <div className="w-full flex flex-col justify-center items-center sm:mt-6 mt-3 max-sm:pl-5">
            <ul className="flex gap-2 flex-col  ">
              <li className="text-white font-normal text-lg list-disc">
                Double-check the URL for typos.
              </li>
              <li className="text-white font-normal text-lg list-disc">
                Return to the link{" "}
                <Link
                  className="underline hover:text-link-text cursor-pointer"
                  to="/"
                >
                  Home page
                </Link>
              </li>
            </ul>
          </div>
          <p className="text-white font-normal text-lg text-center pt-12 max-sm:pt-10 max-sm:mb-10">
            If you believe this is an error, please{" "}
            <Link
              className="underline hover:text-link-text cursor-pointer"
              to={`${landingPageUrl}/contact-us`}
            >
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default PageNotFound;
