import {
  addProject,
  checkIfExistsProj,
  deleteProject,
  getProjects,
  getProjectsByOrgId,
  updateProject,
  getProjectById,
} from "@/controllers/projects.controller";
import { PROJECT_QUERY } from "@/types/constants";
import { query } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const url = new URL(request.url);
    const query = url.searchParams.get("query");
    const org_id = url.searchParams.get("org_id");
    const project_id = url.searchParams.get("project_id");
    let projects;
    let message;

    switch (query) {
      case PROJECT_QUERY.GET_PROJS_BY_ID:
        projects = await getProjectsByOrgId(org_id as string);
        message = "Fetch Projects Successfully";
        break;

      case PROJECT_QUERY.GET_PROJ:
        projects = await getProjects();
        message = "Fetch Projects Successfully";
        break;
      case PROJECT_QUERY.GET_PROJ_BY_ID:
        projects = await getProjectById(project_id as string);
        
        message = "Fetch Project Successfully";
        break;
    }

    return new Response(
      JSON.stringify({
        success: true,
        message,
        projects,
      })
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failure in Fetching the Projects",
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const projectData = await request.json();

    const { project_name, org_id } = projectData;

    if (await checkIfExistsProj(project_name, org_id)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This Project is Already Exists in the Organization. Please Try Another Project Name",
        },
        {
          status: 500,
        }
      );
    }

    await addProject(projectData);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Project Created Successfully",
        project_name,
      })
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Project Registration Failed",
      },
      {
        status: 500,
      }
    );
  }
};

export const DELETE = async (request: NextRequest) => {
  try {
    const projectData = await request.json();
    const { project_id } = projectData;

    await deleteProject(project_id);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Project Deleted Successfully",
      })
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Deleting the Project Failed",
      },
      {
        status: 500,
      }
    );
  }
};

export const PUT = async (request: NextRequest) => {
  try {
    const projectData = await request.json();

    await updateProject(projectData);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Project Details Updated Successfully",
      })
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Updating the Project Failed",
      },
      {
        status: 500,
      }
    );
  }
};
