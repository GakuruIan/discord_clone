import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";

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

    const body = await req.json();

    const { server_name, server_image } = body;

    const server = await db.server.update({
      where: {
        id: serverid,
        members: {
          some: {
            userId: user.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        name: server_name,
        ImageUrl: server_image,
      },
    });

    return NextResponse.json(server, { status: 200 });
  } catch (error) {
    console.log("[SERVER_PATCH]", error);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}

export async function DELETE(
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

    const server = await db.server.delete({
      where: {
        id: serverid,
        members: {
          some: {
            userId: user.id,
            role: {
              in: [MemberRole.ADMIN],
            },
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
