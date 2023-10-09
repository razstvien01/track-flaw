
import axios from "axios";
import { ORG_QUERY } from "../types/constants";

export const createOrganization = async (orgData: any, uid: string) => {
  try {
    const response = await axios.post("/api/organizations", {
      ...orgData,
      creator_id: uid,
      query: ORG_QUERY.ADD_ORG,
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response.data };
  }
};

interface AddMemberParams {
  memberData: object;
  org_id: string;
}

export const addMemberInOrg = async ({
  memberData,
  org_id,
}: AddMemberParams) => {
  try {
    const response = await axios.post("/api/organizations", {
      ...memberData,
      org_id,
      query: ORG_QUERY.ADD_ORG_MEMBER,
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response.data,
    };
  }
};

export const getMembersInOrgs = async (org_id: string) => {
  try {
    const params = {
      org_id,
      query: ORG_QUERY.GET_ORG_MEMBERS,
    };
    const response = await axios.get("/api/organizations", {
      params,
    });

    return {
      success: true,
      data: response.data.org_members,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response.data,
    };
  }
};

export const removeMember = async (org_id: string, user_id: string, role: string) => {
  try {
    const params = {
      org_id,
      user_id,
      role,
      query: ORG_QUERY.REMOVE_ORG_MEMBER,
    };
    
    
    const response = await axios.delete("/api/organizations", {
      params,
    });

    return {
      success: true,    };
  } catch (error: any) {
    return {
      success: false,
    };
  }
};

export const getOrgDetails = async (org_id: string) => {
  try {
    const params = {
      org_id,
      query: ORG_QUERY.GET_ORG_DETAILS,
    };
    const response = await axios.get("/api/organizations", {
      params,
    });

    return {
      success: true,
      data: response.data.org,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response.data,
    };
  }
};