"use client";

import React from "react";

// components
import Actiontooltip from "../Actiontooltip/Actiontooltip";

// icons
import { Plus } from "lucide-react";

// hooks
import { useModal } from "@/hooks/use-modal-store";

interface ServerProps {
  label: string;
  sectionType: "channel" | "members";
  channelType?: "public" | "private" | "restricted";
  role?: string;
  server?: string;
}

const ServerSection = ({ label, sectionType, role }: ServerProps) => {
  const { onOpen } = useModal();

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs uppercase font-semibold tracking-wide dark:text-zinc-400 text-zinc-500">
          {label}
        </p>
        {role !== "member" && sectionType == "channel" && (
          <Actiontooltip label="Create Channel" side="top" align="start">
            <button onClick={() => onOpen("CreateChannel")}>
              <Plus size={18} />
            </button>
          </Actiontooltip>
        )}
      </div>
    </div>
  );
};

export default ServerSection;
