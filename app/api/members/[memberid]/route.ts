import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/current-user";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { memberid: string } }
) {
  try {
    const user = await currentUser();

    const { memberid } = params;
    const { searchParams } = new URL(req.url);
    const { role } = await req.json();

    if (!user) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    const serverId = searchParams.get("serverId");

    if (!serverId) {
      return new NextResponse("Server ID is missing", { status: 400 });
    }

    if (!params.memberid) {
      return new NextResponse("Member ID is missing", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        ownerId: user.id,
      },
      data: {
        members: {
          update: {
            where: {
              id: memberid,
              userId: {
                not: user.id,
              },
            },
            data: {
              role,
            },
          },
        },
      },
      include: {
        members: {
          include: {
            user: true,
          },
          orderBy: {
            role: "asc",
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[MEMBERS_PATCH]", error);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { memberid: string } }
) {
  try {
    const user = await currentUser();
    const { searchParams } = new URL(req.url);

    if (!user) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    const serverId = searchParams.get("serverId");

    if (!serverId) {
      return new NextResponse("Server ID is missing", { status: 400 });
    }

    if (!params.memberid) {
      return new NextResponse("Member ID is missing", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        ownerId: user.id,
      },
      data: {
        members: {
          deleteMany: {
            id: params.memberid,
            userId: {
              not: user.id,
            },
          },
        },
      },
      include: {
        members: {
          include: {
            user: true,
          },
          orderBy: {
            role: "asc",
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[MEMBERS_DELETE]", error);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
