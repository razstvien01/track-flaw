import { UserDataProps } from "@/types/types";
import axios from "axios";

export const createNotif = async (notif_data: any) => {
  try {
    const params = {
      ...notif_data,
    };

    const response = await axios.post("/api/notifications", params);

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.response.data };
  }
};

export const getNotifs = async (userData: UserDataProps) => {
  try {
    const { user_id, org_refs } = userData;

    //* Create a params object for serialization
    const params = new URLSearchParams();

    //* Explicitly add user_id to the params
    params.append('user_id', user_id.toString());
    
    //* Append each org_id to the params
    org_refs.forEach((ref) => {
      //* Fallback to "no id" if ref is null/undefined or org_id is not provided
      const org_id = ref?.org_id ?? "no id";
      params.append("org_ids", org_id);
    });

    //* Log the complete query string to verify
    console.log(params.toString());

    //* Make the GET request with axios
    const response = await axios.get("/api/notifications", {
      params: params
    });

    return {
      success: true,
      data: response.data.notifications,
    };
  } catch (error: any) {
    //* Log the full error for debugging
    console.error(error);
    return {
      success: false,
      error: error.response?.data ?? "An unknown error occurred",
    };
  }
};
