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
    const orgs = await getProjects();

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
            orgs,
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
    const orgData = await request.json();

    const { org_email } = orgData;
    
    console.log(org_email)

    if (await checkIfExistsProj(org_email)) {
      console.log('muagiii')
      return NextResponse.json(
        {
          success: false,
          message:
            "This Project is Already Exists. Please Try Another Email Address",
        },
        {
          status: 500,
        }
      );
    }

    await addProject(orgData);

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
    const orgData = await request.json();
    const { org_id } = orgData;

    await deleteProject(org_id);

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
