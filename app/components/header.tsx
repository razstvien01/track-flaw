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


const Header = () => {
  const { user, logOut, googleSignIn, googleSignUp } = UserAuth();
  
  return (user) ? (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Logo />
        <MainNav className="mx-6"  />
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <OrgSwitcher />
          <ModeToggle />
          <UserNav user={user} logOut={logOut}/>
        </div>
      </div>
    </div>
  ) : <AuthenticationPage googleSignIn={googleSignIn} googleSignUp={googleSignUp} />;
};

export default Header;
