import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { serverid: string; channelid: string } }
) {
  try {
    const user = await currentUser();

    const { serverid, channelid } = params;

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

    if (!channelid) {
      return NextResponse.json(
        { message: "Channel ID is missing" },
        { status: 400 }
      );
    }

    const body = await req.json();

    const { channel_name, channel_type } = body;

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
        channels: {
          update: {
            where: {
              id: channelid,
            },
            data: {
              name: channel_name,
              type: channel_type,
            },
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to create Channel" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: { serverid: string; channelid: string };
  }
) {
  try {
    const user = await currentUser();

    const { serverid, channelid } = params;

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized access" },
        { status: 401 }
      );
    }

    if (!serverid) {
      return NextResponse.json(
        { message: "Server Id is missing" },
        { status: 400 }
      );
    }

    if (!channelid) {
      return NextResponse.json(
        { message: "Channel ID is missing" },
        { status: 400 }
      );
    }

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
        channels: {
          delete: {
            id: channelid,
            name: {
              not: "general",
            },
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to create Channel" },
      { status: 500 }
    );
  }
}
