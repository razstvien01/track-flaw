import { db } from "../firebase";
import { collection, getDoc, getDocs, query } from "firebase/firestore";
import { addDoc, where, doc, deleteDoc, setDoc } from "firebase/firestore";

interface UserDetails {
  id: string;
  first_name: string;
  last_name: string;
  email_address: string;
  contact_number: string;
  role_id: string;
  org_id: string
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
  const { role_id, org_id } = userData 
  
  const roleRef = doc(db, "roles", role_id);
  const orgRef = doc(db, "organizations", org_id)
  
  const userWithRole = { ...userData, role_ref: roleRef, org_ref: orgRef };
  await addDoc(collection(db, "users"), userWithRole);
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

export const updateUser = async (userData: UserDetails) => {
  const { id } = userData;

  const userDocRef = doc(db, "users", id);
  await setDoc(userDocRef, userData, { merge: true });
};
