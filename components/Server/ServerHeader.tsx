"use client";
import React, { useState } from "react";

// prisma
import { MemberRole } from "@prisma/client";

// types
import { ServerWithMembersProps } from "@/types";

interface ServerHeaderProps {
  server: ServerWithMembersProps;
  role: MemberRole;
}

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

// Users
import {
  ChevronDown,
  UserPlus,
  Settings,
  User,
  Plus,
  Trash,
  LogOut,
} from "lucide-react";

// hooks
import { useModal } from "@/hooks/use-modal-store";

const ServerHeader: React.FC<ServerHeaderProps> = ({ server, role }) => {
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { onOpen } = useModal();

  const handleOpenDialog = () => {
    setDropdownOpen(false);
    onOpen("Invite", { server });
  };

  const handleCreateChannel = () => {
    setDropdownOpen(false);
    onOpen("CreateChannel", { server });
  };

  const handleDeleteServer = () => {
    setDropdownOpen(false);
    onOpen("DeleteServer", { server });
  };

  const handleEditServer = () => {
    setDropdownOpen(false);
    onOpen("EditServer", { server });
  };

  const handleMembers = () => {
    setDropdownOpen(false);
    onOpen("ManageMembers", { server });
  };

  return (
    <>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild className="focus:outline-0">
          <button className="w-full flex py-4 px-2 items-center justify-between hover:dark:bg-dark-50 hover:bg-zinc-500/10">
            <p className="">{server?.name}</p>
            <ChevronDown size={20} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 dark:bg-dark-200 border-gray-200 dark:border-dark-50">
          <DropdownMenuLabel>Server actions</DropdownMenuLabel>
          {(isAdmin || isModerator) && (
            <DropdownMenuItem
              onClick={handleOpenDialog}
              // onClick={() => onOpen("Invite", { server })}
              className="items-center justify-between"
            >
              Invite users
              <UserPlus className="size-5 ml-auto" />
            </DropdownMenuItem>
          )}

          {isAdmin && (
            <DropdownMenuItem
              onClick={handleEditServer}
              className="items-center justify-between"
            >
              Server settings
              <Settings className="size-5 ml-auto" />
            </DropdownMenuItem>
          )}

          {isAdmin && (
            <DropdownMenuItem
              className="items-center justify-between"
              onClick={handleMembers}
            >
              Manage members
              <User className="size-5 ml-auto" />
            </DropdownMenuItem>
          )}

          {(isAdmin || isModerator) && (
            <DropdownMenuItem
              onClick={handleCreateChannel}
              className="items-center justify-between"
            >
              Create Channel
              <Plus className="size-5 ml-auto" />
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator />

          {isAdmin && (
            <DropdownMenuItem
              onClick={handleDeleteServer}
              className="items-center text-rose-500 hover:bg-rose-500 transition-colors bg-rose-500/10 justify-between"
            >
              Delete Server
              <Trash className="size-5 ml-auto" />
            </DropdownMenuItem>
          )}

          {!(isAdmin && isModerator) && (
            <DropdownMenuItem className="items-center justify-between">
              Leave Server
              <LogOut className="size-5 ml-auto" />
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ServerHeader;
