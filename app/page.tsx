"use client"

import { useState } from "react";
import AuthenticationPage from "./views/signup/page";

export default function Home() {
  const [isLogin, setIsLogin] = useState(false)
  return (
    <main className="flex flex-col items-left justify-between">
      {isLogin ? <div>HOME PAGE</div> : <AuthenticationPage />}
    </main>
  );
}