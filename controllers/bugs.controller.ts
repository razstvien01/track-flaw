import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  QueryDocumentSnapshot,
  DocumentData,
  orderBy,
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

export const getBugs = async (project_id: string) => {
  const q = query(
    collection(db, 'bugs'),
    where('project_id', '==', project_id),
    orderBy('created_at', 'desc') // Order by the 'created_at' field in ascending order
  );
  const querySnapshot = await getDocs(q);

  const bugsData = querySnapshot.docs.map(doc => {
    const { bug_description, bug_name, created_at, creator_id, due_date, org_id, priority, project_id, status, severity = '' } = doc.data();
    
      return {
        id: doc.id,
        bug_description: bug_description || '',
        bug_name: bug_name || '',
        created_at: created_at || null,
        creator_id: creator_id || '',
        due_date: due_date || null,
        org_id: org_id || '',
        priority: priority || '',
        project_id: project_id || '',
        status: status || '',
        severity
      };
  });
  
  return bugsData;
};
