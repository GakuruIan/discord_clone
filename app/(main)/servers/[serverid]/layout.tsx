import React from "react";

// components
import ServerSideBar from "@/components/Server/ServerSideBar";

const layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverid: string };
}) => {
  const { serverid } = await params;
  return (
    <>
      <div className="hidden md:flex w-60 z-20 fixed flex-col inset-y-0">
        <ServerSideBar serverId={serverid} />
      </div>
      <main className="md:pl-60 h-full">{children}</main>
    </>
  );
};

export default layout;
