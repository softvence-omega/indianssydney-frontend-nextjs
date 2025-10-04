"use client";

import CommonWrapper from "@/common/CommonWrapper";
import PrimaryButton from "@/components/reusable/PrimaryButton";
// import { useRouter } from "next/navigation";

const page = () => {
  // const router = useRouter();
  return (
    <CommonWrapper>
      <div className="h-[60vh] flex flex-col items-center justify-center">
        <h3>You are not authorized to access this page</h3>
        <PrimaryButton
          // onClick={() => router.push("/login")}
          title="Login"
          className="mt-4"
        />
      </div>
    </CommonWrapper>
  );
};

export default page;
