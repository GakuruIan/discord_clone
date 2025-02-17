"use client";

import React, { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

import { Separator } from "../ui/separator";

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

const ServerHeader = () => {
  const [isAdmin, setIsAdmin] = useState(true);
  const [isModerator, setIsModerator] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="focus:outline-0">
          <button className="w-full flex py-4 px-2 items-center justify-between hover:dark:bg-dark-50 hover:bg-zinc-500/10">
            <p className="">Server name</p>
            <ChevronDown size={20} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 dark:bg-dark-200 border-gray-200 dark:border-dark-50">
          <DropdownMenuLabel>Server actions</DropdownMenuLabel>
          {(isAdmin || isModerator) && (
            <DropdownMenuItem className="items-center justify-between">
              Invite users
              <UserPlus className="size-5 ml-auto" />
            </DropdownMenuItem>
          )}

          {isAdmin && (
            <DropdownMenuItem className="items-center justify-between">
              Server settings
              <Settings className="size-5 ml-auto" />
            </DropdownMenuItem>
          )}

          {isAdmin && (
            <DropdownMenuItem className="items-center justify-between">
              Manage members
              <User className="size-5 ml-auto" />
            </DropdownMenuItem>
          )}

          {(isAdmin || isModerator) && (
            <DropdownMenuItem className="items-center justify-between">
              Create Channel
              <Plus className="size-5 ml-auto" />
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator />

          {isAdmin && (
            <DropdownMenuItem className="items-center text-rose-500 hover:bg-rose-500 transition-colors bg-rose-500/10 justify-between">
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
      <Separator />
    </>
  );
};

export default ServerHeader;
