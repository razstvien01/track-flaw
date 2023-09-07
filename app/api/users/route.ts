import {
  getUsers,
  addUser,
  checkIfExistsUser,
} from "@/app/controllers/users.controller";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const users = await getUsers();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Fetch users successfully",
        users,
      })
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Failure in fetching the users",
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = async (request: NextRequest) => {
  const userData = await request.json();

  try {
    const { email_address } = userData;
    
    if (await checkIfExistsUser(email_address)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This user is already exists. Please try another email address",
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
        message: "Account user created successfully",
      })
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "User Registration failed",
      },
      {
        status: 500,
      }
    );
  }
};

export const DELETE = async (request: NextRequest) => {
  
  return new Response(JSON.stringify({ message: "success", method: "DELETE" }));
};

export const PUT = async (request: NextRequest) => {
  return new Response(JSON.stringify({ message: "success", method: "PUT" }));
};
