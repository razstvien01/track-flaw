import { db } from "../firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { addDoc, where, doc, deleteDoc, setDoc } from "firebase/firestore";

interface UserDetails {
  id: string;
  first_name: string;
  last_name: string;
  email_address: string;
  contact_number: string;
  position: string;
}

export const checkIfExistsUser = async (email_address: string) => {
  //* Check if the user already exists
  const userQuery = query(
    collection(db, "users"),
    where("email_address", "==", email_address)
  );

  const querySnapshot = await getDocs(userQuery);

  return !querySnapshot.empty ? true : false;
};

export const addUser = async (userData: UserDetails) => {
  //* User does not exist, add them to the database
  await addDoc(collection(db, "users"), userData);
};

export const getUsers = async () => {
  try {
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);

    const userArr = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    return userArr;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteUser = async (id: string) => {
  await deleteDoc(doc(db, "users", id));
};

export const updateUser = async(userData: UserDetails) => {
  const { id } = userData
  
  const userDocRef = doc(db, 'users', id)
  await setDoc(userDocRef, userData, { merge: true })
  
}