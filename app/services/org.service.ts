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