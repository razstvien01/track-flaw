"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { taskSchema } from "../../data/schema";
import { useEffect, useState } from "react";
import { AlertDialogPop } from "@/components/alert-dialog";
import { useCurrOrgDataAtom } from "@/app/hooks/curr_org_data_atom";
import { removeMember } from "@/app/services/org.service";
import { ShowToast } from "@/components/show-toast";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const member = taskSchema.parse(row.original);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [currOrgData, setCurrOrgData] = useCurrOrgDataAtom();
  const [isSave, setIsSave] = useState<boolean>(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastParams, setToastParams] = useState<any>();
  
  useEffect(() => {
    if (hasSubmitted) {
      const timer = setTimeout(() => {
        setShowToast(true);
        setIsSave(false)
        setOpenDeleteDialog(false)
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [hasSubmitted]);
  
  useEffect(() => {
    if (showToast) {
      ShowToast(toastParams);
      setShowToast(false);
      setHasSubmitted(false);
    }
  }, [showToast, toastParams]);
  
  const handleContinue = async () => {
    setIsSave(true)
    
    
    const { user_id = '' } = member || {}
    const { org_id = "" } = currOrgData || {};
    
    const result = await removeMember(org_id, user_id)
    
    if(result.success){
      setHasSubmitted(true)
      setToastParams({
        title: "Creating Organization",
        description: "You have successfully remove a member in the organization.",
        variant: "default",
      });
    } else {
      setHasSubmitted(true)
      setToastParams({
        title: "Creating Organization",
        description: "Failed in removing a member in the organization.",
        variant: "destructive",
      });
    }
    
  }

  return (
    <>
      <AlertDialogPop
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will remove a member
        account and remove its data from our organization."
        openDeleteDialog={openDeleteDialog}
        setOpenDeleteDialog={setOpenDeleteDialog}
        handleContinue={handleContinue}
        isSave={isSave}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>View User</DropdownMenuItem>
          <DropdownMenuItem>Favorite</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpenDeleteDialog(true)}>
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
