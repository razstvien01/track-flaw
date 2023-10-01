import { db } from "../firebase";
import { collection, getDoc, getDocs, query, updateDoc } from "firebase/firestore";
import { addDoc, where, doc, deleteDoc, setDoc } from "firebase/firestore";

interface OrganizationDetails {
  org_name: string;
  org_email: string;
  creator_id: string;
  role: string
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
  const { creator_id, role, ...restOrgData } = orgData;
  
  const creatorRef = doc(db, "users", creator_id);
  
  //* Add the organization document to the 'organizations' collection
  const orgDocRef = doc(collection(db, "organizations"));
  
  //* Update the user document to include the organization reference and role
  const userDocRef = doc(db, "users", creator_id);

  //* Create an organization document data object
  const orgDocData = { ...restOrgData, creator_ref: creatorRef, joined_members: {
    role: role.toUpperCase(),
    user_ref: userDocRef
  } };

  //* Set the data for the organization document
  await setDoc(orgDocRef, orgDocData);

  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
    const userData = userDoc.data();
    const joinedOrgs = userData.joined_orgs || [];
    
    //* Add the new organization reference and role to the joined_orgs array
    joinedOrgs.push({
      org_ref: orgDocRef,
      role: role.toUpperCase()
    });

    //*w Update the user document with the modified joined_orgs array
    await updateDoc(userDocRef, {
      joined_orgs: joinedOrgs
    });
  }
};


export const getOrgs = async () => {
  const q = query(collection(db, 'organizations'))
  const querySnapshot = await getDocs(q)
  
  const orgArr = querySnapshot.docs.map(async (doc) => {
    const data = doc.data();

    
    // Extract the DocumentReference
    const creatorRef = data.creator_ref;
    const { id } = creatorRef

    // Fetch the document referred to by creatorRef
    const creatorDoc = await getDoc(creatorRef);

    // Extract first_name and last_name from the creatorDoc data
    const { first_name, last_name } = creatorDoc.data() as any;

    // Create a new object with the extracted data
    const extractedData = {
      org_name: data.org_name,
      org_email: data.org_email,
      org_url: data.org_url,
      id: doc.id,
      creator: {
        user_id: id,
        first_name,
        last_name,
      },
    };

    return extractedData;
  });

  // Wait for all asynchronous operations to complete
  const orgData = await Promise.all(orgArr);
  
  return orgData;
};

export const deleteOrg = async (org_id: string) => {
  await deleteDoc(doc(db, "organizations", org_id));
};

interface OrganizationWithIdDetails extends OrganizationDetails {
  org_id: string;
}

export const updateOrg = async (orgData: OrganizationWithIdDetails) => {
  const { org_id } = orgData;

  const userDocRef = doc(db, "organizations", org_id);
  await setDoc(userDocRef, orgData, { merge: true });
};
