import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dispatch, useState, SetStateAction } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UpdateMemberSubmitProps {
  role: string;
}

interface ViewMemberDialogProps {
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  currentRole: string;
  member: any;
}

export function ViewMemberDialog({
  showDialog,
  setShowDialog,
  currentRole,
  member,
}: ViewMemberDialogProps) {
  const {
    photo_url = "",
    user_id = "",
    full_name = "",
    phone_number = "",
  } = member || {};

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Member Details</DialogTitle>
        </DialogHeader>
        <div className="">
          <div className="flex justify-center items-center">
            <Avatar className="h-100 w-100 align-middle">
              <AvatarImage src={photo_url} alt="@shadcn" />
              <AvatarFallback>ZZ</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div>
          <DialogDescription>Name:</DialogDescription>
          <DialogDescription className="col-span-3 text-md">
            {full_name}
          </DialogDescription>
        </div>
        <div>
          <DialogDescription>ID:</DialogDescription>
          <DialogDescription className="col-span-3 text-md">
            {user_id}
          </DialogDescription>
        </div>
        <div>
          <DialogDescription>Role:</DialogDescription>
          <DialogDescription className="col-span-3 text-md">
            {currentRole}
          </DialogDescription>
        </div>
        <div>
          <DialogDescription>Phone Number:</DialogDescription>
          <DialogDescription className="col-span-3 text-md">
            {phone_number}
          </DialogDescription>
        </div>
        <DialogFooter>
          <Button type="button" variant={"link"} onClick={() => {}}>
            View More Details
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
