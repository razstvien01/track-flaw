import OrgSwitcher from "./org-switcher";
import ModeToggle from "./mode-toggle";
import UserNav from "./user-nav";

//* Components
import { Logo } from "./logo";
import { MainNav } from "./main-nav";
import { Search } from "./search";
import { UserAuth } from "../context/auth_context";
import AuthenticationPage from "../views/signup/page";
import { NextRouter } from "next/router";

// interface HeaderProps {
//   router: NextRouter
// }

const Header: React.FC<any> = () => {
  const { user, logOut, googleSignIn } = UserAuth();
  
  return (user) ? (
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
  ) : <AuthenticationPage googleSignIn={googleSignIn} />;
};

export default Header;
