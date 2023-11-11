import { NextRequest, NextResponse } from "next/server";

import { createNotif, getNotifs } from "@/controllers/notifications.controller";

export const GET = async (request: NextRequest) => {
  try {
    const url = new URL(request.url);
    const user_id = url.searchParams.get("user_id") || undefined
    const org_ids = url.searchParams.getAll("org_ids") || undefined;
    
    console.log(org_ids)
    console.log(url)
    
    const notifications = await getNotifs({
      user_id: user_id,
      org_ids: org_ids
    })
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "Notification fetched successfully",
        notifications
      })
    );
      
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failure in Fetching a Notification",
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
        message: "Failure in Creating a Notification",
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
