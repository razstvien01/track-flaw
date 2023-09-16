import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserDataProps } from "../types/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileSheetProps {
  isSheetVisible: boolean;
  handleOpenSheet: () => void;
  user: UserDataProps;
}

const ProfileSheet: React.FC<ProfileSheetProps> = ({
  isSheetVisible,
  handleOpenSheet,
  user,
}) => {
  const [isEditProfile, setIsEditProfile] = useState(false);
  const { full_name, email_address, phone_number, photo_url, user_id } = user;
  
  const handleButton = () => {
    setIsEditProfile(!isEditProfile)
  }

  return (
    <Sheet open={isSheetVisible} onOpenChange={handleOpenSheet}>
      {/* <SheetTrigger>Profile</SheetTrigger> */}
      {isEditProfile ? (
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              {
                "Make changes to your profile here. Click save when you're done."
              }
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value={full_name} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Phone Number
              </Label>
              <Input id="name" value={phone_number} className="col-span-3" />
            </div>
          </div>
          <SheetFooter>
          <Button onClick={handleButton} variant={'outline'}>Cancel</Button>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      ) : (
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Profile Details</SheetTitle>
            {/* <SheetDescription>
              {
                `Name: ${displayName}`
              }
            </SheetDescription> */}
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="flex justify-center items-center">
            <Avatar className="h-20 w-20 align-middle"> 
              <AvatarImage src={photo_url} alt="@shadcn" />
              <AvatarFallback>ZZ</AvatarFallback>
            </Avatar>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                UID:
              </Label>
              <Label className="col-span-3">{user_id}</Label>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name:
              </Label>
              <Label className="col-span-3">{full_name}</Label>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Email:
              </Label>
              <Label className="col-span-3">{email_address}</Label>
            </div>
            <div className="grid grid-cols-4 gap-4 items-center">
              <Label htmlFor="name" className="text-right">
                Phone Number:
              </Label>
              <Label className="col-span-3">{(phone_number) ? phone_number : 'No Phone Number'}</Label>
            </div>
          </div>
          <SheetFooter>
            {/* <SheetClose asChild> */}
              <Button onClick={handleButton}>Edit Profile</Button>
            {/* </SheetClose> */}
          </SheetFooter>
        </SheetContent>
      )}
    </Sheet>
  );
};

export default ProfileSheet;
