"use client";

import Postcommunity from "./Createcommunity";
import AllCommunityPost from "./AllCommunityPost";

const CommunityPage = () => {
  return (
    <div className=" ">
      <div className=" p-4 sm:p-6">
        <Postcommunity />

        <AllCommunityPost />
      </div>
    </div>
  );
};

export default CommunityPage;
