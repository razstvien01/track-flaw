"use client";

import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "./components/header";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export const metadata: Metadata = {
  title: "Track Flaw",
  description:
    "It is a bug tracking app that makes it effortless for team members to report and manage bugs, ensuring seamless collaboration across the development and testing phases. It centralizes the management of software issues from initial reporting through resolution and verification.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            {isLogin ? (
              <>
                <Header />
                <div className="relative min-h-screen">
                  {children}
                  <Label className="absolute bottom-0 left-0 mb-2 ml-2">
                    Created by Buggy Cat.
                  </Label>
                </div>
              </>
            ) : (
              <>{children}</>
            )}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
