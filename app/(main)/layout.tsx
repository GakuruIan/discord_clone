import React from "react";

import { Siderbar } from "@/components/Sidebar/Siderbar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <div className="hidden md:flex w-[72px] fixed z-30 flex-col bg-light-100 dark:bg-dark-300 h-full">
        <Siderbar />
      </div>
      <main className="md:pl-[72px] flex-1 w-full h-full">{children}</main>
    </div>
  );
};

export default layout;
