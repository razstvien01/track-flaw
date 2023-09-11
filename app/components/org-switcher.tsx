"use client";

import { useEffect, useState } from "react";
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
import { useGetOrgs } from "../services/org.service";
import { Skeleton } from "@/components/ui/skeleton";

const groups = [
  {
    label: "Personal Account",
    organizations: [
      {
        label: "Alicia Koch",
        value: "personal",
      },
    ],
  },
  {
    label: "Organizations",
    organizations: [
      {
        label: "Acme Inc.",
        value: "acme-inc",
      },
      {
        label: "Monsters Inc.",
        value: "monsters",
      },
    ],
  },
];

type Org = (typeof groups)[number]["organizations"][number];

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface OrgSwitcherProps extends PopoverTriggerProps {}

export default function OrgSwitcher({ className }: OrgSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [showNewOrgDialog, setShowNewOrgDialog] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<any>(
    // groups[0].organizations[0]
    {
      org_name: ''
    }
  );
  const [orgs, setOrgs] = useState<any[]>([]);

  useGetOrgs(setOrgs);

  useEffect(() => {
    console.log(typeof orgs);
    // console.log(orgs.map);
    console.log(orgs.map((org) => org));
    return () => {};
  }, [orgs]);

  return (
    <Dialog open={showNewOrgDialog} onOpenChange={setShowNewOrgDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team"
            className={cn("w-[200px] justify-between", className)}
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
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search team..." />
              <CommandEmpty>No team found.</CommandEmpty>
              {orgs.map((organization) => {
                const { label, orgs } = organization;
                return (
                  <CommandGroup key={label} heading={label}>
                    {orgs.map((org: any) => {
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
                  </CommandGroup>
                );
              })}
              {/* {orgs.map((org: any) => (
                <CommandGroup key={org.label} heading={'Organizations'}>
                  <CommandItem
                    key={org.id}
                    onSelect={() => {
                      setSelectedOrg(org.organization);
                      setOpen(false);
                    }}
                    className="text-sm"
                  >
                    <Avatar className="mr-2 h-5 w-5">
                      <AvatarImage
                        src={`https://avatar.vercel.sh/${org.organization.org_name}.png`}
                        alt={org.organization.org_name}
                        className="grayscale"
                      />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    {org.org_name}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedOrg.org_name === org.organization.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                </CommandGroup>
              ))} */}
              {/* {group.organizations.map((org) => (
                    <CommandItem
                      key={org.value}
                      onSelect={() => {
                        setSelectedOrg(org);
                        setOpen(false);
                      }}
                      className="text-sm"
                    >
                      <Avatar className="mr-2 h-5 w-5">
                        <AvatarImage
                          src={`https://avatar.vercel.sh/${org.value}.png`}
                          alt={org.label}
                          className="grayscale"
                        />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      {org.label}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedOrg.value === org.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))} */}
              {/* </CommandGroup>
              ))} */}
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
      {/* <DialogContent>
        <DialogHeader>
          <DialogTitle>Create organization</DialogTitle>
          <DialogDescription>
            Add a new organization to our list of partners to expand our network and collaborate on exciting projects.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Organization name</Label>
              <Input id="name" placeholder="Enter organization name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan">Subscription plan</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">
                    <span className="font-medium">Free</span> -{" "}
                    <span className="text-muted-foreground">
                      Trial for two weeks
                    </span>
                  </SelectItem>
                  <SelectItem value="pro">
                    <span className="font-medium">Pro</span> -{" "}
                    <span className="text-muted-foreground">
                      $9/month per user
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowNewOrgDialog(false)}>
            Cancel
          </Button>
          <Button type="submit">Continue</Button>
        </DialogFooter>
      </DialogContent> */}
    </Dialog>
  );
}
