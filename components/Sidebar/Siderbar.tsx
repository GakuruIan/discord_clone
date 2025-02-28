"use client";

import { Plus } from "lucide-react";
import Image from "next/image";
import React from "react";

import { ScrollArea } from "../ui/scroll-area";

// dummy
import background from "@/public/background.jpg";

// components
import Actiontooltip from "../Actiontooltip/Actiontooltip";
import { ModeToggle } from "../mode-toggle";

import { useModal } from "@/hooks/use-modal-store";

import { UserButton } from "@clerk/nextjs";

const Siderbar = () => {
  const { onOpen } = useModal();
  return (
    <div className="flex flex-col items-center h-full  gap-y-2 px-1  py-4">
      <div className="border-b border-b-gray-300 dark:border-b-gray-600 pb-2">
        {/* create server */}
        <Actiontooltip label="create server" align="center" side="right">
          <button
            onClick={() => onOpen("CreateServer")}
            className="bg-slate-200 dark:bg-dark-50 p-3 rounded-md hover:bg-indigo-400 hover:text-white flex items-center justify-center"
          >
            <Plus size={18} />
          </button>
        </Actiontooltip>
        {/* create server*/}
      </div>
      {/* servers */}
      <div className="flex-1 h-full mt-2 flex flex-col gap-y-4">
        <ScrollArea>
          <div className="relative h-10 w-10 overflow-hidden rounded-[8px]">
            <Image src={background} fill alt="image" />
          </div>
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

export default Siderbar;
