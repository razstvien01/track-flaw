import {
  addOrg,
  checkIfExistsOrg,
  deleteOrg,
  getOrgs,
  updateOrg
} from "@/app/controllers/organizations.controller";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const orgs = await getOrgs();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Fetch Users Successfully",
        orgs,
      })
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failure in fetching the users",
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const userData = await request.json();
    
    const { email_address } = userData;

    if (await checkIfExistsOrg(email_address)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This User is Already Exists. Please Try Another Email Address",
        },
        {
          status: 500,
        }
      );
    }

    await addOrg(userData);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Account User Created Successfully",
      })
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "User Registration Failed",
      },
      {
        status: 500,
      }
    );
  }
};

export const DELETE = async (request: NextRequest) => {
  try {
    const user = await request.json();
    const { id } = user;

    await deleteOrg(id);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Account User Deleted Successfully",
      })
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Deleting the User Account Failed",
      },
      {
        status: 500,
      }
    );
  }
};

export const PUT = async (request: NextRequest) => {
  try {
    const user = await request.json();
    
    await updateOrg(user)
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "Account User Updated Successfully",
      })
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Updating the User Account Failed",
      },
      {
        status: 500,
      }
    );
  }
};
