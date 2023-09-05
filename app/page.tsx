"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import { ModeToggle } from "./components/mode_toggle";
import { UserNav } from "./components/user-nav";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-left justify-between">
      <div className="border-b">
        <div className="flex h-16 items-left px-4">
          <div className="ml-auto flex items-center space-x-4 flex-grow justify-end"> {/* Updated */}
            <ModeToggle />
            <UserNav />
            {/* <div>
              <Input
                type="search"
                placeholder="Search..."
                className="md:w-[100px] lg:w-[300px]"
              />
            </div> */}
          </div>
        </div>
      </div>
    </main>
  );
}
