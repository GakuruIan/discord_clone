"use client";
import React, { useState, useEffect } from "react";

// props
interface ServerSearchProps {
  data: {
    label: string;
    type: "channel" | "members";
    data: {
      icon: React.ReactNode;
      name: string;
      id: string;
    }[];
  }[];
}

// icons
import { Search } from "lucide-react";

// components
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const ServerSearch = ({ data }: ServerSearchProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  return (
    <div className="">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="px-2 py-2 flex items-center  gap-x-2 w-full rounded-md bg-zinc-500/10 hover:bg-zinc-500/20 dark:bg-dark-20 hover:dark:bg-dark-10 transition-colors duration-75"
      >
        <Search className="size-4 text-gray-500 dark:text-gray-300" />
        <p className="text-sm text-gray-500 dark:text-gray-300">search</p>

        <kbd className="pointer-events-none ml-auto rounded dark:bg-dark-10 select-none text-[12px] flex items-center py-0.5 px-2  text-gray-400">
          <span className=" mr-1">ctrl</span> k
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search all channels and members..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {data?.map(({ label, data }) => {
            if (!data?.length) return null;

            return (
              <CommandGroup heading={label} key={label}>
                {data?.map(({ icon, id, name }) => {
                  return (
                    <CommandItem key={id}>
                      {icon}
                      <span>{name}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </div>
  );
};

export default ServerSearch;
