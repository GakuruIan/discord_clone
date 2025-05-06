import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";

export async function POST(
  req: NextRequest,
  { params }: { params: { serverid: string } }
) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized user" },
        { status: 401 }
      );
    }

    if (!params.serverid) {
      return NextResponse.json(
        { message: "Server ID is missing" },
        { status: 400 }
      );
    }

    const body = await req.json();

    const { channel_name, channel_type } = body;

    if (!channel_name || !channel_type) {
      return NextResponse.json(
        { message: "Channel name and type is required" },
        { status: 400 }
      );
    }

    const server = await db.server.findUnique({
      where: {
        id: params.serverid,
      },
    });

    if (!server) {
      return NextResponse.json(
        { message: "Server not found" },
        { status: 404 }
      );
    }

    const Server = await db.server.update({
      where: {
        id: params.serverid,
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
        channels: {
          create: {
            name: channel_name,
            type: channel_type,
            userId: user.id,
          },
        },
      },
    });

    return NextResponse.json(Server);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
