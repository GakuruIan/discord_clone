"use client";
import React from "react";
import Image from "next/image";

// clerk
import { useAuth } from "@clerk/nextjs";

// router
import { useRouter } from "next/navigation";

// components
import Topbar from "@/components/TopBar/Topbar";
import Banner from "@/components/Banner/Banner";

// image
import cod from "@/public/COD.jpeg";
import pic from "@/public/background.jpg";

const Page = () => {
  const router = useRouter();

  const { userId } = useAuth();

  if (!userId) {
    router.push("/login");

    console.log("no user");
  }

  const servers = [1, 2, 3, 4];
  return (
    <div className="relative min-h-screen w-full dark:bg-dark-250  bg-light-200">
      {/* top bar */}
      <Topbar />

      <Banner />

      <div className="px-2">
        <p className="text-sm font-poppins tracking-wide mb-3 font-medium">
          Live
        </p>
        <div className="grid md:grid-cols-4 grid-cols-1 gap-4 pb-4">
          {/* server */}
          {servers.map((_, index) => {
            return (
              <div
                key={index}
                className="relative  transition-colors duration-75 overflow-hidden"
              >
                <div className="relative mb-1.5">
                  {/* server banner */}
                  <Image
                    src={cod}
                    alt="banner image"
                    className="w-full h-44 md:h-36 rounded-lg"
                  />
                  {/* server banner */}
                </div>

                <div className="pl-1">
                  <p className="text-sm font-poppins font-medium mb-1.5">
                    No way it&apos;s Awesome!!
                  </p>

                  <div className="flex items-center gap-x-2">
                    <div className="">
                      <Image
                        src={pic}
                        alt="profile image"
                        className="size-8 rounded-full"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-thin tracking-wider mb-0">
                        Username
                      </p>
                      <p className="text-gray-400 text-xs">Stream tag</p>
                    </div>
                  </div>
                </div>
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

export default Page;
