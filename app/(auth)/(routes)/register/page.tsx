"use client";

// clerk
import { useSignUp } from "@clerk/nextjs";

import React, { useState } from "react";
import Link from "next/link";

// components
import Button from "@/components/Button/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { toast } from "sonner";

// zod and form schema
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import OPTVerification from "@/components/OTPVerification/OPTVerification";

const formSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long.")
    .max(20, "username cannot be more than 20 characters")
    .regex(
      /^[a-zA-Z][a-zA-Z0-9_]*$/,
      "Username must start with a letter and contain only letters, numbers, and underscores."
    ),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email, Please enter a valid Email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .max(50, "Password cannot exceed 50 characters.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/\d/, "Password must contain at least one number.")
    .regex(
      /[@$!%*?&]/,
      "Password must contain at least one special character (@, $, !, %, *, ?, &)."
    ),
});

const Page = () => {
  const { isLoaded, signUp } = useSignUp();
  const [verifying, setVerifying] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { username, email, password } = values;
    if (!isLoaded) return;

    try {
      // start the log sign process
      await signUp.create({
        username,
        emailAddress: email,
        password,
      });

      // send user verification code
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      // setting the verification to true to show the verification page
      setVerifying(true);

      toast.success("Account created successfully", {
        description: "A verification code has being sent to your Email",
      });
    } catch (error) {
      toast("An error has occurred", {
        description: "Please try again Later",
      });

      console.log(error);
    }
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const isLoading = form.formState.isLoading;

  console.log(verifying);
  if (verifying) {
    return <OPTVerification />;
  }

  return (
    <>
      <div className="w-full h-full">
        {/* form */}
        <div className="w-full">
          <div className="p-4">
            <div className="">
              <h2 className="font-poppins font-medium text-xl mb-4 dark:text-white text-neutral-950">
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
                      Sign up with Google
                    </button>

                    <p className="text-gray-500 text-center my-6 dark:text-white">
                      OR
                    </p>
                  </div>
                  <div className="w-full md:w-96">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="mb-6">
                          <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-base  font-normal dark:text-white">
                                  Create Username
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="text"
                                    placeholder="Enter username"
                                    disabled={isLoading}
                                    className="w-full outline-0 px-2 py-3  bg-light-200 dark:bg-dark-50 dark:text-white  mt-2 placeholder:text-sm dark:border-0 rounded-sm placeholder:dark:text-gray-400"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="mb-6">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-base  font-normal dark:text-white">
                                  Email
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="email"
                                    placeholder="John@gmail.com"
                                    disabled={isLoading}
                                    className="w-full outline-0 px-2 py-3  bg-light-200 dark:bg-dark-50 dark:text-white  mt-2 placeholder:text-sm dark:border-0 rounded-sm placeholder:dark:text-gray-400"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="mb-6">
                          <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-base  font-normal dark:text-white">
                                  Password
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="password"
                                    placeholder="New password"
                                    disabled={isLoading}
                                    className="w-full outline-0 px-2 py-3  bg-light-200 dark:bg-dark-50 dark:text-white  mt-2 placeholder:text-sm dark:border-0 rounded-sm placeholder:dark:text-gray-400"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <Button
                          disabled={isLoading}
                          type="submit"
                          label="Sign up"
                          style="dark:bg-white bg-dark-200 text-white dark:text-black font-semibold mt-4 hover:bg-primary-100"
                        />
                      </form>
                    </Form>
                  </div>
                  <p className="mt-8 text-center  dark:text-white">
                    <Link href="/login">Have an account ? Sign in</Link>
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

export default Page;
