"use client";
import React from "react";

import { MemberRole, ChannelType, Channel } from "@prisma/client";

import { ServerWithImageProps } from "@/types";

interface channelProps {
  channel: Channel;
  channelType: ChannelType;
  role: MemberRole;
  server: ServerWithImageProps;
}

import { Edit, Hash, Mic, Trash, Video } from "lucide-react";
import Actiontooltip from "../Actiontooltip/Actiontooltip";

// hooks
import { useModal } from "@/hooks/use-modal-store";

const IconMap = {
  TEXT: Hash,
  AUDIO: Mic,
  VIDEO: Video,
};

const ServerChannel = ({
  channel,
  channelType,
  role,
  server,
}: channelProps) => {
  const Icon = IconMap[channelType];

  const { onOpen } = useModal();
  return (
    <button className="group w-full flex items-center gap-x-2 text-zinc-500 dark:text-zinc-400 hover:bg-indigo-500/10 dark:hover:bg-dark-20 py-2 px-2 rounded-md transition-colors duration-75">
      <Icon className="text-zinc-400 size-4" />
      <p className="text-sm group-hover:text-gray-600 group-hover:dark:text-zinc-300">
        {channel?.name}
      </p>

      {channel.name !== "general" && role !== MemberRole.MEMBER && (
        <div className="flex ml-auto items-center gap-x-2">
          <Actiontooltip label="Edit" align="start" side="top">
            <Edit
              onClick={() => onOpen("EditChannel", { server, channel })}
              size={16}
              className="hidden group-hover:block group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
            />
          </Actiontooltip>

          <Actiontooltip label="Delete" align="start" side="top">
            <Trash
              onClick={() => onOpen("DeleteChannel", { server, channel })}
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
