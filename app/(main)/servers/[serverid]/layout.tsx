import React from "react";

// components
import ServerSideBar from "@/components/Server/ServerSideBar";

const layout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverid: string };
}) => {
  return (
    <>
      <div className="hidden md:flex w-60 z-20 fixed flex-col inset-y-0">
        <ServerSideBar serverId={params.serverid} />
      </div>
      <main className="md:pl-60 h-full">{children}</main>
    </>
  );
};

export default layout;
