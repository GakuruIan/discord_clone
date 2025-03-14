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
  const Channels = [1, 2, 3, 4, 5];

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

  const TextChannel = server?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );

  const AudioChannel = server?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );

  const VoiceChannel = server?.channels.filter(
    (channel) => channel.type === ChannelType.VOICE
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

          {/* add condition to check the length of channels */}
          <div className="mt-4">
            <ServerSection
              sectionType="channel"
              role="admin"
              label="Text channels"
            />
            {Channels.map((_, index) => {
              return (
                <ServerChannel
                  key={index}
                  channel={`Channel ${index}`}
                  role="admin"
                  channelType="text"
                />
              );
            })}
          </div>
          {/* add condition to check the length of channels */}

          {/* add condition to check the length of channels */}
          <div className="mt-4">
            <ServerSection
              sectionType="channel"
              role="admin"
              label="Audio channels"
            />
            {Channels.map((_, index) => {
              return (
                <ServerChannel
                  key={index}
                  channel={`Channel ${index}`}
                  role="admin"
                  channelType="audio"
                />
              );
            })}
          </div>
          {/* add condition to check the length of channels */}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ServerSideBar;
