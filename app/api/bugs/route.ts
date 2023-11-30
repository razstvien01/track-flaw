import { addBug, checkIfExistsBug, getBugs } from "@/controllers/bugs.controller";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url)
  const project_id = url.searchParams.get('project_id') as string
  try {
    
    const bugs = await getBugs(project_id)
    return new Response(
      JSON.stringify({
        success: true,
        bugs
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
    
    await addBug(data)

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
    return new Response(
      JSON.stringify({
        success: true,
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
    return new Response(
      JSON.stringify({
        success: true,
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
