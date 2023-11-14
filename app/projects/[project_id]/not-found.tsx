"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const NotFound = () => {
  const router = useRouter();
  return (
    <main className="flex flex-col gap-2 items-center justify-center text-center h-screen">
      <Image
            src="/cat.gif"
            alt="Image"
            width={600}
            height={600}
            className="rounded-md object-cover"
          />
      <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
        There was a problem.
      </h1>
      <p className="max-w-[1000px] text-lg text-muted-foreground sm:text-xl">
        We could not find the page you were looking for.
      </p>
      <p>
        Go back to the{" "}
        <Button
          variant={"link"}
          onClick={() => {
            router.refresh();
            router.push("/projects");
          }}
        >
          Dashboard
        </Button>
      </p>
    </main>
  );
};

export default NotFound;
