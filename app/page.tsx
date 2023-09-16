"use client";

import { useState } from "react";
import { UserAuth } from "./context/auth_context";

export default function Home({ Component, pageProps }: any) {
  const { user, logOut, googleSignIn } = UserAuth();
  const [isLogin, setIsLogin] = useState(false);
  
  console.log(user)
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
