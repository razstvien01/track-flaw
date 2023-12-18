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


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useLoadingAtom();

  const { user = {}, logOut, googleSignIn, googleSignUp } = UserAuth() || {};
  const { uid = "" } = user || {};
  const [userData, setUserData] = useUserDataAtom();

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
        </body>
      </html>
    </>
  );
}
