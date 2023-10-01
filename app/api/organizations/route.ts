import {
  addOrg,
  checkIfExistsOrg,
  deleteOrg,
  getOrgMembers,
  getOrgs,
  updateOrg,
} from "@/app/controllers/organizations.controller";
import { NextRequest, NextResponse } from "next/server";

enum ORG_QUERY {
  GET_ORGS = "GET_ORGS",
  GET_ORG_MEMBERS = "GET_ORG_MEMBERS",
}

export const GET = async (request: NextRequest) => {
  try {
    const url = new URL(request.url);
    const query = url.searchParams.get("query");

    switch (query) {
      case ORG_QUERY.GET_ORGS:
        const orgs = await getOrgs();
        return new Response(
          JSON.stringify({
            success: true,
            message: "Fetch Organizations Successfully",
            orgs,
          })
        );

      case ORG_QUERY.GET_ORG_MEMBERS:
        const org_id = url.searchParams.get('org_id')
        
        const org_members = (org_id) ? await getOrgMembers(org_id) : null
        return new Response(
          JSON.stringify({
            success: true,
            message: "Fetch Organization Members Successfully",
            org_members,
          })
        );
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failure in Fetching the Organizations",
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

    if (await checkIfExistsOrg(org_email)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This Organization is Already Exists. Please Try Another Email Address",
        },
        {
          status: 500,
        }
      );
    }

    await addOrg(orgData);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Organization Created Successfully",
      })
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Organization Registration Failed",
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

    await deleteOrg(org_id);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Organization Deleted Successfully",
      })
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Deleting the Organization Failed",
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

    await updateOrg(orgData);

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
