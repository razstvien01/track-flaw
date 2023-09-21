"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import OrgSwitcherDialog from "./org-switcher.dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { OrgDataProps } from "../types/types";
import { OrgDataInit } from "../types/init";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface OrgSwitcherProps extends PopoverTriggerProps {
  org_refs: OrgDataProps[];
  showNewOrgDialog: boolean
  setShowNewOrgDialog: Dispatch<SetStateAction<boolean>>
}

export default function OrgSwitcher({ className, org_refs, showNewOrgDialog, setShowNewOrgDialog }: OrgSwitcherProps) {
  const [open, setOpen] = useState(false);
  
  const [selectedOrg, setSelectedOrg] = useState<OrgDataProps>(OrgDataInit);
  
  return (
    <Dialog open={showNewOrgDialog} onOpenChange={setShowNewOrgDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select an organization"
            className={cn("w-[250px] justify-between", className)}
          >
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage
                src={`https://avatar.vercel.sh/${selectedOrg.org_name}.png`}
                alt={selectedOrg.org_name}
              />
              <AvatarFallback></AvatarFallback>
            </Avatar>
            {selectedOrg.org_name}
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search organization..." />
              <CommandEmpty>No organization found.</CommandEmpty>
              {org_refs.map((org: any) => {
                const { org_name } = org;
                return (
                  <CommandItem
                    key={org_name}
                    onSelect={() => {
                      setSelectedOrg(org);
                      setOpen(false);
                    }}
                  >
                    <Avatar className="mr-2 h-5 w-5">
                      <AvatarImage
                        src={`https://avatar.vercel.sh/${org_name}.png`}
                        alt={org_name}
                        className="grayscale"
                      />
                      <AvatarFallback></AvatarFallback>
                      <Skeleton></Skeleton>
                    </Avatar>
                    {org_name}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedOrg.org_name === org_name
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                );
              })}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShowNewOrgDialog(true);
                    }}
                  >
                    <PlusCircledIcon className="mr-2 h-5 w-5" />
                    Create Organization
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <OrgSwitcherDialog setShowNewOrgDialog={setShowNewOrgDialog} />
    </Dialog>
  );
}
