import {
  addProject,
  checkIfExistsProj,
  deleteProject,
  getProjects,
  getProjectsByOrgId,
  updateProject,
  getProjectById,
  updateTeamMember,
  getTeamMembers,
  removeTeamMember,
} from "@/controllers/projects.controller";
import { PROJECT_QUERY } from "@/types/constants";
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

      case PROJECT_QUERY.GET_TEAM_MEMBERS:
        const team_members = await getTeamMembers(project_id as string);

        return new Response(
          JSON.stringify({
            success: true,
            message,
            team_members,
          })
        );
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
    const url = new URL(request.url);
    const query = url.searchParams.get("query");
    const project_id = url.searchParams.get("project_id") as string;
    const user_id = url.searchParams.get("user_id") as string;
    const role = url.searchParams.get("role") as string;

    let message = "";
    let success = false;

    // await deleteProject(project_id);
    switch (query) {
      case PROJECT_QUERY.REMOVE_TEAM_MEMBER:
        message = "Removed Team Member Successfully";
        success = true;
        await removeTeamMember(project_id, user_id, role);
        break;

      // case ORG_QUERY.REMOVE_ORG_MEMBER:
      //   message = "Removed Member Successfully";
      //   success = true;
      //   org_id && user_id && role ? await removeMember(org_id, user_id, role): null
      //   break;
    }

    return new Response(
      JSON.stringify({
        success,
        message,
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
    const data = await request.json();
    const { query = "", project_id = "", user_id = "", role = "" } = data || {};
    let message;

    switch (query) {
      case PROJECT_QUERY.UPDATE_TEAM_MEMBERS:
        await updateTeamMember(project_id, user_id, role);
        message = "Successfully added a team member";
        break;
    }

    return new Response(
      JSON.stringify({
        success: true,
        message,
      })
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.response?.message,
      },
      {
        status: 500,
      }
    );
  }
};
