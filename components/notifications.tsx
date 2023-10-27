import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Separator } from "@/components/ui/separator";

import { BellIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { useUserDataAtom } from "@/hooks/user_data_atom";
import { useCallback, useEffect, useState } from "react";
import { getNotifs } from "@/services/notifications.service";
import { NotifData } from "@/types/types";

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

const Notifications = () => {
  const { theme, setTheme } = useTheme();
  const [userData, setUserData] = useUserDataAtom();
  const [notifs, setNotifs] = useState<NotifData>();
  
  const fetchNotifs = useCallback(async() =>{
    const result = await getNotifs(userData)
    if(result.success){
      setNotifs(result.data)
    }
    
    console.log(result.data)
  }, [])
  
  useEffect(() => {
    fetchNotifs()
  }, [fetchNotifs])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {theme === "light" ? (
          <BellIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        ) : (
          <BellIcon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <ScrollArea className="h-72 w-48 rounded-md">
          <DropdownMenuGroup className="p-4">
            <DropdownMenuLabel className="mb-4 text-lg leading-none font-bold">
              Notifications
            </DropdownMenuLabel>
            {tags.map((tag) => (
              <>
                <DropdownMenuItem
                  key={tag}
                  className="text-sm"
                  onClick={() => {
                    console.log("Pressed");
                  }}
                >
                  {tag}
                </DropdownMenuItem>
                <Separator className="my-2" />
              </>
            ))}
          </DropdownMenuGroup>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notifications;
