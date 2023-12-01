import { BUG_QUERY } from "@/types/constants";
import { BugDataProps } from "@/types/types";
import axios from "axios";

export const createBug = async (bugData: BugDataProps, uid: string) => {
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

export const getBugsInProj = async (project_id: string) => {
  try {
    const params = {
      project_id,
      query: BUG_QUERY.GET_BUGS_PROJ,
    };

    const response = await axios.get("/api/bugs", {
      params,
    });
    
    return {
      success: true,
      data: response.data.bugs
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.response.data,
    };
  }
};
