import { Server, Member, User } from "@prisma/client";

export type ServerWithMembersProps = Server & {
  members: (Member & { user: User })[];
};
