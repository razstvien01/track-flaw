import { PROJECT_QUERY } from "@/types/constants";
import { ProjectDataProps } from "@/types/types";
import axios from "axios";

export const createProject = async (
  projectData: ProjectDataProps,
  uid: string
) => {
  try {
    const response = await axios.post("api/projects", {
      ...projectData,
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

export const getProjectsInOrgs = async (org_id: string) => {
  try {
    const params = {
      org_id,
      query: PROJECT_QUERY.GET_PROJS_BY_ID,
    };
    const response = await axios.get("/api/projects", {
      params,
    });

    return {
      success: true,
      data: response.data?.projects,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data,
    };
  }
};

export const getProjectById = async (project_id: string) => {
  try {
    const params = {
      project_id,
      query: PROJECT_QUERY.GET_PROJ_BY_ID,
    };
    const response = await axios.get("/api/projects", {
      params,
    });

    return {
      success: true,
      data: response.data?.projects,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data,
    };
  }
};

export const updateTeamMember = async (project_id: string, user_id: string, role: string) => {
  try {
    const response = await axios.put("/api/projects", {
      project_id,
      user_id,
      role,
      query: PROJECT_QUERY.UPDATE_TEAM_MEMBERS,
    });

    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data,
    };
  }
};
