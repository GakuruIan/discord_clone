"use client";

import React from "react";

//prisma
import { Member, Server, User, MemberRole } from "@prisma/client";

// icons
import { ShieldCheck, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import UserAvatar from "../UserAvatar/UserAvatar";

interface ServerMemberProps {
  member: Member & { user: User };
  server: Server;
}

const ServerMember = ({ member, server }: ServerMemberProps) => {
  const RoleIconMap = {
    [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 ml-3" />,
    [MemberRole.MODERATOR]: <ShieldCheck className="h-4 w-4 ml-3" />,
    [MemberRole.MEMBER]: null,
  };

  const icon = RoleIconMap[member.role];

  const params = useParams();
  //   const router = useRouter();

  return (
    <button
      className={cn(
        "group p-2 flex w-full rounded-md items-center gap-x-2 dark:hover:bg-dark-20 hover:bg-zinc-400 transition mb-2",
        params?.memberid === member.id && "bg-zinc-700/20 dark:bg-dark-10"
      )}
    >
      <UserAvatar url={member.user.avatar} />
      <p
        className={cn(
          "font-semibold text-sm group-hover:text-zinc-500 group-hover:dark:text-gray-400"
        )}
      >
        {member.user.username}
      </p>
      {icon}
    </button>
  );
};

export default ServerMember;
