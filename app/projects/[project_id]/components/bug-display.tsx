import React, { Dispatch, useCallback, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Separator } from "@radix-ui/react-select";
import { DataTable } from "./data_table";
import { columns } from "./columns";
import { getBugsInProj } from "@/services/bugs.service";
import { BugDataProps } from "@/types/types";
import { BugDataInit } from "@/types/init";

interface BugDisplayProjProps {
  project_id: string;
  showDialog: boolean;
  setShowDialog: Dispatch<React.SetStateAction<boolean>>;
}

const BugDisplayProj = ({
  project_id,
  showDialog,
  setShowDialog,
}: BugDisplayProjProps) => {
  const [bugs, setBugs] = useState<BugDataProps[]>([]);
  const [error, setError] = useState<any>(null);

  const fetchBugs = useCallback(async () => {
    const result = await getBugsInProj(project_id);

    if (result.success) {
      setBugs(result.data);
    }
  }, [project_id]);
  
  useEffect(() => {
    fetchBugs()
  }, [fetchBugs])
  
  console.log(bugs)

  return (
    <div className="h-full px-4 lg:px-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Project Bugs
          </h2>
          <p className="text-sm text-muted-foreground">
            For viewing, adding, deleting, and updating bug cards and to
            facilitate communication and collaboration among team members
            involved in software development and maintenance.
          </p>
        </div>
        <div className="ml-auto mr-4">
          <Button onClick={() => setShowDialog(!showDialog)}>
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Bug
          </Button>
        </div>
      </div>
      <Separator className="my-4" />
      <DataTable data={bugs || []} columns={columns} />
    </div>
  );
};

export default BugDisplayProj;
