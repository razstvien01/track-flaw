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
            width={50}
            height={50}
            className="rounded-md object-cover"
          />
      </Link>
    </div>
  );
}
