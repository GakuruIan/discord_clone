"use client";
import React from "react";
import Link from "next/link";

// clerk
import { useSignIn, useAuth } from "@clerk/nextjs";

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

// toaster
import { toast } from "sonner";

// zod and form schema
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// router
import { useRouter } from "next/navigation";

const formSchema = z.object({
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
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();

  const [isLoading, setIsLoading] = React.useState(false);

  const { userId } = useAuth();

  if (userId) router.push("/");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { email, password } = values;

    setIsLoading(true);

    if (!isLoaded) return;

    return toast.promise(
      (async () => {
        const signInAttempt = await signIn.create({
          identifier: email,
          password,
        });

        if (signInAttempt.status === "complete") {
          await setActive({ session: signInAttempt.createdSessionId });
          setIsLoading(false);
          router.push("/");
        } else {
          setIsLoading(false);
          console.error("Sign-in requires further steps:", signInAttempt);
          throw new Error("Sign-in requires further verification.");
        }
      })(),
      {
        loading: "Signing in...",
        success: "Login successful!",
        error: "Failed to sign in. Please check your credentials.",
        position: "top-center",
      }
    );
  };

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
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)}>
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

                        <div className="">
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
                                    placeholder="Password"
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
                        <div className="mt-1 text-right">
                          <Link
                            href="/forgot-password"
                            className="text-gray-500 text-sm dark:text-white "
                          >
                            Forgot Password?
                          </Link>
                        </div>

                        <Button
                          loading={isLoading}
                          type="submit"
                          label="Sign in"
                          style="dark:bg-white bg-dark-200 text-white dark:text-black font-semibold mt-8 hover:bg-primary-100"
                        />
                      </form>
                    </Form>
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

export default Page;
