"use client";
import { useEffect, useState } from "react";

import { CreateServer } from "@/components/modals/create-server";
import { InviteModal } from "@/components/modals/invite-modal";
import { CreateChannel } from "@/components/modals/create-channel";
import { EditChannel } from "@/components/modals/edit-channel";
import { DeleteChannel } from "@/components/modals/delete-channel";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateServer />
      <InviteModal />
      <CreateChannel />
      <EditChannel />
      <DeleteChannel />
    </>
  );
};
