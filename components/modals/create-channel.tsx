import React from "react";

// react form
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// prisma
import { ChannelType } from "@prisma/client";

// router
import { useParams } from "next/navigation";

// axios
import axios from "axios";

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "../ui/input";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from "../ui/select";

import { Button } from "../ui/button";

import { useModal } from "@/hooks/use-modal-store";
import { toast } from "sonner";

const formSchema = z.object({
  channel_name: z
    .string()
    .min(1, {
      message: "Channel name is required",
    })
    .refine((channel_name) => channel_name !== "general", {
      message: "Channel cannot be 'general",
    }),
  channel_type: z.nativeEnum(ChannelType),
});

export const CreateChannel = () => {
  const { isOpen, onClose, type } = useModal();

  const { serverid } = useParams();

  const isModalOpen = isOpen && type === "CreateChannel";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      channel_name: "",
      channel_type: ChannelType.TEXT,
    },
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await toast.promise(
      async () => {
        await axios
          .post(`/api/server/${serverid}/channels`, values)
          .catch((err) => console.log(err));
      },
      {
        loading: "Creating channel...",
        success: "Channel create successfully",
        error: "Error in creating channel",
        position: "bottom-right",
      }
    );
    handleClose();
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="dark:bg-dark-300 border-0 dark:text-white text-black bg-white overflow-hidden">
        <DialogHeader className="py-4 px-6">
          <DialogTitle className="text-center font-poppins tracking-wider mb-1">
            Create Server channel
          </DialogTitle>
          <DialogDescription className="text-center font-saira text-base dark:text-gray-400 text-gray-500">
            Give your server personality with a name and an image. You can
            always change it later
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="channel_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase tracking-wider font-saira font-semibold text-black dark:text-gray-400">
                    Channel name
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="placeholder:text-sm placeholder:dark:text-gray-400 placeholder:text-gray-400 bg-light-200 tracking-wider font-saira dark:bg-dark-50 dark:text-white  border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="Enter channel name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="channel_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase tracking-wider font-saira font-semibold text-black dark:text-gray-400">
                    Channel Type
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select channel type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(ChannelType).map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="py-4 ">
              <Button variant="primary" disabled={isLoading}>
                Create Channel
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
