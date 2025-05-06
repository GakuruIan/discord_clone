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

export const DeleteServer = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [isLoading, setIsLoading] = useState(false);

  const { server } = data;

  const isModalOpen = isOpen && type === "DeleteServer";

  const handleSubmit = async () => {
    setIsLoading(true);
    await toast.promise(
      async () => {
        await axios.delete(`/api/server/${server?.id}`);
      },
      {
        loading: "Deleting server...",
        success: "Server deleted successfully",
        error: "Error in deleting server",
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
            Delete server
          </DialogTitle>
          <DialogDescription className="text-center font-saira text-base dark:text-gray-400 text-gray-500">
            Are you sure you want to delete ? <br />
            <span className="font-semibold text-indigo-400">
              {server?.name}
            </span>
            Will be deleted permanently and cannot be recovered.
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
            Delete server
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
