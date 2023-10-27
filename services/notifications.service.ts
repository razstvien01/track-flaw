
import { UserDataProps } from "@/types/types";
import axios from "axios";


export const createNotif = async (notif_data: any) => {
  try {
    const params = {
      ...notif_data
    };
    
    const response = await axios.post('/api/notifications', params)
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.response.data };
  }
};

export const getNotifs = async(userData: UserDataProps) => {
  try {
    const { user_id } = userData
    const params = {
      user_id
    }
    
    const response = await axios.get("/api/notifications", {
      params,
    });

    return {
      success: true,
      data: response.data.notifications,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response.data,
    };
  }
}