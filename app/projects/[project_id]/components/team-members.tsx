
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
import { useCallback, useEffect, useState } from "react";
import { getMembersInOrgs } from "@/services/org.service";
import { useCurrOrgDataAtom } from "@/hooks/curr_org_data_atom";
import { OrgMembersType } from "@/types/types";
import { getTeamMembers, updateTeamMember } from "@/services/projects.service";
import { ShowToast } from "@/components/show-toast";
import { Badge } from "@/components/ui/badge"

interface TeamMembersProps {
  project_id: string;
}
export function TeamMembers({ project_id }: TeamMembersProps) {
  const [currOrgData, setCurrOrgData] = useCurrOrgDataAtom();
  const { org_id = "" } = currOrgData;
  const [orgMembers, setOrgMembers] = useState<OrgMembersType[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [teamMembers, setTeamMembers] = useState<OrgMembersType[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false)
  
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


  const addTeamMember = async (user_id: string, role: string) => {
    const response = await updateTeamMember(project_id, user_id, role);

    if (response.success) {
      setRefresh(!refresh)
      ShowToast({
        title: "Team Member Added",
        description: "A member is added to the team successfully.",
        variant: "default",
      });
    } else {
      setRefresh(!refresh)
      ShowToast({
        title: "Fail to Add a Member",
        description: "Adding a team member failed.",
        variant: "destructive",
      });
    }
  };

  return (
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
                      const { full_name, role, user_id } = member;

                      return (
                        <CommandItem
                          className="teamaspace-y-1 flex flex-col items-start px-4 py-2"
                          key={index}
                          onSelect={() => {
                            addTeamMember(user_id, role);
                            setOpen(!open);
                          }}
                        >
                          <p>{full_name}</p>
                          <p className="text-sm text-muted-foreground">
                            {role}
                          </p>
                        </CommandItem>
                      );
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
          const { full_name = "", email_address = "", role = "", photo_url = "" } = member || {}
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
                  <p className="text-sm text-muted-foreground">{email_address}</p>
                </div>
                
              </div>
              <Badge variant={"secondary"}>{role}</Badge>
              <Button variant={"default"}>
                <TrashIcon/>
              </Button>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
