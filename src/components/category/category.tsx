import Slider, { Settings } from "react-slick";
import RightArrow from "../../assets/images/svg/right-arrow";

const Category = ({ data }: { data: string[] | undefined }) => {
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight: true,
    nextArrow: (
      <span className="md:hidden max-sm:w-6">
        <RightArrow />
      </span>
    ),
  };
  return (
    <>
      {" "}
      <div className="w-full md:block hidden">
        <div className="flex justify-between items-center category-slider max-md:overflow-hidden">
          <div className="flex justify-start items-center gap-2   flex-wrap">
            {data?.map((category: string, index: number) => (
              <div
                className="flex justify-center items-center gap-4"
                key={index}
              >
                <div className="category">
                  <p className="category-text capitalize text-sm">{category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="md:hidden block">
        <div
          className="flex justify-between items-center category-slider"
          onClick={(e) => e.stopPropagation()}
        >
          {data && data?.length >= 3 && (
            <Slider {...settings} className="w-full">
              {data?.map((category: string, index: number) => (
                <div
                  className=" flex justify-center items-center gap-4 !w-10"
                  key={`${index}`}
                >
                  <div className="category ml-10">
                    <p className="category-text capitalize text-sm">
                      {category}
                    </p>
                  </div>
                </div>
              ))}
            </Slider>
          )}
          {data && data?.length < 3 && (
            <div className="flex justify-start items-center gap-2">
              {data?.map((category: string, index: number) => (
                <div
                  className="flex justify-center items-center gap-4"
                  key={index}
                >
                  <div className="category">
                    <p className="category-text capitalize text-sm">
                      {category}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Category;
