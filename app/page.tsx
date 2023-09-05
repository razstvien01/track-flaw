"use client";
import { Tabs, TabsList } from "@/components/ui/tabs"
import { ModeToggle } from "./components/mode_toggle";
import { UserNav } from "./components/user-nav";
import { TabsTrigger } from "@radix-ui/react-tabs";
import { Button } from "@/components/ui/button";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-left justify-between">
      <div className="border-b">
        <div className="flex h-16 items-left px-4">
          <div className="ml-auto flex items-center space-x-4 flex-grow justify-end">
            {/* <div>
              <Input
                type="search"
                placeholder="Search..."
                className="md:w-[100px] lg:w-[300px]"
              />
            </div> */}
            <Tabs defaultValue="Home" className="w-full">
              <TabsList>
                <TabsTrigger value="home">
                  <Button>Home</Button>
                </TabsTrigger>
                <TabsTrigger value="project">
                  <Button>Project</Button>
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <ModeToggle />
            <UserNav />
          </div>
        </div>
      </div>
    </main>
  );
}
