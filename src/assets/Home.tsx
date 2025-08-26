import CommonWrapper from "@/common/CommonWrapper";

const Home = () => {
  return (
    <div className="bg-[#fbfaf6]">
      <CommonWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          {/* Left Section */}
          <div className="flex items-center justify-center py-10 lg:py-20">
            <div className="flex flex-col justify-center items-center gap-2 md:gap-4 text-center">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-48 lg:w-80 2xl:w-96 mx-auto lg:mx-0"
              />
              <p className="text-xl sm:text-2xl md:text-3xl text-[#1D1D1F] font-semibold">
                Community News Portal
              </p>
              <h1 className="text-[#A43C2F] font-bold text-3xl sm:text-4xl md:text-6xl">
                Coming Soon
              </h1>
            </div>
          </div>

          {/* Right Section */}
          <div className="relative flex items-center justify-center overflow-hidden">
            {/* Background SVGs */}
            <img
              src="/landing-2.svg"
              className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md lg:max-w-3xl"
              alt="Landing Graphic Top"
            />
            <img
              src="/landing-1.svg"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md lg:max-w-3xl"
              alt="Landing Graphic Bottom"
            />
          </div>
        </div>
      </CommonWrapper>
    </div>
  );
};

export default Home;
