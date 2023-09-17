'use client'

import OrgSwitcher from "./org-switcher";
import ModeToggle from "./mode-toggle";

//* Components
import { Logo } from "./logo";
import { MainNav } from "./main-nav";
import { Search } from "./search";
import { UserAuth } from "../context/auth_context";
import AuthenticationPage from "../views/authentication/page";
import UserNav from "./user-nav";
import { useGetUser } from "../services/users.service";
import { useState } from "react";
import { UserDataProps } from "../types/types";
import { UserDataInit } from "../types/init";


const Header = () => {
  const { user, logOut, googleSignIn, googleSignUp } = UserAuth();
  const { uid } = user
  
  const [userData, setUserData] = useState<UserDataProps>(UserDataInit)
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const { org_refs } = userData
  
  useGetUser(uid, setUserData, isUpdate)
  
  return (user) ? (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Logo />
        <MainNav className="mx-6"  />
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <OrgSwitcher org_refs={org_refs}/>
          <ModeToggle />
          <UserNav userData={userData} logOut={logOut} isUpdate={isUpdate} setIsUpdate={setIsUpdate}/>
        </div>
      </div>
    </div>
  ) : <AuthenticationPage googleSignIn={googleSignIn} googleSignUp={googleSignUp} />;
};

export default Header;
