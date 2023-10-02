import axios from "axios";
import { Dispatch, SetStateAction, useEffect } from 'react'

export const useGetOrgs = (setOrgs: Dispatch<SetStateAction<any[]>>) => {
  useEffect(() => {
    axios.get('/api/organizations').then((response) => {
      setOrgs(response.data.organization);
    }).catch((error) => {
      console.error('Error retrieving users:', error)
    })
  }, [setOrgs])
}

export const createOrganization = async (orgData: any, uid: string) => {
  try {
    const response = await axios.post("/api/organizations", {
      ...orgData,
      creator_id: uid,
      query: 'ADD_ORG'
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

export const addMemberInOrg = async ({ memberData, org_id }: AddMemberParams) => {
  try {
    const response = await axios.post("/api/organizations", {
      ...memberData,
      org_id,
      query: 'ADD_ORG_MEMBER'
    });
    return {
      success: true,
      data: response.data
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response.data
    };
  }
};