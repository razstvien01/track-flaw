import axios from "axios";
import { Dispatch, SetStateAction, useEffect } from "react";

enum ORG_QUERY {
  GET_ORGS = "GET_ORGS",
  ADD_ORG = "ADD_ORG",
  UPDATE_ORG = "UPDATE_ORG",
  GET_ORG_MEMBERS = "GET_ORG_MEMBERS",
  ADD_ORG_MEMBER = "ADD_ORG_MEMBER",
}

export const useGetOrgs = (setOrgs: Dispatch<SetStateAction<any[]>>) => {
  useEffect(() => {
    axios
      .get("/api/organizations")
      .then((response) => {
        setOrgs(response.data.organization);
      })
      .catch((error) => {
        console.error("Error retrieving users:", error);
      });
  }, [setOrgs]);
};

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

    console.log(response.data);

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
