import Footer from "./footer";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative w-full">
      <div className="w-full">
        <div className="flex justify-center items-center w-full max-md:items-baseline h-full">
          <div className="container mx-auto z-1">
            <div className="z-0 w-full">{children}</div>
            <div className="w-full sm:block hidden">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
