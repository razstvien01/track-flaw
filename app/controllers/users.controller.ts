import { db } from "../firebase";
import { collection, getDoc, getDocs, query } from "firebase/firestore";
import { addDoc, where, doc, deleteDoc, setDoc } from "firebase/firestore";

interface UserDetails {
  user_id: string;
  first_name: string;
  last_name: string;
  email_address: string;
  phone_number: string;
  role_id: string;
  org_ids: string[];
  full_name: string;
  photo_url: string;
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
  const q = collection(db, "users");
  const querySnapshot = await getDocs(q);

  const userArr = [];

  for (const doc of querySnapshot.docs) {
    const data = doc.data();
    const org_refs = data.org_refs || [];

    const orgDocs = [];

    for (const orgRef of org_refs) {
      const orgDoc = await getDoc(orgRef);
      const { org_email, org_name, image_url, personal, org_url, org_details } =
        orgDoc.data() as any;

      console.log(orgRef);
      if (orgDoc.exists()) {
        orgDocs.push({
          org_id: orgDoc.id,
          // ...orgDoc.data() as any,
          org_email,
          org_name,
          org_details,
          image_url,
          personal,
          org_url,
        });
      }
    }

    userArr.push({
      user_id: doc.id,
      ...data,
      org_refs: orgDocs,
    });
  }

  return userArr;
};

export const getUser = async (user_id: string) => {
  const userRef = doc(db, "users", user_id);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    const userData = userDoc.data();
    const { joined_orgs, ...newUserData } = userData || [];

    const orgDocs = await Promise.all(
      joined_orgs.map(async (joined_org: any) => {
        const { role, org_ref } = joined_org;
        const orgDoc = await getDoc(org_ref);

        if (orgDoc.exists()) {
          const { org_email, org_name, image_url, personal, org_details } =
            orgDoc.data() as any;

          return {
            org_id: orgDoc.id,
            org_email,
            org_name,
            image_url,
            personal,
            role,
            org_details
          };
        }
        return null;
      })
    );

    return {
      user_id,
      ...newUserData,
      org_refs: orgDocs.filter(Boolean), //* Remove any null values
    };
  } else {
    return null; //* Handle case where userDoc doesn't exist
  }
};

export const deleteUser = async (user_id: string) => {
  await deleteDoc(doc(db, "users", user_id));
};

export const updateUser = async (userData: UserDetails) => {
  const { user_id } = userData;

  const userDocRef = doc(db, "users", user_id);
  await setDoc(userDocRef, userData, { merge: true });
};
