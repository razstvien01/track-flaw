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

import { priorities, severities, statuses } from "../data/data";
import { taskSchema } from "../data/schema";
import { AlertDialogPop } from "@/components/alert-dialog";
import { useEffect, useState } from "react";
import { deleteBugInProj } from "@/services/bugs.service";
import { createNotif } from "@/controllers/notifications.controller";
import { useUserDataAtom } from "@/hooks/user_data_atom";
import { useCurrOrgDataAtom } from "@/hooks/curr_org_data_atom";
import { NotifData } from "@/types/types";
import { useRefreshNotif } from "@/hooks/refresh_notif-atom";
import { ShowToast } from "@/components/show-toast";
import { useRefreshBugProj } from "@/hooks/refresh_bug_proj_atom";

// TODO should refresh the bugs after deleting
interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const bug = taskSchema.parse(row.original);
  const [isSave, setIsSave] = useState<boolean>(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [toastParams, setToastParams] = useState<any>();
  const [userData, setUserData] = useUserDataAtom();
  const [currOrgData, setCurrOrgData] = useCurrOrgDataAtom();
  const [showToast, setShowToast] = useState(false);
  const [isToggleNotif, setIsToggleNotif] = useRefreshNotif();
  const [refBugProj, setRefBugProj] = useRefreshBugProj();

  useEffect(() => {
    if (hasSubmitted) {
      const timer = setTimeout(() => {
        setShowToast(true);
        setIsSave(false);
        setOpenDeleteDialog(false);
        // fetchMembers();
        setRefBugProj((prev) => !prev);

        setIsToggleNotif((prev) => !prev);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [hasSubmitted, setIsToggleNotif, setRefBugProj]);

  useEffect(() => {
    if (showToast) {
      ShowToast(toastParams);
      setShowToast(false);
      setHasSubmitted(false);
    }
  }, [showToast, toastParams]);

  const handleContinue = async () => {
    setIsSave(true);

    const result = await deleteBugInProj(bug.id);

    if (result.success) {
      const { full_name, user_id, photo_url } = userData;
      const { org_id = "" } = currOrgData || {};

      const params = {
        user_id,
        org_id,
        photo_url,
        bug_id: bug.id,
        title: "Bug Removed",
        description: `${full_name} removed ${bug.bug_name} bug in the project`,
        type: "project",
      } as NotifData;

      await createNotif(params);

      setToastParams({
        title: "Remove Bug",
        description: "You have successfully remove a bug in the project.",
        variant: "default",
      });
    } else {
      setToastParams({
        title: "Remove Bug",
        description: "Failed in removing a bug in the project.",
        variant: "destructive",
      });
    }

    setHasSubmitted(true);
  };

  return (
    <>
      <AlertDialogPop
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will remove a bug card and remove its data from the project."
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
          {/* <DropdownMenuItem>Edit</DropdownMenuItem> */}
          {/* <DropdownMenuItem>Make a copy</DropdownMenuItem> */}
          {/* <DropdownMenuItem>Favorite</DropdownMenuItem> */}
          {/* <DropdownMenuSeparator /> */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup value={bug.status}>
                {statuses.map((status) => (
                  <DropdownMenuRadioItem
                    key={status.value}
                    value={status.value}
                    onClick={() => {
                      console.log("Clicked");
                      console.log(bug.id);
                    }}
                  >
                    {status.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Severity</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup value={bug.status}>
                {severities.map((severity) => (
                  <DropdownMenuRadioItem
                    key={severity.value}
                    value={severity.value}
                    onClick={() => {
                      console.log("Clicked");
                      console.log(bug.id);
                    }}
                  >
                    {severity.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Priority</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup value={bug.status}>
                {priorities.map((priority) => (
                  <DropdownMenuRadioItem
                    key={priority.value}
                    value={priority.value}
                    onClick={() => {
                      console.log("Clicked");
                      console.log(bug.id);
                    }}
                  >
                    {priority.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
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
