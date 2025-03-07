"use client";

import { useState } from "react";

// clerk
import { useSignUp } from "@clerk/nextjs";

// zod
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// router
import { useRouter } from "next/navigation";

// components

import Button from "../Button/Button";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

const formSchema = z.object({
  code: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

const OPTVerification = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  const handleVerification = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const { code } = values;

    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });

        // toaster
        toast.success("Success", {
          description: "Your account has being verified ",
        });

        setIsLoading(false);

        // router
        router.push("/");
      } else {
        setIsLoading(false);
        toast("An error occurred", {
          description: JSON.stringify(signUpAttempt, null, 2),
        });
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (error) {
      toast("An error occurred", {
        description: JSON.stringify(error, null, 2),
      });
      console.error("Error:", JSON.stringify(error, null, 2));
    }
  };

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
                    Let&apos;s get your account verified
                  </h6>

                  <div className="w-full md:w-96 mt-8">
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(handleVerification)}
                        className=""
                      >
                        <FormField
                          control={form.control}
                          name="code"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base  font-normal dark:text-white mb-2">
                                Verification Code
                              </FormLabel>

                              <FormControl className="w-full">
                                <InputOTP maxLength={6} {...field}>
                                  <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                  </InputOTPGroup>
                                  <InputOTPSeparator />
                                  <InputOTPGroup>
                                    <InputOTPSlot index={3} />
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                  </InputOTPGroup>
                                </InputOTP>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormDescription className="text-base font-normal my-4  font-saira">
                          Please enter the code sent to the Email Address your
                          provided
                        </FormDescription>

                        <Button
                          loading={isLoading}
                          type="submit"
                          label="Verify"
                          style="dark:bg-white bg-dark-200 text-white dark:text-black font-semibold mt-4 hover:bg-primary-100"
                        />
                      </form>
                    </Form>
                  </div>
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

export default OPTVerification;
