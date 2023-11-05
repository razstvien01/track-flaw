import { db } from "../app/firebase";
import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { addDoc, where, doc, deleteDoc, setDoc } from "firebase/firestore";

interface ProjectDetails {
  project_id: string;
  project_name: string;
  org_id: string;
  team_id: string;
}

export const checkIfExistsProj = async (
  project_name: string,
  org_id: string
) => {
  //* Check if the organization already exists
  const userQuery = query(
    collection(db, "projects"),
    where("project_name", "==", project_name),
    where("org_id", "==", org_id)
  );

  const querySnapshot = await getDocs(userQuery);

  return !querySnapshot.empty ? true : false;
};

export const addProject = async (projectData: ProjectDetails) => {
  console.log(projectData);
  const orgWithRefs = { ...projectData, created_at: serverTimestamp() };

  await addDoc(collection(db, "projects"), orgWithRefs);
};

export const getProjects = async () => {
  const q = query(collection(db, "projects"));
  const querySnapshot = await getDocs(q);
  const projects: any[] = [];

  querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
    const project = {
      id: doc.id,
      ...doc.data(),
    } as any;
    projects.push(project);
  });

  return projects;
};

export const getProjectsByOrgId = async (org_id: string) => {
  const q = query(collection(db, "projects"), where("org_id", "==", org_id));
  const querySnapshot = await getDocs(q);
  const projects: any[] = [];
  
  querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
    const project = {
      id: doc.id,
      ...doc.data(),
    } as any;
    projects.push(project);
  });

  return projects;
};

export const deleteProject = async (project_id: string) => {
  await deleteDoc(doc(db, "projects", project_id));
};

export const updateProject = async (projectData: ProjectDetails) => {
  const { project_id } = projectData;

  const userDocRef = doc(db, "projects", project_id);
  await setDoc(userDocRef, projectData, { merge: true });
};
