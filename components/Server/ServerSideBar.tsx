import React from "react";

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

  return (
    <div className="flex flex-col h-full w-full dark:bg-dark-250 bg-light-200">
      <ServerHeader server={server} role={role as MemberRole} />

      <ScrollArea>
        <div className="my-4 px-2">
          <ServerSearch />
          <Separator />

          {TextChannels.length > 0 && (
            <div className="mt-4">
              <ServerSection
                sectionType="channel"
                role="admin"
                label="Text channels"
              />
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
          )}

          {AudioChannels.length > 0 && (
            <div className="mt-4">
              <ServerSection
                sectionType="channel"
                role={role}
                label="Audio channels"
              />
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
          )}

          {VideoChannels.length > 0 && (
            <div className="mt-4">
              <ServerSection
                sectionType="channel"
                role={role}
                label="Video channels"
              />
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
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ServerSideBar;
