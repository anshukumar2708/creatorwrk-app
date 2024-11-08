import Footer from "../../components/common/footer";
import JobPostDetail from "../../components/common/job-post-detail";

const JobPostDetails = () => {
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center z-30">
        <JobPostDetail />
        <div className="container max-sm:hidden">
          <Footer />
        </div>
      </div>
    </>
  );
};
export default JobPostDetails;
