"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

import { ServerWithOwnerProps } from "@/types";

// clerk
import { useAuth } from "@clerk/nextjs";

// router
import { useRouter } from "next/navigation";

// components
import Topbar from "@/components/TopBar/Topbar";
import Banner from "@/components/Banner/Banner";
import Button from "@/components/Button/Button";

// axios
import axios from "axios";

// toast
import { toast } from "sonner";

const Page = () => {
  const [servers, setServers] = useState<ServerWithOwnerProps[]>([]);
  const router = useRouter();

  const { userId, isLoaded } = useAuth();

  const FetchData = async () => {
    await axios
      .get("/api/servers")
      .then((res) => {
        if (res.status === 200) {
          setServers(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("An error occurred");
      });
  };

  useEffect(() => {
    if (!isLoaded) return;

    if (!userId) {
      router.push("/login");

      console.log("no user");
    }

    FetchData();
  }, [isLoaded, userId, router]);

  return (
    <div className="relative min-h-screen w-full dark:bg-dark-250  bg-light-200">
      {/* top bar */}
      <Topbar />

      <Banner />

      <div className="px-2 mt-4">
        {/* <p className="text-sm font-poppins tracking-wide mb-3 font-medium">
          Live
        </p> */}
        <div>
          {/* server */}
          {servers.length > 0 ? (
            <div className="grid md:grid-cols-4 grid-cols-1 gap-4 pb-4">
              {servers.map((server) => {
                return (
                  <div
                    key={server?.id}
                    className="relative  transition-colors duration-75 overflow-hidden"
                  >
                    <div className="relative mb-1.5 h-44 md:h-36 w-full ">
                      {/* server banner */}
                      <Image
                        src={server?.ImageUrl.url}
                        alt="banner image"
                        fill
                        className="  rounded-lg"
                      />
                      {/* server banner */}
                    </div>

                    <div className="pl-1">
                      <p className="text-sm font-poppins font-medium mb-1.5">
                        {server.name}
                      </p>

                      <div className="flex items-center gap-x-2">
                        <div className="relative h-8 w-8 overflow-hidden">
                          <Image
                            src={server.owner.avatar}
                            alt="profile image"
                            fill
                            className="rounded-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-thin tracking-wider mb-0">
                            {server.owner.username}
                          </p>
                          <p className="text-gray-400 text-xs">Stream tag</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center w-full text-center mt-10">
              <p className="text-gray-600 dark:text-gray-400 mb-5">
                Looks like there no other servers to explore. Why not Invite
                your friends to join?
              </p>

              <Button
                type="button"
                label="Invite"
                style="dark:bg-white bg-dark-200 text-white dark:text-black font-semibold  hover:bg-primary-100 w-44"
              />
            </div>
          )}

          {/* server */}
        </div>
      </div>
      {/* top bar */}
    </div>
  );
};

export default Page;
