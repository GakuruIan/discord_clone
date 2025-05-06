import React, { useState } from "react";

// axios
import axios from "axios";

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

import { useModal } from "@/hooks/use-modal-store";
import { toast } from "sonner";

// icons
import { Check, Copy, RefreshCcw } from "lucide-react";

// hooks
import { useOrigin } from "@/hooks/use-origin";

// utils
import { cn } from "@/lib/utils";

export const InviteModal = () => {
  const { isOpen, onClose, type, data, onOpen } = useModal();

  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === "Invite";

  const origin = useOrigin();

  const { server } = data;

  const inviteUrl = `${origin}/invite/${server?.invitecode}`;

  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(inviteUrl);

    toast.success("Code copied successfully ");

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const GenerateNewCode = async () => {
    try {
      setIsLoading(true);

      const res = await axios.patch(`/api/server/${server?.id}/invite-code`);

      if (res.status === 200) {
        onOpen("Invite", { server: res.data });
        toast.success("New Invite code generated successfully");
      }
    } catch (error) {
      toast.error("Could not generate new Invite code");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="dark:bg-dark-300 border-0 dark:text-white text-black bg-white overflow-hidden">
        <DialogHeader className="py-4 px-6">
          <DialogTitle className="text-center font-poppins tracking-wider mb-1">
            Invite Friends
          </DialogTitle>
          <DialogDescription className="text-center font-saira text-base dark:text-gray-400 text-gray-500">
            Your server just got better! 🚀 Invite your friends and grow your
            community today!
          </DialogDescription>
        </DialogHeader>
        <div className="">
          <Label>Server invite code</Label>
          <div className="flex items-center gap-x-2 mt-2">
            <Input
              readOnly
              className="placeholder:text-sm placeholder:dark:text-gray-400 placeholder:text-gray-400 bg-light-200 tracking-wider font-saira dark:bg-dark-50 dark:text-white  border-0 focus-visible:ring-0 focus-visible:ring-offset-0 "
              value={inviteUrl}
            />
            <Button
              disabled={isLoading}
              variant="ghost"
              className={cn(
                "dark:hover:bg-indigo-400  transition-colors duration-75",
                copied ? "bg-green-500" : "bg-indigo-500"
              )}
              onClick={handleCopy}
            >
              {copied ? <Check size={18} /> : <Copy size={18} className="" />}
            </Button>
          </div>

          <Button
            onClick={GenerateNewCode}
            disabled={isLoading}
            variant="link"
            className="mt-2"
          >
            Generate new code
            <RefreshCcw size={18} />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
