import { db } from "../firebase";
import { collection, getDoc, getDocs, query } from "firebase/firestore";
import { addDoc, where, doc, deleteDoc, setDoc } from "firebase/firestore";

interface OrganizationDetails {
  org_id: string
  org_name: string
  org_email: string
  creator_id: string
}

export const checkIfExistsOrg = async (org_email: string) => {
  //* Check if the organization already exists
  const userQuery = query(
    collection(db, "organizations"),
    where("org_email", "==", org_email)
  );

  const querySnapshot = await getDocs(userQuery);

  return !querySnapshot.empty ? true : false;
};

export const addOrg = async (orgData: OrganizationDetails) => {
  const { creator_id } = orgData

  const creatorRef = doc(db, "users", creator_id)
  
  const orgWithRefs = { ...orgData, creator_ref: creatorRef}
  
  await addDoc(collection(db, "organizations"), orgWithRefs);
};

export const getOrgs = async () => {
  try {
    const q = query(collection(db, "organizations"));
    const querySnapshot = await getDocs(q);

    const orgArr = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    return orgArr;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteOrg = async (org_id: string) => {
  await deleteDoc(doc(db, "users", org_id));
};

export const updateOrg = async (orgData: OrganizationDetails) => {
  const { org_id } = orgData;

  const userDocRef = doc(db, "organizations", org_id);
  await setDoc(userDocRef, orgData, { merge: true });
};
