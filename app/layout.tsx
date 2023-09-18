"use client";

import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { useState, useEffect } from "react";
import { AuthContextProvider } from "./context/auth_context";
import Header from "./components/header";
import { Toaster } from "@/components/ui/toaster";
import { Provider } from "jotai";

const LoadingComponent = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-8 border-b-8 border-rose-500"></div>
  </div>
);

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a 3-second loading period
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body>
          <AuthContextProvider>
            <Provider>
              <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
              >
                {isLoading ? <LoadingComponent /> : <Header />}
                {children}
              </ThemeProvider>
            </Provider>
          </AuthContextProvider>
          <Toaster />
        </body>
      </html>
    </>
  );
}
