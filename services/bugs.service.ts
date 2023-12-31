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
      data: response.data.bugs,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response.data,
    };
  }
};

export const deleteBugInProj = async (bug_id: string) => {
  try {
    const params = {
      bug_id,
      query: BUG_QUERY.DELETE_BUG_PROJ,
    };

    await axios.delete("/api/bugs", {
      params,
    });

    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response.data,
    };
  }
};

export const updateBugInProj = async (bugData: BugDataProps) => {
  try {
    const params = {
      ...bugData,
      query: BUG_QUERY.UPDATE_STATUS,
    };
    
    await axios.put("/api/bugs", params);
    
    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response.data,
    };
  }
};
