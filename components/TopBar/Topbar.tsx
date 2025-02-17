import React from "react";
import ServerSearch from "../Server/ServerSearch";

const Topbar = () => {
  return (
    <div className="sticky top-0 flex items-center px-2 z-40 justify-between py-6 bg-light-100/10 dark:bg-dark-200/10 backdrop-blur-lg flex-1 mb-4">
      <p className="text-base font-medium ">Discord</p>

      <ul className="flex items-center gap-x-6">
        <li>Home</li>
        <li>Gaming</li>
        <li>Entertainment</li>
        <li>Science & Tech</li>
        <li>Student Hub</li>
      </ul>

      <div className="">
        <ServerSearch />
      </div>
    </div>
  );
};

export default Topbar;
