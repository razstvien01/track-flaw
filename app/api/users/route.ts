import {
  getUsers,
  addUser,
  checkIfExistsUser,
  deleteUser,
  updateUser,
} from "@/app/controllers/users.controller";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const users = await getUsers();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Fetch Users Successfully",
        users,
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

    if (await checkIfExistsUser(email_address)) {
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

    await addUser(userData);

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

    await deleteUser(id);

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
    
    await updateUser(user)
    
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

  return new Response(JSON.stringify({ message: "success", method: "PUT" }));
};
