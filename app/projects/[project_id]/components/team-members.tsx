import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { useCurrOrgMemberAtom } from "@/hooks/curr_org_members_atom";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { getMembersInOrgs } from "@/services/org.service";
import { useCurrOrgDataAtom } from "@/hooks/curr_org_data_atom";
import { OrgMembersType } from "@/types/types";
import {
  getTeamMembers,
  removeTeamMember,
  updateTeamMember,
} from "@/services/projects.service";
import { ShowToast } from "@/components/show-toast";
import { Badge } from "@/components/ui/badge";
import { AlertDialogPop } from "@/components/alert-dialog";
import { useUserDataAtom } from "@/hooks/user_data_atom";
import { createNotif } from "@/services/notifications.service";
import { useRefreshNotif } from "@/hooks/refresh_notif-atom";

interface TeamMembersProps {
  project_id: string;
  project_name: string;
}
export function TeamMembers({ project_id, project_name }: TeamMembersProps) {
  const [currOrgData, setCurrOrgData] = useCurrOrgDataAtom();
  const { org_id = "" } = currOrgData;
  const [orgMembers, setOrgMembers] = useState<OrgMembersType[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [teamMembers, setTeamMembers] = useState<OrgMembersType[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [isSave, setIsSave] = useState<boolean>(false);
  const [userData, setUserData] = useUserDataAtom();
  const { org_name = "" } = currOrgData || {};
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isToggleNotif, setIsToggleNotif] = useRefreshNotif();
  const [toRemove, setToRemove] = useState<any>();

  const fetchMembers = useCallback(async () => {
    if (org_id !== "") {
      const result = await getMembersInOrgs(org_id);
      if (result.success) {
        setOrgMembers(result.data);
      }
    }
  }, [org_id, setOrgMembers]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const fetchTeamMembers = useCallback(async () => {
    if (org_id !== "") {
      const result = await getTeamMembers(project_id);
      if (result.success) {
        setTeamMembers(result.data);
      }
    }
  }, [project_id, setTeamMembers, org_id, refresh]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  useEffect(() => {
    fetchTeamMembers();
  }, [fetchTeamMembers]);

  const addTeamMember = async (user_id: string, role: string, full_name: string) => {
    const response = await updateTeamMember(project_id, user_id, role);
    
    if (response.success) {
      const params = {
        user_id: userData.user_id,
        org_id,
        photo_url: userData.photo_url,
        project_id,
        title: "Team Member Added",
        description: `${userData.full_name} added ${full_name} in the project ${project_name} in the ${org_name} organization`,
        type: "project",
      };
      
      await createNotif(params);  
      
      setIsToggleNotif((prev) => !prev);

      setRefresh(!refresh);
      ShowToast({
        title: "Team Member Added",
        description: "A member is added to the team successfully.",
        variant: "default",
      });
    } else {
      setRefresh(!refresh);
      ShowToast({
        title: "Fail to Add a Member",
        description: "Adding a team member failed.",
        variant: "destructive",
      });
    }
  };

  const handleContinue = async (member: any) => {
    setIsSave(true);
    const { user_id = "", role = "", full_name = "" } = toRemove || {};

    const memberName = full_name;

    const result = await removeTeamMember(project_id, user_id, role);

    if (result.success) {
      const { full_name, user_id, photo_url } = userData;

      const params = {
        user_id,
        org_id,
        photo_url,
        project_id,
        title: "Team Member Removed",
        description: `${full_name} removed ${memberName} in the project ${project_name}`,
        type: "project",
      };
      
      
      await createNotif(params);

      setHasSubmitted(true);

      setIsToggleNotif((prev) => !prev);

      setRefresh(!refresh);

      ShowToast({
        title: "Remove a Team Member",
        description:
          "You have successfully remove a team member in the team project.",
        variant: "default",
      });

      setOpenDeleteDialog(false);
    } else {
      setHasSubmitted(true);

      ShowToast({
        title: "Remove a Team Member",
        description: "Failed in removing a team member in the team project.",
        variant: "destructive",
      });
    }

    setIsSave(false);
  };

  return (
    <>
      <AlertDialogPop
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will remove a team member in the project team."
        openDeleteDialog={openDeleteDialog}
        setOpenDeleteDialog={setOpenDeleteDialog}
        handleContinue={handleContinue}
        isSave={isSave}
      />
      <Card>
        <CardHeader>
          <CardTitle>
            Team Members
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button className="ml-5">
                  <PlusIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0" align="end">
                <Command>
                  <CommandInput placeholder="Search a member..." />
                  <CommandList>
                    <CommandEmpty>No roles found.</CommandEmpty>
                    <CommandGroup className="p-1.5">
                      {orgMembers.map((member, index) => {
                        const { full_name, role, user_id, photo_url } = member;

                        //* Check if the user_id doesn't exist in team_members
                        const isMemberExists = teamMembers.find(
                          (teamMember) => teamMember.user_id === user_id
                        );

                        //* If the user_id doesn't exist in team_members, render the member
                        if (!isMemberExists) {
                          return (
                            <CommandItem
                              className="teamaspace-y-1 flex flex-col items-start px-4 py-2"
                              key={index}
                              onSelect={() => {
                                addTeamMember(user_id, role, full_name);
                                setOpen(!open);
                              }}
                            >
                              <div className="flex-col">
                                <div className="flex">
                                  <Avatar className="mr-2">
                                    <AvatarImage src={photo_url} />
                                    <AvatarFallback>SD</AvatarFallback>
                                  </Avatar>
                                  <div className="flex-col">
                                    <p>{full_name}</p>
                                    <p className="text-sm text-muted-foreground">
                                      {role}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </CommandItem>
                          );
                        }
                        return null;
                      })}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </CardTitle>
          <CardDescription>
            Invite your team members to collaborate.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 w-auto">
          {teamMembers.map((member, index) => {
            const {
              full_name = "",
              email_address = "",
              role = "",
              photo_url = "",
            } = member || {};
            return (
              <div
                key={index}
                className="flex items-center justify-between space-x-4"
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={photo_url} />
                    <AvatarFallback>SD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">
                      {full_name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {email_address}
                    </p>
                  </div>
                </div>
                <Badge variant={"secondary"}>{role}</Badge>
                <Button
                  variant={"default"}
                  onClick={() => {
                    setToRemove(member);
                    setOpenDeleteDialog(true);
                  }}
                >
                  <TrashIcon />
                </Button>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </>
  );
}
