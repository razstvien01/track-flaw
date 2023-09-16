import {
  getUsers,
  addUser,
  checkIfExistsUser,
  deleteUser,
  updateUser,
  checkIfExistsUserId,
  getUser,
} from "@/app/controllers/users.controller";
import { NextRequest, NextResponse } from "next/server";

enum USER_QUERY {
  GET_USER = "GET_USER",
  GET_USERS = "GET_USERS",
}

export const GET = async (request: NextRequest, response: NextResponse) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("query");
  
  try {
    switch (query) {
      case USER_QUERY.GET_USER:
        
        const user_id = url.searchParams.get("user_id")
        const user = (user_id) ? await getUser(user_id): null;
        
        return new Response(
          JSON.stringify({
            success: true,
            message: "Fetch User/s Successfully",
            user
          })
        );

      case USER_QUERY.GET_USERS:
        const users = await getUsers();
        return new Response(
          JSON.stringify({
            success: true,
            message: "Fetch User/s Successfully",
            users,
          })
        );
        break;
    }
    const users = await getUsers();
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failure in fetching the user/s",
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

    const { email_address, user_id } = userData;
    
    if (user_id && (await checkIfExistsUserId(user_id))) {
      return new Response(
        JSON.stringify({
          success: true,
        })
      );
    } else if (!user_id && (await checkIfExistsUser(email_address))) {
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
    const { user_id } = user;

    await deleteUser(user_id);

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

    await updateUser(user);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Account User Details Updated Successfully",
      })
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Updating the User Account Details Failed",
      },
      {
        status: 500,
      }
    );
  }
};
