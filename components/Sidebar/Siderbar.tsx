import React from "react";

import { ScrollArea } from "../ui/scroll-area";

// components
import { ModeToggle } from "../mode-toggle";
import NavigationItem from "../Navigation/NavigationItem";
import NavigationAction from "../Navigation/NavigationAction";

// clerk auth button
import { UserButton } from "@clerk/nextjs";

// db
import { db } from "@/lib/db";
import { currentUser } from "@/lib/current-user";

export const Siderbar = async () => {
  const user = await currentUser();

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          userId: user?.id,
        },
      },
    },
    include: {
      ImageUrl: true,
    },
  });

  return (
    <div className="flex flex-col items-center h-full  gap-y-2 px-1  py-4">
      <div className="border-b border-b-gray-300 dark:border-b-gray-600 pb-2">
        {/* create server */}

        <NavigationAction />
        {/* <Actiontooltip label="create server" align="center" side="right">
          <button
            onClick={() => onOpen("CreateServer")}
            className="bg-slate-200 dark:bg-dark-50 p-3 rounded-md hover:bg-indigo-400 hover:text-white flex items-center justify-center"
          >
            <Plus size={18} />
          </button>
        </Actiontooltip> */}
        {/* create server*/}
      </div>
      {/* servers */}
      <div className="flex-1 h-full mt-2 flex flex-col gap-y-4">
        <ScrollArea>
          {servers.map((server) => (
            <NavigationItem
              key={server.id}
              id={server.id}
              name={server.name}
              imageUrl={server?.ImageUrl?.url as string}
            />
          ))}
        </ScrollArea>
      </div>
      {/* servers */}

      {/* user */}
      <div className="flex flex-col gap-y-5">
        <div className="flex items-center my-4 justify-center dark:text-white">
          <ModeToggle />
        </div>

        <div className="">
          <div className=" p-3.5 rounded-full">
            <UserButton />
          </div>
        </div>
      </div>
      {/* user */}
    </div>
  );
};
