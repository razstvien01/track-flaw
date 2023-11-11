import { ProjectDataProps } from '@/types/types'
import axios from 'axios'

export const createProject = async (projectData: ProjectDataProps, uid: string) => {
  try {
    const response = await axios.post('api/projects', {
      ...projectData,
      creator_id: uid
    })
    
    return {
      success: true,
      data: response.data
    }
  } catch (error: any) {
    return { success: false, error: error.response.data }
  }
}
