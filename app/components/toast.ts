"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface ToastWithTitleProps {
  variant:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  title: string;
  description: string;
}

export function ToastWithTitle({
  variant, title, description,
}: ToastWithTitleProps) {
  console.log("ADSADJADJDAJDSJ");
  const { toast } = useToast();

  return (
    // <Button
    //   variant={variant}
    //   onClick={() => {
    toast({
      title: title,
      description: description,
    })
    //   }}
    // >
    //   Show Toast
    // </Button>
  );
}
