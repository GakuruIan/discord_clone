import React, { useState } from "react";

// react form
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// axios
import axios from "axios";

interface FileMetaData {
  key: string;
  ufsUrl: string;
}

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

import { Button } from "../ui/button";
import FileUpload from "../FileUpload/FileUpload";

import { useModal } from "@/hooks/use-modal-store";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Server name is required",
  }),
  imageUrl: z.string().min(1, {
    message: "Server image is required",
  }),
});

export const CreateServer = () => {
  const { isOpen, onClose, type } = useModal();

  const [fileMetaData, setFileMetaData] = useState<FileMetaData>({
    key: "",
    ufsUrl: "",
  });

  const isModalOpen = isOpen && type === "CreateServer";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const data = {
      ...values,
      imageKey: fileMetaData.key,
    };

    await axios
      .post("/api/server", data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Server created successfully", {
            position: "top-right",
          });
        }
      })
      .catch((err) => {
        toast.error("An error occurred. Please try again later");
        console.log(err);
      })
      .finally(() => {
        form.reset();
        onClose();
      });
  };

  const isLoading = form.formState.isLoading;

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="dark:bg-dark-300 border-0 dark:text-white text-black bg-white overflow-hidden">
        <DialogHeader className="py-4 px-6">
          <DialogTitle className="text-center font-poppins tracking-wider mb-1">
            Customize your server
          </DialogTitle>
          <DialogDescription className="text-center font-saira text-base dark:text-gray-400 text-gray-500">
            Give your server personality with a name and an image. You can
            always change it later
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex justify-center items-center text-center">
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel className="capitalize font-medium text-gray-500 dark:text-gray-400">
                       Server Image
                    </FormLabel> */}
                    <FormControl>
                      <FileUpload
                        endpoint="imageUploader"
                        value={field.value}
                        onChange={field.onChange}
                        setFileMetaData={setFileMetaData}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase tracking-wider font-saira font-semibold text-black dark:text-gray-400">
                    Server name
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="placeholder:text-sm placeholder:dark:text-gray-400 placeholder:text-gray-400 bg-light-200 tracking-wider font-saira dark:bg-dark-50 dark:text-white  border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="Enter server name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="py-4 px-6">
              <Button variant="primary" disabled={isLoading}>
                Create Server
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
