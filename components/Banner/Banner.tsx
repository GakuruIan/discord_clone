import React from "react";

import Image from "next/image";

// banner image
import banner from "@/public/PUBG.jpg";

const Banner = () => {
  return (
    <div className="relative px-2 mb-4 ">
      <Image
        src={banner}
        alt="banner image"
        className="h-72 md:h-[350px] w-full rounded-md"
      />
    </div>
  );
};

export default Banner;
