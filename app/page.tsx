"use client";

import { useState } from "react";
import AuthenticationPage from "./views/signup/page";
import { UserAuth } from "./context/auth_context";
import Header from "./components/header";
import { Label } from "@/components/ui/label";

export default function Home({ Component, pageProps }: any) {
  const { user, logOut, googleSignIn } = UserAuth();
  const [isLogin, setIsLogin] = useState(false);

  return (
    <main className="flex flex-col items-left justify-between">
      {/* {user ? (
        <>
          <Header />
          <div className="relative min-h-screen">
            <Label className="absolute bottom-0 left-0 mb-2 ml-2">
              Created by Buggy Cat.
            </Label>
          </div>
        </>
      ) : (
        <AuthenticationPage googleSignIn={googleSignIn} logOut={logOut} />
      )} */}
    </main>
  );
}
