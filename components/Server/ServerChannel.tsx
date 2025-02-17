import React from "react";

interface channelProps {
  channel: string;
  channelType: "text" | "audio" | "video";
  role: "admin" | "moderator" | "member";
}

import { Edit, Hash, Mic, Trash, Video } from "lucide-react";
import Actiontooltip from "../Actiontooltip/Actiontooltip";

const IconMap = {
  text: Hash,
  audio: Mic,
  video: Video,
};

const ServerChannel = ({ channel, channelType, role }: channelProps) => {
  const Icon = IconMap[channelType];
  return (
    <button className="group w-full flex items-center gap-x-2 text-zinc-500 dark:text-zinc-400 hover:bg-indigo-500/10 dark:hover:bg-dark-20 py-2 px-2 rounded-md transition-colors duration-75">
      <Icon className="text-zinc-400 size-4" />
      <p className="text-sm group-hover:text-gray-600 group-hover:dark:text-zinc-300">
        {channel}
      </p>

      {channel !== "general" && role !== "member" && (
        <div className="flex ml-auto items-center gap-x-2">
          <Actiontooltip label="Edit" align="start" side="top">
            <Edit
              size={16}
              className="hidden group-hover:block group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
            />
          </Actiontooltip>

          <Actiontooltip label="Delete" align="start" side="top">
            <Trash
              size={16}
              className="hidden group-hover:block group-hover:text-rose-500"
            />
          </Actiontooltip>
        </div>
      )}
    </button>
  );
};

export default ServerChannel;
