'use client'

import OrgSwitcher from "./org-switcher";
import ModeToggle from "./mode-toggle";
import UserNav from "./user-nav";

//* Components
import { Logo } from "./logo";
import { MainNav } from "./main-nav";
import { Search } from "./search";
import { UserAuth } from "../context/auth_context";
import AuthenticationPage from "../views/authentication/page";
import { useEffect, useState } from "react";
import { resolve } from "path";

const Header = () => {
  const { user, logOut, googleSignIn, googleSignUp } = UserAuth();
  const [ loading, setLoading ] = useState(true)
  
  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50))
      setLoading(false)
    }
    checkAuthentication()
  }, [user])
  
  return (loading ? null : user) ? (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Logo />
        <MainNav className="mx-6"  />
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <OrgSwitcher />
          <ModeToggle />
          <UserNav logOut={logOut}/>
        </div>
      </div>
    </div>
  ) : <AuthenticationPage googleSignIn={googleSignIn} googleSignUp={googleSignUp} />;
};

export default Header;
