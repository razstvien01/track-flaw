"use client"

import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";

export function Logo() {
  return (
    <div>
      {/* <AspectRatio ratio={16 / 9}> */}
        <Image
          src="/cat-svgrepo-com.svg"
          alt="Image"
          width={50} // Add the width property
          height={50} // Add the height property
          className="rounded-md object-cover"
          onClick={() => {
            console.log("Icon clicked");
          }}
        />
      {/* </AspectRatio> */}
    </div>
  );
}
