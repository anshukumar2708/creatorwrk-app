import { Modal } from "antd";
import { Link } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";
import BalanceStar from "../../assets/images/svg/balance-star";
import { useNavigate } from "react-router-dom";

const BalanceInfluencer = ({
  balanceInflustar,
  setBalanceInflustar,
}: {
  balanceInflustar: boolean;
  setBalanceInflustar: Dispatch<SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const landingPageUrl = process.env.REACT_APP_LANDING_PAGE_URL;

  const handleCancel = () => {
    setBalanceInflustar(false);
    document.body.style.overflow = "unset";
  };
  const goBackHandler = () => {
    navigate(`${landingPageUrl}/contact-us`);
    setBalanceInflustar(false);
    document.body.style.overflow = "unset";
  };

  return (
    <>
      <Modal
        className="verification-modal common-modal modal-bottom sm:!max-w-450"
        open={balanceInflustar}
        onOk={handleCancel}
        onCancel={handleCancel}
        width={450}
        centered
      >
        <div className="bg-primary  flex flex-col justify-center items-center rounded-[18px]">
          <div className="flex flex-col justify-center items-center w-full h-388 sm:h-395 rounded-18 border border-grey space-y-1.5 p-2.5 text-center">
            <div className="relative flex justify-center items-center">
              <BalanceStar />
              <h1 className="text-lightWhite sm:text-2xl text-xl font-semibold absolute bottom-3">
                Oops!
              </h1>
            </div>
            <p className="text-lg font-normal text-blue max-w-xs">
              It seems like your Influstar balance has reached its limit, to get
              more Influstar.
            </p>
            <button
              onClick={goBackHandler}
              className="w-44 h-11 !my-8 border border-primary hover:bg-white hover:text-black rounded-3xl font-semibold text-white text-base"
            >
              <Link
                to={`${landingPageUrl}/contact-us`}
                className="hover:text-black"
                rel="noopener noreferrer"
              >
                Contact us
              </Link>
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default BalanceInfluencer;
