import { db } from "../app/firebase";
import {
  DocumentData,
  QueryDocumentSnapshot,
  arrayUnion,
  collection,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
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

export const updateTeamMember = async (
  project_id: string,
  user_id: string,
  role: string
) => {
  const projDocRef = doc(db, "projects", project_id);

  //* Get the project document
  const projDoc = await getDoc(projDocRef);
  const projData = projDoc.data();

  //* Reference to the user document
  const userDocRef = doc(db, "users", user_id);

  if (projData?.team_members) {
    for (let member of projData.team_members) {
      if (member.user_ref?.id === user_id) {
        throw new Error("User is already a member of this team.");
      }
    }
  }

  await updateDoc(projDocRef, {
    team_members: arrayUnion({
      role: role.toUpperCase(),
      user_ref: userDocRef,
    }),
  });
  
  await updateDoc(userDocRef, {
    joined_teams: arrayUnion({
      role: role.toUpperCase(),
      team_ref: projDocRef,
    }),
  });
};


export const getTeamMembers = async (project_id: string) => {
  //* Create a reference to the specific organization document
  const projRef = doc(db, "projects", project_id);

  //* Fetch the document
  const projDoc = await getDoc(projRef);

  //* If document doesn't exist, return null or handle error
  if (!projDoc.exists()) {
    return null;
  }

  const data = projDoc.data();
  
  //* Handle team_members
  let membersData: {
    role: string;
    full_name: string;
    phone_number: string;
    user_id: string;
  }[] = [];
  
  if (data?.team_members && Array.isArray(data.team_members)) {
    const memberPromises = data.team_members.map(async (memberRef: any) => {
      const { role = "", user_ref = "" } = memberRef || {};

      const getValueOrDefault = (value: any, defaultValue: any = "") =>
        value ?? defaultValue;

      const memberDoc = await getDoc(user_ref);
      const memberData = memberDoc.data() as any;

      return {
        role,
        full_name: getValueOrDefault(memberData?.full_name),
        phone_number: getValueOrDefault(memberData?.phone_number),
        photo_url: getValueOrDefault(memberData?.photo_url),
        user_id: getValueOrDefault(memberData?.user_id),
        created_at: getValueOrDefault(memberData?.created_at),
        email_address: getValueOrDefault(memberData?.email_address)
      };
    });

    membersData = await Promise.all(memberPromises);
  }

  return membersData;
};

export const removeTeamMember = async (
  project_id: string,
  user_id: string,
  role: string
) => {
  const projDocRef = doc(db, "projects", project_id);
  const projDoc = await getDoc(projDocRef);
  const projData = projDoc.data();

  const userDocRef = doc(db, "users", user_id);
  const userDoc = await getDoc(userDocRef);
  const userData = userDoc.data();

  //* Remove the member from the organization's team_members array
  if (projData && projData.team_members) {
    const updatedMembers = projData.team_members.filter(
      (member: any) =>
        member.user_ref.id !== userDocRef.id &&
        member.role !== role.toUpperCase()
    );
    
    await updateDoc(projDocRef, { team_members: updatedMembers });
  }

  //* Remove the organization from the user's team_orgs array
  if (userData && userData.joined_teams) {
    const updatedProj = userData.joined_teams.filter(
      (team: any) =>
        team.team_ref.id !== projDocRef.id && team.role !== role.toUpperCase()
    );
    
    await updateDoc(userDocRef, { joined_teams: updatedProj });
  }
};
