import { Channel, ChannelType } from "@prisma/client";
import { ServerWithImageProps } from "@/types";
import { create } from "zustand";

export type modalType =
  | "CreateServer"
  | "EditServer"
  | "DeleteServer"
  | "CreateChannel"
  | "EditChannel"
  | "DeleteChannel"
  | "Invite"
  | "DeleteServer"
  | "ManageMembers";

interface ModalData {
  server?: ServerWithImageProps;
  channel?: Channel;
  channelType?: ChannelType;
}

interface ModalStore {
  type: modalType | null;
  isOpen: boolean;
  data: ModalData;
  onOpen: (type: modalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  data: {},
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
