import { BugDataProps } from "@/types/types";
import axios from "axios";

export const createBug = async (
  bugData: BugDataProps,
  uid: string
) => {
  try {
    const response = await axios.post("/api/bugs", {
      ...bugData,
      creator_id: uid,
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return { success: false, error: error.response.data };
  }
};