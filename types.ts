import { Server, Member, User, ServerImage } from "@prisma/client";

export type ServerWithMembersProps = Server & {
  members: (Member & { user: User })[];
};

export type ServerWithImageProps = Server & {
  image?: ServerImage;
};

export type ServerWithOwnerProps = Server & {
  owner: User;
  ImageUrl: ServerImage;
};
