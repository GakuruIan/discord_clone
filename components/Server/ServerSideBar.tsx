import React from "react";

// components
import ServerHeader from "./ServerHeader";
import { ScrollArea } from "../ui/scroll-area";
import ServerSearch from "./ServerSearch";
import { Separator } from "../ui/separator";
import ServerSection from "../ServerSection/ServerSection";
import ServerChannel from "./ServerChannel";

const ServerSideBar = () => {
  const Channels = [1, 2, 3, 4, 5];

  return (
    <div className="flex flex-col h-full w-full dark:bg-dark-250 bg-light-200">
      <ServerHeader />

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
