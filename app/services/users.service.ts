import axios from 'axios'
import { db } from '../firebase'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore'

export const useGetUsers = (users: any, setUsers: Dispatch<SetStateAction<never[]>>) => {
  useEffect(() => {
    axios.get('api/users').then((response) => {
      setUsers(response.data.users);
    }).catch((error) => {
      console.error('Error retrieving users:', error)
    })
  })
}

export const addUsers = async (e: React.MouseEvent, newUser: any, setNewUser: any) => {
  e.preventDefault()
  
  axios.post('api/users').then((response) => {
    // setNewUser(response.data.)
  })
}
