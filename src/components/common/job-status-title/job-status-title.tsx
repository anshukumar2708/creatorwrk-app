import JobCloseIcon from "../../../assets/images/svg/job-close-icon";
import JobCompleteIcon from "../../../assets/images/svg/job-complete-icon";

const JobStatusTitle = ({ jobStatus }: { jobStatus: string | undefined }) => {
  console.log();
  return (
    <>
      <div className="flex justify-center item-center gap-2 lg:pt-2">
        <span className="mt-1">
          {jobStatus === "completed" ? <JobCompleteIcon /> : <JobCloseIcon />}
        </span>
        <p
          className={` ${
            jobStatus === "completed"
              ? "text-completeText w-120"
              : "text-closeText w-90"
          }  font-normal text-base`}
        >
          Job {jobStatus}
        </p>
      </div>
    </>
  );
};

export default JobStatusTitle;
