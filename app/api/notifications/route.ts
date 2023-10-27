import { NextRequest, NextResponse } from "next/server";

import { createNotif } from "@/controllers/notifications.controller";

export const GET = async (request: NextRequest) => {
  try {
    const url = new URL(request.url);
    const query = url.searchParams.get("query");
    
    
    
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failure in Fetching the Organizations",
      },
      {
        status: 404,
      }
    );
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const data = await request.json();
    // const { query = "", ...restData } = data || {};
    
    await createNotif(data)
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "Notification created successfully",
      })
    );
    
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failure in Fetching the Organizations",
      },
      {
        status: 404,
      }
    );
  }
};

export const DELETE = async (request: NextRequest) => {
  try {
    const url = new URL(request.url);
    const query = url.searchParams.get("query");
    let message = "";
    let success = false;
    
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
        message: "Deleting the Organization Failed",
        request,
      },
      {
        status: 500,
      }
    );
  }
};

export const PUT = async (request: NextRequest) => {
  try {
    // const data = await request.json();
    const data = await request.json();
    const { query = "", ...restData } = data || {};
    const { role, org_id, user_id } = restData || {};
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "Organization Details Updated Successfully",
      })
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Updating the Organization Failed",
      },
      {
        status: 500,
      }
    );
  }
};
