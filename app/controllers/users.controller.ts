import { db } from "../firebase";
import { collection, getDoc, getDocs, query } from "firebase/firestore";
import { addDoc, where, doc, deleteDoc, setDoc } from "firebase/firestore";

interface UserDetails {
  user_id: string;
  first_name: string;
  last_name: string;
  email_address: string;
  contact_number: string;
  role_id: string;
  org_ids: string[];
  display_name: string;
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

export const checkIfExistsUserId = async (user_id: string) => {
  //* Check if the document with user_id exists
  const userDocRef = doc(db, "users", user_id);
  const docSnapshot = await getDoc(userDocRef);

  return docSnapshot.exists();
};

export const addUser = async (userData: UserDetails) => {
  // const { role_id, org_ids, ...restUserData } = userData;

  //* Create references for the role and organizations based on their IDs
  // const roleRef = doc(db, "roles", role_id);
  // const orgRefs = org_ids.map((org_id) => doc(db, "organizations", org_id));

  //* Add the role and organizations references to the user data
  // const userWithRefs = {
  // ...restUserData,
  // role_ref: roleRef,
  // org_refs: orgRefs,
  // };

  //* Add the user document with role and organizations references
  const { user_id } = userData;

  if (user_id) {
    //* Reference the specific document by specifying its path
    const userDocRef = doc(db, "users", user_id);

    //* Set the document data with the specified document ID
    await setDoc(userDocRef, userData);
  } else {
    await addDoc(collection(db, "users"), userData);
  }
};

export const getUsers = async () => {
  const q = query(collection(db, "users"));
  const querySnapshot = await getDocs(q);

  const userArr = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return userArr;
};

export const deleteUser = async (user_id: string) => {
  await deleteDoc(doc(db, "users", user_id));
};

export const updateUser = async (userData: UserDetails) => {
  const { user_id } = userData;

  const userDocRef = doc(db, "users", user_id);
  await setDoc(userDocRef, userData, { merge: true });
};
