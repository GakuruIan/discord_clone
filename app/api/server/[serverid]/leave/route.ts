import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { serverid: string } }
) {
  try {
    const user = await currentUser();

    const { serverid } = params;

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized user" },
        { status: 401 }
      );
    }

    if (!serverid) {
      return NextResponse.json(
        { message: "Server Id is missing" },
        { status: 400 }
      );
    }

    const server = await db.server.update({
      where: {
        id: serverid,
        ownerId: {
          not: user.id,
        },
        members: {
          some: {
            userId: user.id,
          },
        },
      },
      data: {
        members: {
          deleteMany: {
            userId: user.id,
          },
        },
      },
    });

    return NextResponse.json(server, { status: 200 });
  } catch (error) {
    console.log("[SERVER_PATCH]", error);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
