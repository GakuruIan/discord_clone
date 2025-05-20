import React from "react";

import { currentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Loader } from "lucide-react";

interface ParamProps {
  params: {
    invitecode: string;
  };
}

const InviteCodePage = async ({ params }: ParamProps) => {
  const user = await currentUser();

  if (!user) {
    return redirect("/login");
  }

  if (!params.invitecode) {
    return redirect("/");
  }

  const existsOnServer = await db.server.findFirst({
    where: {
      invitecode: params.invitecode,
      members: {
        some: {
          userId: user.id,
        },
      },
    },
  });

  if (existsOnServer) {
    return redirect(`/servers/${existsOnServer.id}`);
  }

  const server = await db.server.update({
    where: {
      invitecode: params.invitecode,
    },
    data: {
      members: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Loader className="animate-spin size-8" />
    </div>
  );
};

export default InviteCodePage;
