import { Link } from "react-router-dom";
import NotResultFound from "../../assets/images/svg/not-result-found";
import ProfileNoJob from "../../assets/images/svg/profile-no-job";
import NoCompletedJob from "../../assets/images/svg/no-completed-job";
import NoExpireJobIcon from "../../assets/images/svg/no-expire-job";
import { IMyJobData, ImyJobFilter } from "../../interfaces/myJob";

const BoMyJobDataNotFound = ({
  data,
  filters,
  isLoading,
  searchLoading,
}: {
  data: IMyJobData[];
  filters: ImyJobFilter;
  isLoading: boolean;
  searchLoading: boolean;
}) => {
  return (
    <>
      {" "}
      {data?.length === 0 &&
        !isLoading &&
        !filters?.searchQuery &&
        !searchLoading && (
          <div className="flex flex-col justify-center items-center h-80 text-center ">
            {filters?.status === "active" && <ProfileNoJob />}
            {filters?.status === "completed" && <NoCompletedJob />}
            {filters?.status === "closed" && <NoExpireJobIcon />}
            <h1 className="text-white text-2xl font-semibold leading-7 mt-5">
              {filters?.status === "active" && "No Active Jobs"}
              {filters?.status === "completed" && "No Completed Job"}
              {filters?.status === "closed" && "No Closed Job"}
            </h1>

            <p className="text-lg font-normal text-blue">
              Currently, no jobs created yet.
            </p>

            <Link
              to="/create-job"
              className="w-44 h-11 flex flex-col justify-center items-center !mt-8 bg-profile-pattern hover:shadow-custom-white rounded-4xl rounded-1 font-semibold text-white text-base"
            >
              Create Job
            </Link>
          </div>
        )}
      {/* Not Found Data on Search */}
      {data?.length === 0 &&
        !isLoading &&
        filters?.searchQuery &&
        !searchLoading && (
          <div className="flex flex-col justify-center items-center gap-6 h-80">
            <div className="flex flex-col justify-center items-center space-y-4 ">
              <NotResultFound />
              <h1 className="text-white text-2xl font-semibold leading-7">
                No Result found
              </h1>
              <p className="text-lg font-normal leading-5 text-blue max-w-xs text-center">
                Sorry, there are no results for this search, please try another
                phase.
              </p>
            </div>
          </div>
        )}
    </>
  );
};

export default BoMyJobDataNotFound;
