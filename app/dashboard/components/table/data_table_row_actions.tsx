"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { taskSchema } from "../../data/schema";
import { useCallback, useEffect, useState } from "react";
import { AlertDialogPop } from "@/components/alert-dialog";
import { useCurrOrgDataAtom } from "@/hooks/curr_org_data_atom";
import { getMembersInOrgs, removeMember } from "@/services/org.service";
import { ShowToast } from "@/components/show-toast";
import { useCurrOrgMemberAtom } from "@/hooks/curr_org_members_atom";
import { UpdateMemberDialog } from "../dialogs/update_member_dialog";
import { ViewMemberDialog } from "../dialogs/view_member_dialog";
import { createNotif } from "@/services/notifications.service";
import { useUserDataAtom } from "@/hooks/user_data_atom";
interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const member = taskSchema.parse(row.original);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [openViewDialog, setOpenViewDialog] = useState<boolean>(false);
  const [currOrgData, setCurrOrgData] = useCurrOrgDataAtom();
  const { org_name = "" } = currOrgData || {}
  
  const [isSave, setIsSave] = useState<boolean>(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastParams, setToastParams] = useState<any>();
  const [orgMembers, setOrgMembers] = useCurrOrgMemberAtom();

  const { user_id = "", role = "", full_name = "" } = member || {};
  const { org_id = "" } = currOrgData || {};
  
  const [userData, setUserData] = useUserDataAtom();
  

  const fetchMembers = useCallback(async () => {
    if (org_id !== "") {
      const result = await getMembersInOrgs(org_id);
      if (result.success) {
        setOrgMembers(result.data);
      }
    }
  }, [org_id, setOrgMembers]);

  useEffect(() => {
    if (hasSubmitted) {
      const timer = setTimeout(() => {
        setShowToast(true);
        setIsSave(false);
        setOpenDeleteDialog(false);
        fetchMembers();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [hasSubmitted, fetchMembers]);

  useEffect(() => {
    if (showToast) {
      ShowToast(toastParams);
      setShowToast(false);
      setHasSubmitted(false);
    }
  }, [showToast, toastParams]);

  const handleContinue = async () => {
    setIsSave(true);
    const memberName = full_name
    const result = await removeMember(org_id, user_id, role);
    
    if (result.success) {
      const { full_name, user_id, photo_url } = userData
      
      const params = {
        user_id,
        org_id,
        photo_url,
        title: "Member Removed",
        description: `${full_name} removed ${memberName} in the ${org_name} organization`,
        type: "organization",
      };
      
      await createNotif(params)
      
      setHasSubmitted(true);
      setToastParams({
        title: "Remove Member",
        description:
          "You have successfully remove a member in the organization.",
        variant: "default",
      });
    } else {
      setHasSubmitted(true);
      setToastParams({
        title: "Remove Member",
        description: "Failed in removing a member in the organization.",
        variant: "destructive",
      });
    }
  };

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
      <UpdateMemberDialog
        showDialog={openEditDialog}
        setShowDialog={setOpenEditDialog}
        currentRole={role}
        member_id={user_id}
        name={full_name}
      />
      <ViewMemberDialog
        showDialog={openViewDialog}
        setShowDialog={setOpenViewDialog}
        currentRole={role}
        member={member}
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
          <DropdownMenuItem onClick={() => setOpenViewDialog(true)}>
            View Member
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenEditDialog(true)}>
            Edit
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpenDeleteDialog(true)}>
            Remove
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
