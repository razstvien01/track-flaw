"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ModeToggle } from "./components/mode_toggle";
import { ThemeCustomizer } from "../components/theme_customizer";
import { ThemeWrapper } from "@/components/theme-wrapper";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <ModeToggle />
        <ThemeCustomizer />
      </div>

      <ThemeWrapper className="relative flex flex-col items-start md:flex-row md:items-center">
        <Button className="animate-in zoom-in duration-500">HELLO WORLD</Button>
      </ThemeWrapper>
    </main>
  );
}
