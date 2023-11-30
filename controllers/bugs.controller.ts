import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  QueryDocumentSnapshot,
  DocumentData
} from "firebase/firestore";
import { db } from "../app/firebase";
import { BugDataProps } from "@/types/types";

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

export const addBug = async (data: BugDataProps) => {
  const bugWithRefs = { ...data, created_at: serverTimestamp() };

  await addDoc(collection(db, "bugs"), bugWithRefs);
};


export const getBugs = async(project_id: string) => {
  const q = query(collection(db, 'bugs'), where('project_id', '==', project_id))
  const querySnapshot = await getDocs(q)
  
  
  return querySnapshot.docs
}