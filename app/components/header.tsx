import OrgSwitcher from "./org-switcher";
import ModeToggle from "./mode-toggle";
import { UserNav } from "./user-nav";

//* Components
import { Logo } from "./logo";
import { MainNav } from "./main-nav";
import { Search } from "./search";

const Header = () => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Logo />
        <MainNav className="mx-6"  />
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <OrgSwitcher />
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </div>
  );
};

export default Header;
