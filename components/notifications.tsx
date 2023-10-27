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
import { useUserDataAtom } from "@/hooks/user_data_atom";
import { useCallback, useEffect, useState } from "react";
import { getNotifs } from "@/services/notifications.service";
import { NotifData } from "@/types/types";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

const Notifications = () => {
  const { theme, setTheme } = useTheme();
  const [userData, setUserData] = useUserDataAtom();
  const [notifs, setNotifs] = useState<NotifData[]>([]);

  const fetchNotifs = useCallback(async () => {
    // if (userData.user_id !== "") {
    const result = await getNotifs(userData);
    if (result.success) {
      setNotifs(result.data);
    }
    // }
  }, [userData]);

  useEffect(() => {
    fetchNotifs();
  }, [fetchNotifs]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {theme === "light" ? (
            <BellIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          ) : (
            <BellIcon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" forceMount>
          <ScrollArea className="w-80 h-[40rem] rounded-md">
            <DropdownMenuGroup className="p-4">
              <DropdownMenuLabel className="mb-4 text-lg leading-none font-bold">
                Notifications
              </DropdownMenuLabel>
              {notifs.map((notif, index) => {
                const { title, description, photo_url, time } = notif;

                const date = new Date(
                  time.seconds * 1000 + time.nanoseconds / 1000000
                );

                const dateOptions = {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                };
                const timeOptions = {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                };

                const formattedDate = date.toLocaleDateString(
                  "en-US",
                  dateOptions as any
                );
                const formattedTime = date.toLocaleTimeString(
                  "en-US",
                  timeOptions as any
                );

                const formattedDateTime = `${formattedDate} at ${formattedTime}`;

                return (
                  <React.Fragment key={index}>
                    <DropdownMenuItem
                      className="text-sm"
                      onClick={() => {
                        console.log("Pressed", notif);
                      }}
                    >
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-4">
                          <AvatarImage src={photo_url} alt="@shadcn" />
                          <AvatarFallback>ZZ</AvatarFallback>
                        </Avatar>
                        <div>
                          <h2 className="font-bold text-lg">{title}</h2>
                          <p className="font-extralight text-sm">
                            {description}
                          </p>
                          <p className="text-muted-foreground text-xs">
                            {formattedDateTime}
                          </p>
                        </div>
                      </div>
                    </DropdownMenuItem>
                    <Separator className="my-2" />
                  </React.Fragment>
                );
              })}
            </DropdownMenuGroup>
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Notifications;
