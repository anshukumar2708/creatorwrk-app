import Location from "../../../assets/images/svg/location";

const LocationResponsive = ({ data }: { data: string[] | undefined }) => {
  return (
    <>
      {" "}
      <div className="flex sm:gap-2 gap-1 items-center ">
        <div className="w-5 h-5">
          <Location />
        </div>

        <p className="xxs:block hidden">
          <span className="w-full text-base  font-normal leading-4 text-mediumViolet max-minSize:w-155 capitalize max-md:truncate">
            {data?.toString()?.replaceAll(",", ", ")}
          </span>
        </p>

        <p className="xxs:hidden max-minSize:hidden">
          {data && data?.length > 2 ? (
            <span className="w-full text-base  font-normal leading-4 text-mediumViolet max-minSize:w-155 capitalize max-md:truncate">
              {data?.slice(0, 2).toString()?.replaceAll(",", ", ")}
            </span>
          ) : (
            <span className="w-full text-base  font-normal leading-4 text-mediumViolet max-minSize:w-155 capitalize max-md:truncate">
              {data?.toString()?.replaceAll(",", ", ")}
            </span>
          )}
          {data && data?.length > 2 && (
            <span className="text-base  font-normal leading-4 text-mediumViolet">
              {" "}
              & more
            </span>
          )}
        </p>
        <p className="max-minSize:block hidden">
          {data && data?.length > 1 ? (
            <span className="w-full text-base  font-normal leading-4 text-mediumViolet max-minSize:w-155 capitalize max-md:truncate">
              {data?.slice(0, 1).toString()?.replaceAll(",", ", ")}
            </span>
          ) : (
            <span className="w-full text-base  font-normal leading-4 text-mediumViolet max-minSize:w-155 capitalize max-md:truncate">
              {data?.toString()?.replaceAll(",", ", ")}
            </span>
          )}
          {data && data.length > 1 && (
            <span className="text-base  font-normal leading-4 text-mediumViolet">
              {" "}
              & more
            </span>
          )}
        </p>
      </div>
    </>
  );
};

export default LocationResponsive;
