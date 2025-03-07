import React from "react";
import ServerSearch from "../Server/ServerSearch";

import { BellDot, Menu } from "lucide-react";

const Topbar = () => {
  return (
    <div className="sticky top-0 flex items-center px-2 z-10 justify-between py-4 bg-light-100/10 dark:bg-dark-200/10 backdrop-blur-lg flex-1 mb-4">
      <div className="flex items-center">
        <Menu size={16} className="md:hidden mr-2 block" />
        <p className="text-base font-medium ">Discord</p>
      </div>

      {/* <ul className="items-center gap-x-6 hidden md:flex">
        <li>Home</li>
        <li>Gaming</li>
        <li>Entertainment</li>
        <li>Science & Tech</li>
        <li>Student Hub</li>
      </ul> */}

      <div className="flex items-center gap-x-4">
        <ServerSearch />
        <BellDot size={18} className=" text-gray-500 dark:text-gray-300" />
      </div>
    </div>
  );
};

export default Topbar;
