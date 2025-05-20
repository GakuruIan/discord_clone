import React from "react";

import { Hash, Mic, Video, ShieldCheck, ShieldAlert } from "lucide-react";

// interface
interface serverSideProps {
  serverId: string;
}

//prisma
import { ChannelType, MemberRole } from "@prisma/client";

// components
import ServerHeader from "./ServerHeader";
import { ScrollArea } from "../ui/scroll-area";
import ServerSearch from "./ServerSearch";
import { Separator } from "../ui/separator";
import ServerSection from "../ServerSection/ServerSection";
import ServerChannel from "./ServerChannel";
import ServerMember from "../ServerMember/ServerMember";

// utils
import { db } from "@/lib/db";
import { currentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";

const ServerSideBar: React.FC<serverSideProps> = async ({ serverId }) => {
  const user = await currentUser();

  if (!user) {
    return redirect("/login");
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          user: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  const TextChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );

  const AudioChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );

  const VideoChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );

  const Members = server?.members.filter(
    (member) => member?.userId !== user.id
  );

  const role = server.members.find(
    (member) => member?.userId === user.id
  )?.role;

  const IconMap = {
    [ChannelType.TEXT]: <Hash className="size-4 mr-2" />,
    [ChannelType.AUDIO]: <Mic className="size-4 mr-2" />,
    [ChannelType.VIDEO]: <Video className="size-4 mr-2" />,
  };

  const RoleIconMap = {
    [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 ml-3" />,
    [MemberRole.MODERATOR]: <ShieldCheck className="h-4 w-4 ml-3" />,
    [MemberRole.MEMBER]: null,
  };

  return (
    <div className="flex flex-col h-full w-full dark:bg-dark-250 bg-light-200">
      <ServerHeader server={server} role={role as MemberRole} />

      <ScrollArea>
        <div className="my-4 px-2">
          <ServerSearch
            data={[
              {
                label: "Text Channels",
                type: "channel",
                data: TextChannels.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: IconMap[channel.type],
                })),
              },
              {
                label: "Audio Channels",
                type: "channel",
                data: AudioChannels.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: IconMap[channel.type],
                })),
              },
              {
                label: "Video Channels",
                type: "channel",
                data: VideoChannels.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: IconMap[channel.type],
                })),
              },
              {
                label: "Members",
                type: "members",
                data: Members.map((member) => ({
                  id: member.id,
                  name: member.user.username,
                  icon: RoleIconMap[member.role],
                })),
              },
            ]}
          />
          <Separator />

          {TextChannels.length > 0 && (
            <div className="mt-4">
              <ServerSection
                sectionType="channel"
                role="admin"
                label="Text channels"
              />
              <div className="space-y-[2px]">
                {TextChannels.map((channel) => {
                  return (
                    <ServerChannel
                      key={channel.id}
                      channel={channel}
                      role={role as MemberRole}
                      channelType={channel.type}
                      server={server}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {AudioChannels.length > 0 && (
            <div className="mt-4">
              <ServerSection
                sectionType="channel"
                role={role}
                label="Audio channels"
              />
              <div className="space-y-[2px]">
                {AudioChannels.map((channel) => {
                  return (
                    <ServerChannel
                      key={channel.id}
                      channel={channel}
                      role={role as MemberRole}
                      channelType={channel.type}
                      server={server}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {VideoChannels.length > 0 && (
            <div className="mt-4">
              <ServerSection
                sectionType="channel"
                role={role}
                label="Video channels"
              />{" "}
              <div className="space-y-[2px]">
                {VideoChannels.map((channel) => {
                  return (
                    <ServerChannel
                      key={channel.id}
                      channel={channel}
                      role={role as MemberRole}
                      channelType={channel.type}
                      server={server}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {Members?.length > 0 && (
            <div className="mt-4">
              <ServerSection
                sectionType="members"
                role={role}
                label="Members"
              />
              <div className="space-y-[2px]">
                {Members?.map((member) => {
                  return (
                    <ServerMember
                      key={member.id}
                      member={member}
                      server={server}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ServerSideBar;
