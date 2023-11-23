import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp
} from "firebase/firestore";
import { db } from "../app/firebase";

interface BugDetails {
  bug_name: string;
  org_id: string;
  project_id: string;
  due_date: string;
  bug_details: string;
  priority: string;
  severity: string;
  status: string;
}

export const checkIfExistsBug = async (
  bug_name: string,
  project_id: string,
  org_id: string
) => {
  //* Check if the organization already exists
  const userQuery = query(
    collection(db, "bugs"),
    where("bug_name", "==", bug_name),
    where("org_id", "==", org_id),
    where("project_id", "==", project_id)
  );

  const querySnapshot = await getDocs(userQuery);

  return !querySnapshot.empty ? true : false;
};

export const addBug = async (data: BugDetails) => {
  const orgWithRefs = { ...data, created_at: serverTimestamp() };

  await addDoc(collection(db, "bugs"), orgWithRefs);
};
