import { db } from "../app/firebase";
import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { addDoc, where, doc, deleteDoc, setDoc } from "firebase/firestore";

interface ProjectDetails {
  project_id: string;
  project_name: string;
  org_id: string;
  team_id: string;
  photo_url: string;
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
  const dbQuery = collection(db, "projects");

  //* Create an array to store queries
  let queries = [];

  //* Check if 'org_id' is provided
  if (org_id) {
    queries.push(
      query(
        dbQuery,
        where("org_id", "==", org_id),
        orderBy("created_at", "desc")
      )
    );
  }

  //* If 'org_id' is not provided, retrieve the last 25 projects by their 'created_at' field
  if (queries.length === 0) {
    queries.push(query(dbQuery, orderBy("created_at", "desc"), limit(25)));
  }

  //* Execute the queries
  const querySnapshot = await getDocs(queries[0]);

  //* Convert the query snapshot to an array of project objects
  const projects: any[] = [];
  querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
    const data = doc.data();
    const project = {
      project_id: doc.id,
      photo_url: data.photo_url,
      project_name: data.project_name,
      project_description: data.project_description,
    };
    projects.push(project);
  });

  return projects;
};

export const getProjectById = async (project_id: string) => {
  //* get ref
  const projDocRef = doc(db, "projects", project_id);

  //* fetch doc
  const projDoc = await getDoc(projDocRef);

  //* Check if the document exists
  if (!projDoc.exists()) {
    //* Throw an error or reject the promise if the document does not exist
    throw new Error("The project doesn't exists.");
  }

  //* If the document exists, return its data
  const project = projDoc.data();
  return project;
};

export const deleteProject = async (project_id: string) => {
  await deleteDoc(doc(db, "projects", project_id));
};

export const updateProject = async (projectData: ProjectDetails) => {
  const { project_id } = projectData;

  const userDocRef = doc(db, "projects", project_id);
  await setDoc(userDocRef, projectData, { merge: true });
};
