"use client";

import React from "react";
import Link from "next/link";

// components
import Button from "@/components/Button/Button";

const page = () => {
  const handleSubmit = () => {};

  return (
    <>
      <div className="w-full">
        {/* form */}
        <div className="w-full">
          <div className="p-4">
            <div className="">
              <h2 className="font-poppins font-medium text-xl mb-8 dark:text-white text-neutral-950">
                Streamer
              </h2>
              <div className="flex mt-20 items-center md:justify-center h-full ">
                <div className="w-full md:w-96">
                  <h3 className="text-4xl md:text-7xl font-bold text-center mb-3 dark:text-white text-neutral-950">
                    Hi there!
                  </h3>
                  <h6 className="text-sm mb-4 text-gray-400 text-center">
                    Hey Streamer, let&apos;s get your back into your account
                  </h6>

                  <div className="w-full md:w-96">
                    <form>
                      <div className="">
                        <label className="text-base  font-normal dark:text-white">
                          Email
                        </label>
                        <input
                          type="email"
                          className="w-full outline-0 border-0 bg-light-100 px-2 py-3 dark:bg-dark-50 dark:text-white bg-light mt-2 placeholder:text-sm focus:outline-indigo-400"
                          placeholder="John@gmail.com"
                          required
                        />
                      </div>

                      <Button
                        label="Send reset code"
                        onClick={handleSubmit}
                        style="dark:bg-white text-black bg-dark-200 text-white dark:text-black text-sm font-semibold mt-8 hover:bg-primary-100"
                      />
                    </form>
                  </div>
                  <p className="mt-6 text-center dark:text-white">
                    <Link
                      href="/login"
                      className="font-roboto text-gray-400 hover:dark:text-white hover:text-gray-400"
                    >
                      Remember password ? Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* form */}
      </div>
    </>
  );
};

export default page;
