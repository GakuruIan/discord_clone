import { Search } from "lucide-react";
import React from "react";

const ServerSearch = () => {
  return (
    <div className="">
      <button className="px-2 py-2 flex items-center  gap-x-2 w-full rounded-md bg-zinc-500/10 hover:bg-zinc-500/20 dark:bg-dark-20 hover:dark:bg-dark-10 transition-colors duration-75">
        <Search className="size-4 text-gray-500 dark:text-gray-300" />
        <p className="text-sm text-gray-500 dark:text-gray-300">search</p>

        <kbd className="pointer-events-none ml-auto rounded dark:bg-dark-10 select-none text-[12px] flex items-center py-0.5 px-2  text-gray-400">
          <span className=" mr-1">ctrl</span> k
        </kbd>
      </button>
    </div>
  );
};

export default ServerSearch;
