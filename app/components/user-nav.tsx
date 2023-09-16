import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useEffect, useState } from "react";
import ProfileSheet from "./profile_detail.sheet";
import { useGetUser, useGetUsers } from "../services/users.service";

interface UserNavProps {
  user: any;
  logOut: () => void;
}

const UserNav: React.FC<UserNavProps> = ({ user, logOut }) => {
  const { displayName, email, photoURL, uid } = user;
  const [isSheetVisible, setIsSheetVisible] = useState(false);
  const [userData, setUserData] = useState([])
  
  useGetUser(uid, setUserData)
  
  useEffect(() => {
    
    console.log(userData)
    return () => {
      
    }
  }, [userData])
  

  const handleSignOut = async () => {
    try {
      logOut();
      window.location.href = "http://localhost:3000";
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenSheet = () => {
    console.log(isSheetVisible);
    setIsSheetVisible(!isSheetVisible);
  };

  const handleCloseSheet = () => {
    setIsSheetVisible(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={photoURL} alt="@shadcn" />
              <AvatarFallback>ZZ</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{displayName}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={handleOpenSheet}>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>

            <DropdownMenuItem>
              Billing
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>New Team</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <ProfileSheet isSheetVisible={isSheetVisible} handleOpenSheet={handleOpenSheet} user={user}/>
    </>
  );
};

export default UserNav;
