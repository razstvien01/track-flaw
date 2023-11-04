import { db } from "../app/firebase";
import { collection, getDoc, getDocs, query, serverTimestamp } from "firebase/firestore";
import { addDoc, where, doc, deleteDoc, setDoc } from "firebase/firestore";

interface ProjectDetails {
  project_id: string;
  project_name: string;
  org_id: string;
  team_id: string;
}

export const checkIfExistsProj = async (project_name: string, org_id: string) => {
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
  
  console.log(projectData)
  const orgWithRefs = { ...projectData, created_at: serverTimestamp(), };
  
  await addDoc(collection(db, "projects"), orgWithRefs);
  
};

export const getProjects = async () => {
  const q = query(collection(db, 'projects'))
  const querySnapshot = await getDocs(q)
  
  const projectArr = querySnapshot.docs.map(async (doc) => {
    const data = doc.data();
    
    const organizationRef = data.org_ref;
    const { id = '' } = organizationRef || {}

    //* Fetch the document referred to by org_ref
    const orgDoc = await getDoc(organizationRef);
    
    const { org_name = '', org_url = '' } = orgDoc.data() as any || {};

    // Create a new object with the extracted data
    const extractedData = {
      org_name: data.org_name,
      org_email: data.org_email,
      org_url: data.org_url,
      id: doc.id,
      org: {
        id,
        org_name,
        org_url,
        // personal
      }
    };

    return extractedData;
  });

  //* Wait for all asynchronous operations to complete
  const projectData = await Promise.all(projectArr);
  
  return projectData;
};

export const deleteProject = async (project_id: string) => {
  await deleteDoc(doc(db, "projects", project_id));
};

export const updateProject = async (projectData: ProjectDetails) => {
  const { project_id } = projectData;

  const userDocRef = doc(db, "projects", project_id);
  await setDoc(userDocRef, projectData, { merge: true });
};
