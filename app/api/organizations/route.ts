import {
  addMember,
  addOrg,
  checkIfExistsOrg,
  deleteOrg,
  getOrgDetails,
  getOrgMembers,
  getOrgs,
  updateOrg,
} from "@/controllers/organizations.controller";
import { ORG_QUERY } from "@/types/constants";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const url = new URL(request.url);
    const query = url.searchParams.get("query");
    const org_id = url.searchParams.get("org_id");

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
        // let org_id = url.searchParams.get("org_id");

        const org_members = org_id ? await getOrgMembers(org_id) : null;
        return new Response(
          JSON.stringify({
            success: true,
            message: "Fetch Organization Members Successfully",
            org_members,
          })
        );
      case ORG_QUERY.GET_ORG_DETAILS:
        const org = org_id ? await getOrgDetails(org_id) : null;
        return new Response(
          JSON.stringify({
            success: true,
            message: "Fetch Organization Details Successfully",
            org,
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
  // try {
  const data = await request.json();
  const { query = "", ...restData } = data || {};

  switch (query) {
    case ORG_QUERY.ADD_ORG:
      try {
        const { org_email } = restData;

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

        await addOrg(restData);

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

    case ORG_QUERY.ADD_ORG_MEMBER:
      try {
        await addMember(restData);
        return new Response(
          JSON.stringify({
            success: true,
            message: "Successfully Added a Member",
          })
        );
      } catch (error: any) {
        return NextResponse.json(
          {
            success: false,
            message: error.message,
          },
          {
            status: 500,
          }
        );
      }
  }
};

export const DELETE = async (request: NextRequest) => {
  try {
    const url = new URL(request.url);
    const query = url.searchParams.get("query");
    const org_id = url.searchParams.get("org_id");
    const user_id = url.searchParams.get("user_id");
    let message = "";
    let success = false;

    switch (query) {
      case ORG_QUERY.DELETE_ORG:
        message = "Organization Deleted Successfully";
        success = true;
        org_id ? await deleteOrg(org_id) : null;
        break;

      case ORG_QUERY.REMOVE_ORG_MEMBER:
        message = "Removed Member Successfully";
        success = true;
        break;
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
    const data = await request.json();

    await updateOrg(data);

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
