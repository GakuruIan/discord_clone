import React from "react";
import Image from "next/image";

// background image
import background from "@/public/background.jpg";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid h-screen grid-cols-1 md:grid-cols-2 gap-x-2">
      {children}

      {/* background */}
      <div className="h-full hidden md:block">
        <Image
          src={background}
          alt="neon background"
          className="h-full w-full"
        />
      </div>
      {/* background */}
    </div>
  );
};

export default layout;
