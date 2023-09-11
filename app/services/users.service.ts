import axios from 'axios'
import { Dispatch, SetStateAction, useEffect } from 'react'

export const useGetUsers = (users: any, setUsers: Dispatch<SetStateAction<never[]>>) => {
  useEffect(() => {
    axios.get('api/users').then((response) => {
      setUsers(response.data.users);
    }).catch((error) => {
      console.error('Error retrieving users:', error)
    })
  }, [setUsers])
}

export const addUsers = async (e: React.MouseEvent, newUser: any, setNewUser: any) => {
  e.preventDefault()
  
  axios.post('api/users').then((response) => {
    // setNewUser(response.data.)
  })
}