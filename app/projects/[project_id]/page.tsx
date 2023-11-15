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

  console.log(project);

  const {
    photo_url = "",
    project_name = "",
    date_start = "",
    date_end = "",
    project_description = "",
  } = project || {};
  
  // TODO add a page for project details, and view teams and bugs as well
  return (
    <div>
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
        <PageHeaderDescription className="w-2000">{project_description}</PageHeaderDescription>
      </PageHeader>
    </div>
  );
};

export default Projects;
