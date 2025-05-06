import { v4 as uuidv4 } from "uuid";

import { NextResponse } from "next/server";
import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { serverid: string } }
) {
  try {
    const user = await currentUser();

    const { serverid } = await params;

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!serverid) {
      return new NextResponse("Server ID missing", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverid,
        ownerId: user.id,
      },
      data: {
        invitecode: uuidv4(),
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log(`[SERVER INVITE CODE PATCH] ${error}`);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
