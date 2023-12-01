"use client";

import React, { useCallback, useEffect, useState } from "react";
import NotFound from "./not-found";
import { getProjectById } from "@/services/projects.service";
import { ProjectDataProps } from "@/types/types";
import { ProjectDataInit } from "@/types/init";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TeamMembers } from "./components/team-members";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Separator } from "@radix-ui/react-select";
import AddBugDialog from "../components/add_bug_dialog";
import { useCurrOrgDataAtom } from "@/hooks/curr_org_data_atom";
import { columns } from "./components/columns";
import { DataTable } from "./components/data_table";
import BugDisplayProj from "./components/bug-display";

const Projects = ({ params }: any) => {
  const [error, setError] = useState<any>(null);
  const [project, setProject] = useState<ProjectDataProps>(ProjectDataInit);
  const project_id = params.project_id;
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [currOrgData, setCurrOrgData] = useCurrOrgDataAtom();

  const fetchProject = useCallback(async () => {
    const result = await getProjectById(project_id);

    if (result.success) {
      setProject(result.data);
    } else {
      setError("Project Not Found");
    }
  }, [project_id]);

  useEffect(() => {
    fetchProject();

    return () => {};
  }, [fetchProject]);

  if (error) {
    return <NotFound />;
  }

  const formatDate = (dateInput: Date | string) => {
    let date = dateInput;

    //* If dateInput is a string, convert it to a Date object
    if (typeof dateInput === "string") {
      date = new Date(dateInput);
    }

    //* Check if date is a valid Date object
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return "Invalid date";
    }

    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const {
    photo_url = "",
    project_name = "",
    date_start = new Date(),
    date_end = new Date(),
    project_description = "",
  } = project || {};

  return (
    <>
      <AddBugDialog
        org_id={currOrgData.org_id}
        org_name={currOrgData.org_name}
        project_name={project_name}
        project_id={project_id}
        setShowDialog={setShowDialog}
        setSuccessAdd={() => {}}
        showDialog={showDialog}
      />
      <Tabs defaultValue="project" className="h-full space-y-6">
        <div className="space-between flex items-center">
          <TabsList>
            <TabsTrigger value="project">Project Details</TabsTrigger>
            <TabsTrigger value="bugs">Bugs</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="project" className="border-none p-0 outline-none">
          <div className="flex">
            <div className="flex-3 flex justify-start">
              <PageHeader>
                <PageHeaderHeading
                  style={{
                    backgroundImage: `url(${photo_url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    transition: "all 0.3s ease-in-out",
                    width: "100%",
                    paddingTop: "12%",
                  }}
                >
                  {project_name}
                </PageHeaderHeading>
                <h1>
                  Date Started - End: {formatDate(date_start)} -{" "}
                  {formatDate(date_end)}
                </h1>
                <h2>Project ID: {project_id}</h2>
                <PageHeaderDescription className="w-2000">
                  {project_description}
                </PageHeaderDescription>
              </PageHeader>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="pt-10">
                <TeamMembers
                  project_id={project_id}
                  project_name={project.project_name}
                />
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="bugs" className="border-none p-0 outline-none ">
          <BugDisplayProj
            project_id={project_id}
            showDialog={showDialog}
            setShowDialog={setShowDialog}
          />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Projects;
