import {create} from 'zustand'

export type modalType = "CreateServer" | "EditServer" | "DeleteServer"

interface ModalStore {
    type: modalType | null,
    isOpen:boolean,
    onOpen:(type:modalType)=>void,
    onClose:() =>void
}


export const useModal=create<ModalStore>((set)=>({
    type:null,
    isOpen:false,
    onOpen:(type)=>set({isOpen:true,type}),
    onClose:()=>set({type:null,isOpen:false})
}))