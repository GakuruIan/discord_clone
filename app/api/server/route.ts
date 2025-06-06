import { v4 as uuidv4 } from "uuid";

import { currentUser } from "@/lib/current-user";

import { db } from "@/lib/db";

import { NextResponse } from "next/server";

import { MemberRole } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { name, imageUrl, imageKey } = await req.json();

    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const server = await db.server.create({
      data: {
        name,
        ownerId: user.id,
        invitecode: uuidv4(),
        ImageUrl: {
          create: {
            key: imageKey,
            url: imageUrl,
          },
        },
        channels: {
          create: [
            {
              name: "general",
              userId: user.id,
            },
          ],
        },
        members: {
          create: [
            {
              userId: user.id,
              role: MemberRole.ADMIN,
            },
          ],
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log(`[SERVER ERROR]: ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const servers = await db.server.findMany({
      where: {
        members: {
          some: {
            userId: user.id,
          },
        },
      },
      include: {
        ImageUrl: true,
        channels: true,
        members: true,
      },
    });

    return NextResponse.json(servers);
  } catch (error) {
    console.log(`[SERVER ERROR]: ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
