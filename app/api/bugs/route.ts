
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
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
    return new Response(
      JSON.stringify({
        success: true,
        message: "hello world"
      })
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Project Registration Failed",
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
        success: true
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
