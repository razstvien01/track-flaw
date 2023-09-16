"use client";

import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { useState } from "react";
import { AuthContextProvider } from "./context/auth_context";
import Header from "./components/header";

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
          <AuthContextProvider>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
              <Header/>
              {children}
            </ThemeProvider>
          </AuthContextProvider>
        </body>
      </html>
    </>
  );
}
