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

const Projects = ({ params }: any) => {
  const [error, setError] = useState<any>(null);
  const [project, setProject] = useState<ProjectDataProps>(ProjectDataInit);
  const project_id = params.project_id;

  console.log("Project_id:", project_id);

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

    // If dateInput is a string, convert it to a Date object
    if (typeof dateInput === "string") {
      date = new Date(dateInput);
    }

    // Check if date is a valid Date object
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

  // TODO add a page for project details, and view teams and bugs as well
  return (
    <Tabs defaultValue="project" className="h-full space-y-6">
      <div className="space-between flex items-center">
        <TabsList>
          <TabsTrigger value="project">Project Details</TabsTrigger>
          <TabsTrigger value="bugs">Bugs</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="project" className="border-none p-0 outline-none">
        <div className="flex">
          <div className="flex-1 flex justify-center">
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
              <PageHeaderDescription className="w-2000">
                {project_description}
              </PageHeaderDescription>
              <h1>
                Date Started - End: {formatDate(date_start)} -{" "}
                {formatDate(date_end)}
              </h1>
              <h2>Project ID: {project_id}</h2>
            </PageHeader>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="pt-10">
              <TeamMembers />
            </div>
          </div>
        </div>
      </TabsContent>  
      <TabsContent value="bugs" className="border-none p-0 outline-none ">
        <div>Bugs</div>
      </TabsContent>
    </Tabs>
  );
};

export default Projects;
