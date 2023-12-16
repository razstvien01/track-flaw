import {
  addBug,
  checkIfExistsBug,
  deleteBug,
  getBugs,
  updateBugStatus,
} from "@/controllers/bugs.controller";
import { NextRequest, NextResponse } from "next/server";
import { BUG_QUERY } from "@/types/constants";

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);
  const project_id = url.searchParams.get("project_id") as string;
  const query = url.searchParams.get("query");

  let bugs = null;
  try {
    switch (query) {
      case BUG_QUERY.GET_BUGS_PROJ:
        bugs = await getBugs(project_id);
        break;
    }

    return new Response(
      JSON.stringify({
        success: true,
        bugs,
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
    const data = await request.json();

    const { bug_name, project_id, org_id } = data;

    if (await checkIfExistsBug(bug_name, project_id, org_id)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This Bug is Already Exists in the Project. Please Try Another Bug Name",
        },
        {
          status: 500,
        }
      );
    }

    await addBug(data);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Bug Created Successfully",
      })
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Bug Creation Failed",
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
    const bug_id = url.searchParams.get("bug_id") as string;

    switch (query) {
      case BUG_QUERY.DELETE_BUG_PROJ:
        await deleteBug(bug_id);
        break;

      default:
        break;
    }
    return new Response(
      JSON.stringify({
        success: true,
        message: "Bug Deleted Successfully",
      })
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Deleting the Bug Failed",
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
    const { query = "", ...restData } = data || {};

    switch (query) {
      case BUG_QUERY.UPDATE_STATUS:
        await updateBugStatus(restData);
        break;

      default:
        break;
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Updating Bug Successfully"
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
