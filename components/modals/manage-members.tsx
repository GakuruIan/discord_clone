import React, { useState } from "react";

import qs from "query-string";

// icons
import {
  MoreVertical,
  ShieldQuestion,
  ShieldAlert,
  ShieldCheck,
  Shield,
  Check,
  Gavel,
  Loader2,
} from "lucide-react";

// components
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import UserAvatar from "../UserAvatar/UserAvatar";
import { ScrollArea } from "../ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

// hooks
import { useModal } from "@/hooks/use-modal-store";

// types
import { ServerWithMembersProps } from "@/types";
import { MemberRole } from "@prisma/client";

// axios
import axios from "axios";

// router
import { useRouter } from "next/navigation";

const IconMap = {
  MEMBER: null,
  MODERATOR: <ShieldCheck className="h-4 w-4 ml-3" />,
  ADMIN: <ShieldAlert className="h-4 w-4 ml-3" />,
};

export const ManageMembers = () => {
  const { isOpen, onClose, type, data, onOpen } = useModal();
  const [loadingId, setIsLoadingId] = useState("");

  const router = useRouter();

  const isModalOpen = isOpen && type === "ManageMembers";

  const { server } = data as { server: ServerWithMembersProps };

  const onKick = async (memberId: string) => {
    try {
      setIsLoadingId(memberId);

      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server.id,
        },
      });

      await axios.delete(url);

      router.refresh();
      onOpen("ManageMembers", { server });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingId("");
    }
  };

  const onRoleChange = async (memberId: string, role: MemberRole) => {
    try {
      setIsLoadingId(memberId);

      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server.id,
          memberId,
        },
      });

      //    const response =
      await axios.patch(url, { role });

      router.refresh();
      onOpen("ManageMembers", { server });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingId("");
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="dark:bg-dark-300 border-0 dark:text-white text-black bg-white overflow-hidden">
        <DialogHeader className="py-4 px-6">
          <DialogTitle className="text-center font-poppins tracking-wider mb-1">
            Manage Members
          </DialogTitle>
          <DialogDescription className="text-center font-saira text-base dark:text-gray-400 text-gray-500">
            {server?.members?.length} Members
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="mt-4 max-h-[420px] pr-6">
          {server?.members.map((member) => (
            <div key={member.id} className="mb-4">
              <div className="flex items-center gap-x-2">
                <UserAvatar url={member.user.avatar} />
                <div className="flex flex-col">
                  <div className="flex items-center gap-x-2">
                    {member.user.username}
                    {IconMap[member.role]}
                  </div>
                  <p className="text-sm dark:text-gray-400 text-gray-400">
                    {member.user.email}
                  </p>
                </div>
                {server.ownerId !== member.userId &&
                  loadingId !== member.id && (
                    <div className="ml-auto">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoreVertical className="h-5 w-5 text-gray-400" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="left">
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger className="flex items-center gap-x-2">
                              <ShieldQuestion className="h-4 w-4 mr-2" />
                              <span>Role</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem
                                  onClick={() =>
                                    onRoleChange(member.id, "MEMBER")
                                  }
                                >
                                  <Shield className="h-4 w-4 mr-2" />
                                  Guest
                                  {member.role === "MEMBER" && (
                                    <Check className="size-4 ml-auto" />
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    onRoleChange(member.id, "MODERATOR")
                                  }
                                >
                                  <ShieldCheck className="h-4 w-4 mr-2" />
                                  Moderator
                                  {member.role === "MODERATOR" && (
                                    <Check className="size-4 ml-auto" />
                                  )}
                                </DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem onClick={() => onKick(member.id)}>
                            <Gavel className="size-4 mr-2" />
                            Kick
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}

                {loadingId === member.id && (
                  <Loader2 className="animate-spin size-4 text-zinc-500 ml-auto" />
                )}
              </div>
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
