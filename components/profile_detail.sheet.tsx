import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserDataProps } from "../types/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader } from "lucide-react";
import { UserDataInit } from "../types/init";
import { toast } from "@/components/ui/use-toast";
import { updateUser } from "../services/users.service";
import { ShowToast } from "@/components/show-toast";

interface ProfileSheetProps {
  isSheetVisible: boolean;
  setIsSheetVisible: Dispatch<SetStateAction<boolean>>;
  handleOpenSheet: () => void;
  user: UserDataProps;
  isUpdate: boolean;
  setIsUpdate: Dispatch<SetStateAction<boolean>>;
}

const ProfileSheet: React.FC<ProfileSheetProps> = ({
  isSheetVisible,
  setIsSheetVisible,
  handleOpenSheet,
  user,
  isUpdate,
  setIsUpdate,
}) => {
  const [isEditProfile, setIsEditProfile] = useState(false);
  const {
    full_name = "",
    email_address = "",
    phone_number = "",
    photo_url = "",
    user_id = "",
  } = user || {};
  const [isVisible, setIsVisible] = useState({
    success: false,
    error: false,
  });

  const [newUserData, setNewUserData] = useState<UserDataProps>(UserDataInit);

  useEffect(() => {
    setNewUserData(user);

    return () => {};
  }, [user]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible({
        error: false,
        success: false,
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [isVisible.success]);
  
  const handleUpdate = async () => {
    setIsUpdate(true);

    const result = await updateUser(newUserData, user_id);

    setIsUpdate(false);

    if (result.success) {
      setIsSheetVisible(false);
      handleButton();
      
      ShowToast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
        variant: "default",
      });
    } else {
      
      ShowToast({
        title: "Updating Profile",
        description: "Updating profile failed.",
        variant: "destructive",
      });
    }
  };
  
  const handleButton = () => {
    setIsEditProfile(!isEditProfile);
  };

  const handleOnchangeData = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewUserData((prev: UserDataProps) => ({ ...prev, [id]: value }));
  };

  return (
    <>
      <Sheet open={isSheetVisible} onOpenChange={handleOpenSheet}>
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
                <Label className="text-right">Name</Label>
                <Input
                  id="full_name"
                  value={newUserData.full_name}
                  className="col-span-3"
                  onChange={(e) => handleOnchangeData(e)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Phone Number</Label>
                <Input
                  id="phone_number"
                  value={newUserData.phone_number}
                  className="col-span-3"
                  onChange={(e) => handleOnchangeData(e)}
                />
              </div>
            </div>
            <SheetFooter>
              <Button
                onClick={() => {
                  // toast({
                  //   title: "Uh oh! Something went wrong.",
                  //   description: "There was a problem with your request.",
                  // });
                  setIsSheetVisible(false);
                }}
                variant={"outline"}
              >
                Cancel
              </Button>
              <Button type="submit" onClick={handleUpdate} disabled={isUpdate}>
                {isUpdate ? (
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Save changes
              </Button>
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
                <Label className="col-span-3">
                  {phone_number ? phone_number : "No Phone Number"}
                </Label>
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
    </>
  );
};

export default ProfileSheet;
