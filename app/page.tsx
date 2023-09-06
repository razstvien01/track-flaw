import { UserNav } from "./components/user-nav";
import TeamSwitcher from "./components/team-switcher";
import { MainNav } from "./components/main-nav";
import { Search } from "./components/search";
import { Logo } from "./components/logo";
import { ModeToggle } from "./components/mode-toggle";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-left justify-between">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <Logo/>
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <TeamSwitcher />
            <ModeToggle/>
            <UserNav />
          </div>
        </div>
      </div>
      <Button>HELLOW</Button>
    </main>
  );
}
