"use client";

import React from "react";

interface NavigationProps {
  id: string;
  name: string;
  imageUrl: string;
}

// routing
import { useParams, useRouter } from "next/navigation";

// util
import { cn } from "@/lib/utils";

import Image from "next/image";

// components
import Actiontooltip from "../Actiontooltip/Actiontooltip";

const NavigationItem: React.FC<NavigationProps> = ({ id, name, imageUrl }) => {
  const params = useParams();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/servers/${id}`);
  };

  return (
    <Actiontooltip align="center" side="right" label={name}>
      <button
        onClick={handleClick}
        className="group relative flex items-center"
      >
        <div
          className={cn(
            "absolute left-0 dark:bg-indigo-300 bg-zinc-500 rounded-full transition-all duration-75 w-[3px]",
            params?.serverid !== id && "group-hover:h-[20px]",
            params?.serverid === id ? "h-[36px]" : "h-[8px]"
          )}
        />
        <div className="relative size-10 mx-2.5 overflow-hidden rounded-[6px]">
          <Image src={imageUrl} fill alt="channel image" />
        </div>
      </button>
    </Actiontooltip>
  );
};

export default NavigationItem;
