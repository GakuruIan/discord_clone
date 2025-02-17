"use client";
import React from "react";
import Link from "next/link";

// components
import Button from "@/components/Button/Button";

const page = () => {
  const handleSubmit = async () => {};
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
              <div className="flex md:justify-center h-full mt-10 ">
                <div className="w-full md:w-96">
                  <h3 className="text-4xl md:text-7xl font-bold text-center mb-3 dark:text-white text-neutral-950">
                    Hi there!
                  </h3>
                  <h6 className="text-sm text-gray-400 text-center">
                    Welcome to Streamer , streaming platform
                  </h6>
                  <div className="my-6 w-full">
                    <button className="px-4 py-3 w-full text-white border-gray-300 rounded-sm bg-indigo-700 hover:border-indigo-500 hover:bg-indigo-600  hover:text-white transition-colors duration-75">
                      Sign in with Google
                    </button>

                    <p className="text-gray-500 text-center my-8 dark:text-white">
                      OR
                    </p>
                  </div>
                  <div className="w-full md:w-96">
                    <form>
                      <div className="mb-8">
                        <label className="text-base  font-normal dark:text-white">
                          Email
                        </label>
                        <input
                          type="email"
                          className="w-full outline-0 px-2 py-3 bg-light-100 dark:bg-dark-50 dark:text-white bg-light mt-2 placeholder:text-sm focus:outline-indigo-400"
                          placeholder="John@gmail.com"
                          required
                        />
                      </div>

                      <div className="">
                        <label className="text-base font-roboto font-normal  dark:text-white">
                          Password
                        </label>
                        <input
                          type="password"
                          className="w-full  px-2 py-3 bg-light-100 dark:bg-dark-50 dark:text-white bg-light mt-2 placeholder:text-sm   f outline-0 "
                          placeholder="password"
                          required
                        />
                      </div>
                      <div className="mt-1 text-right">
                        <Link
                          href="/forgot-password"
                          className="text-gray-500 text-sm dark:text-white "
                        >
                          Forgot Password?
                        </Link>
                      </div>

                      <Button
                        label="Sign in"
                        onClick={handleSubmit}
                        style="dark:bg-white bg-dark-200 text-white dark:text-black font-semibold mt-8 hover:bg-primary-100"
                      />
                    </form>
                  </div>
                  <p className="mt-8 text-center dark:text-white">
                    <Link href="/register">
                      Don&apos;t have an account ? Sign Up
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
