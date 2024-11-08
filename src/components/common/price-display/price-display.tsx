import Rupee from "../../../assets/images/svg/rupee";

const PriceDisplay = ({
  minPrice,
  maxPrice,
}: {
  minPrice: string | number | undefined;
  maxPrice: string | number | undefined;
}) => {
  return (
    <>
      {minPrice !== maxPrice ? (
        <div className="flex items-center">
          <Rupee />
          {minPrice}
          <span className="mx-1">-</span>
          <Rupee />
          {maxPrice}
        </div>
      ) : (
        <div className="flex items-center">
          <Rupee />
          {minPrice}
        </div>
      )}
    </>
  );
};

export default PriceDisplay;
