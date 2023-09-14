import {
  addProject,
  checkIfExistsProj,
  deleteProject,
  getProjects,
  updateProject,
} from "@/app/controllers/projects.controller";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const projects = await getProjects();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Fetch Projects Successfully",
        organization: [
          {
            label: "Personal",
            orgs: [],
          },
          {
            label: "Projects",
            projects,
          },
        ],
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

    const { project_name } = projectData;
    
    if (await checkIfExistsProj(project_name)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This Project is Already Exists. Please Try Another Project Nmae",
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
    const orgData = await request.json();

    await updateProject(orgData);

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
