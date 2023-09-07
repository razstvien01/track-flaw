import {
  getUsers,
  addUser,
  checkIfExistsUser,
} from "@/app/controllers/users.controller";
import { NextRequest, NextResponse } from "next/server";
import { type } from "os";

export const GET = async (request: NextRequest) => {
  const users = await getUsers()

  // return new Response(JSON.stringify({ message: 'success', users: users}))
  return new Response(JSON.stringify({ message: "success" }));
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  try {
    if (await checkIfExistsUser(body)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This user is already exists. Please try another email address",
        },
        {
          status: 401,
        }
      );
    }

    await addUser(body);

    return new Response(JSON.stringify({ success: true, message: "Account user created successfully" }));
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "User Registration failed",
      },
      {
        status: 401,
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
