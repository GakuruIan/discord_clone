"use client";

import React from "react";

// components
import Actiontooltip from "../Actiontooltip/Actiontooltip";

// icons
import { Plus } from "lucide-react";

// hooks
import { useModal } from "@/hooks/use-modal-store";

const NatigationAction = () => {
  const { onOpen } = useModal();

  return (
    <Actiontooltip label="create server" align="center" side="right">
      <button
        onClick={() => onOpen("CreateServer")}
        className="bg-slate-200 dark:bg-dark-50 p-3 rounded-md hover:bg-indigo-400 hover:text-white flex items-center justify-center"
      >
        <Plus size={18} />
      </button>
    </Actiontooltip>
  );
};

export default NatigationAction;
