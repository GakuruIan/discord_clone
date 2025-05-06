"use client";
import React, { useState } from "react";

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

import { Button } from "../ui/button";

import { useModal } from "@/hooks/use-modal-store";
import { toast } from "sonner";

export const DeleteChannel = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [isLoading, setIsLoading] = useState(false);

  const { server, channel } = data;

  const isModalOpen = isOpen && type === "DeleteChannel";

  const handleSubmit = async () => {
    setIsLoading(true);
    await toast.promise(
      async () => {
        await axios.delete(`/api/server/${server?.id}/channels/${channel?.id}`);
      },
      {
        loading: "Deleting channel...",
        success: "Channel deleted successfully",
        error: "Error in deleting channel",
        position: "bottom-right",
      }
    );
    onClose();
    setIsLoading(false);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="dark:bg-dark-300 border-0 dark:text-white text-black bg-white overflow-hidden">
        <DialogHeader className="py-4 px-6">
          <DialogTitle className="text-center font-poppins tracking-wider mb-1">
            Delete channel
          </DialogTitle>
          <DialogDescription className="text-center font-saira text-base dark:text-gray-400 text-gray-500">
            Are you sure you want to delete ? <br />
            <span className="font-semibold text-indigo-400">
              #{channel?.name}
            </span>
            Will be deleted permanently from our servers
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-y-2">
          <Button
            onClick={onClose}
            variant="destructive"
            disabled={isLoading}
            className=""
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="primary" disabled={isLoading}>
            Delete channel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
