"use client";

import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { useEffect, useState } from "react";
import { AuthContextProvider, UserAuth } from "../context/auth_context";
import Header from "../components/header";
import { Toaster } from "@/components/ui/toaster";
import { Provider } from "jotai";
import { useUserDataAtom } from "../hooks/user_data_atom";
import { useGetUser } from "../services/users.service";
import { useLoadingAtom } from "../hooks/loading.atom";

const LoadingComponent = () => (
  <main className="flex justify-center items-center h-screen flex-col space-y-4">
    <div className="animate-spin rounded-full h-16 w-16 border-t-8 border-b-8 border-rose-500"></div>
  </main>
);

const metadata: Metadata = {
  title: "Track Flaw",
  description:
    "It is a bug tracking app that makes it effortless for team members to report and manage bugs, ensuring seamless collaboration across the development and testing phases. It centralizes the management of software issues from initial reporting through resolution and verification.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [isLoading, setIsLoading] = useState(true);
  const [isLoading, setIsLoading] = useLoadingAtom();

  const { user = {}, logOut, googleSignIn, googleSignUp } = UserAuth() || {};
  const { uid = "" } = user || {};
  const [userData, setUserData] = useUserDataAtom();

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentUser, setCurrentUser] = useUserDataAtom();

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  useGetUser(uid, setUserData, isLoading);

  useEffect(() => {
    //* Simulate a 3-second loading period
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(loadingTimeout);
  }, [isLoading, setIsLoading]);

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body className="font-mono">
          <AuthContextProvider>
            <Provider>
              <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
              >
                {isLoading ? (
                  <LoadingComponent />
                ) : (
                  <>
                    <Header setIsLoading={setIsLoading} />
                    {children}
                  </>
                )}
              </ThemeProvider>
            </Provider>
          </AuthContextProvider>
          <Toaster />
          <footer className="align-bottom">
            <div className="container mx-auto text-right">
              &copy; {currentYear} Buggy Cat
            </div>
          </footer>
        </body>
      </html>
    </>
  );
}
