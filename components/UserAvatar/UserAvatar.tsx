import React from "react";

// components
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const UserAvatar = ({ url }: { url: string }) => {
  return (
    <Avatar className="size-7 md:size-10">
      <AvatarImage src={url} />
      {/* <AvatarFallback>CN</AvatarFallback> */}
    </Avatar>
  );
};

export default UserAvatar;
