"use client";
import React from "react";
import Image from "next/image";

// icons
import { User } from "lucide-react";

// components
import Topbar from "@/components/TopBar/Topbar";

// image
import nebula from "@/public/nebula.jpg";
import pic from "@/public/background.jpg";

const page = () => {
  const servers = [1];
  return (
    <div className="relative min-h-screen w-full dark:bg-dark-250  bg-light-200">
      {/* top bar */}
      <Topbar />

      <div className="px-2">
        <div className="grid md:grid-cols-4 grid-cols-1 gap-4 pb-4">
          {/* server */}
          {servers.map((_, index) => {
            return (
              <div
                key={index}
                className="relative dark:bg-dark-50 dark:hover:bg-dark-20 transition-colors duration-75 pb-4 rounded-lg overflow-hidden"
              >
                <div className="relative mb-8">
                  {/* server banner */}
                  <Image
                    src={nebula}
                    alt="banner image"
                    className="w-full h-44 md:h-36"
                  />
                  {/* server banner */}

                  {/* user profile */}
                  <div className="size-10  rounded-md overflow-hidden absolute -bottom-4 left-3 ">
                    <Image
                      src={pic}
                      alt="profile photo"
                      className="h-full w-full"
                    />
                  </div>
                  {/* user profile */}
                </div>

                {/*  */}
                <div className="px-2 ">
                  <div className="mb-4">
                    <h1 className="text-base mb-1 font-poppins font-medium">
                      Server name
                    </h1>
                    <p className="text-sm text-gray-400">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Ratione, facere sapiente deserunt
                    </p>
                  </div>

                  <div className="flex items-center gap-x-4">
                    {/* online users*/}
                    <div className="flex items-center gap-x-1">
                      <div className="p-1 bg-teal-400 rounded-full"></div>
                      <span className="text-sm text-gray-400">1200 online</span>
                    </div>
                    {/* online users*/}

                    {/* member count */}
                    <div className="flex items-center gap-x-1">
                      <User size={16} />
                      <span className="text-sm text-gray-400">Members</span>
                    </div>
                    {/* member count */}
                  </div>
                </div>

                {/*  */}
              </div>
            );
          })}
          {/* server */}
        </div>
      </div>
      {/* top bar */}
    </div>
  );
};

export default page;
