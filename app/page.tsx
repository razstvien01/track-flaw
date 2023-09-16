"use client";

import { useState } from "react";
import { UserAuth } from "./context/auth_context";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

export default function Home({ Component, pageProps }: any) {
  const { toast } = useToast()
 
  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          description: "Your message has been sent.",
        })
      }}
    >
      Show Toast
    </Button>
  )
}
