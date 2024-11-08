import FaceBookIcon from "../../../assets/images/svg/face-book";
import InstagramIcon from "../../../assets/images/svg/instagram";
import LinkedInIcon from "../../../assets/images/svg/linked-in";
import TwitterIcon from "../../../assets/images/svg/twitter";

const SocialIcon = () => {
  return (
    <>
      {" "}
      <div className="flex gap-5 justify-center items-center cursor-pointer">
        <a
          href="https://www.facebook.com/creatorwrk"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110"
        >
          <FaceBookIcon />
        </a>
        <a
          href="https://www.instagram.com/creatorwrk/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110"
        >
          <InstagramIcon />
        </a>
        <a
          href=" https://x.com/creatorwrk"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110"
        >
          <TwitterIcon />
        </a>
        <a
          href=" https://www.linkedin.com/company/creatorwrk/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110"
        >
          <LinkedInIcon />
        </a>
      </div>
    </>
  );
};

export default SocialIcon;
