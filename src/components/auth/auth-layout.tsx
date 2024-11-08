const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className=" w-full h-full flex justify-center items-center">
        <div className="h-full w-full">
          <div className="container mx-auto w-full flex justify-center items-center">
            <div className="!w-full flex justify-between items-center">
              <div className="z-50 w-full flex justify-center ">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
