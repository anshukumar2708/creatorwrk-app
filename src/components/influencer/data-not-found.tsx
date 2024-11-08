import NoJobs from "../../../src/assets/images/svg/noJobs";
const DataNotFound = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-6 sm:mt-16 mt-10">
        <div className="flex flex-col justify-center items-center">
          <NoJobs />
          <h1 className="text-white text-2xl font-semibold leading-7 pt-7 pb-2.5">
            No jobs available!
          </h1>
          <p className="text-lg font-normal leading-5 text-blue max-w-xs text-center">
            Currently do not have any jobs available. please check back later
            for new opportunities
          </p>
        </div>
      </div>
    </div>
  );
};
export default DataNotFound;
