
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