import { NextApiRequest } from "next";
import { db } from "../firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { addDoc, where } from "firebase/firestore";


interface UserDetails {
  first_name: string
  last_name: string
  email_address: string
  contact_number: string
  position: string
}

export const checkIfExistsUser = async (userData: UserDetails) => {
  
  const { email_address } = userData
  
  //* Check if the user already exists
  const userQuery = query(
    collection(db, 'users'),
    where('email_address', '==', email_address) 
  );
  
  const querySnapshot = await getDocs(userQuery);
  
  return !querySnapshot.empty ? true : false
}

export const addUser = async (userData: UserDetails) => {
  //* User does not exist, add them to the database
  await addDoc(collection(db, 'users'), userData);
}


export const getUsers = async () => {
  try {
    const q = query(collection(db, 'items'));
    const querySnapshot = await getDocs(q);
    
    const itemsArr = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    
    return itemsArr;
  } catch (error) {
    console.error(error);
    throw error;
  }
};