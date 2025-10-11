"use client";

import CommonWrapper from "@/common/CommonWrapper";
import Link from "next/link";
// import { useRouter } from "next/navigation";

const page = () => {
  // const router = useRouter();
  return (
    <CommonWrapper>
      <div className="h-[60vh] flex flex-col items-center justify-center">
        <h3>You are not authorized to access this page</h3>
        <Link href="/" className="px-4 py-2 bg-brick-red text-white mt-3">Go Home</Link>
      </div>
    </CommonWrapper>
  );
};

export default page;
