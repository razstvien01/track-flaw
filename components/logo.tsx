"use client"

import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <div>
      <Link href="/">
          <Image
            src="/cat-svgrepo-com.svg"
            alt="Image"
            width={30}
            height={30}
            className="rounded-md object-cover"
          />
      </Link>
    </div>
  );
}
