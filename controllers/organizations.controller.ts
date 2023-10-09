import { db } from "../app/firebase";
import {
  arrayUnion,
  collection,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { where, doc, deleteDoc, setDoc } from "firebase/firestore";

interface OrganizationDetails {
  org_name: string;
  org_email: string;
  creator_id: string;
  role: string;
  org_id: string;
}

interface AddMemberProps {
  org_id: string;
  role: string;
  user_id: string;
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
  const { creator_id, role, org_id, ...restOrgData } = orgData;

  const creatorRef = doc(db, "users", creator_id);

  //* Add the organization document to the 'organizations' collection
  const orgDocRef = doc(collection(db, "organizations"));

  //* Update the user document to include the organization reference and role
  const userDocRef = doc(db, "users", creator_id);

  //* Create an organization document data object
  const orgDocData = {
    ...restOrgData,
    creator_ref: creatorRef,
    joined_members: [
      {
        role: role.toUpperCase(),
        user_ref: userDocRef,
      },
    ],
    created_at: serverTimestamp(),
  };

  //* Set the data for the organization document
  await setDoc(orgDocRef, orgDocData);

  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
    const userData = userDoc.data();
    const joinedOrgs = userData.joined_orgs || [] ;

    //* Add the new organization reference and role to the joined_orgs array
    joinedOrgs.push({
      org_ref: orgDocRef,
      role: role.toUpperCase(),
    });

    //*w Update the user document with the modified joined_orgs array
    await updateDoc(userDocRef, {
      joined_orgs: joinedOrgs,
    });
  }
};

export const getOrgs = async () => {
  const q = query(collection(db, "organizations"));
  const querySnapshot = await getDocs(q);

  const orgArr = querySnapshot.docs.map(async (doc) => {
    const data = doc.data();

    //* Extract the DocumentReference
    const creatorRef = data.creator_ref;
    const { id } = creatorRef;

    //* Fetch the document referred to by creatorRef
    const creatorDoc = await getDoc(creatorRef);

    //* Extract first_name and last_name from the creatorDoc data
    const { first_name, last_name } = creatorDoc.data() as any;

    // TODO
    //* Create a new object with the extracted data
    const extractedData = {
      org_name: data.org_name,
      org_email: data.org_email,
      org_url: data.org_url,
      org_address: data.org_address,
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

  const orgDocRef = doc(db, "organizations", org_id);
  await setDoc(orgDocRef, orgData, { merge: true });
};

export const addMember = async (data: AddMemberProps) => {
  const { org_id = "", role = "", user_id = "" } = data || {};

  //* Reference to the organization document
  const orgDocRef = doc(db, "organizations", org_id);

  //* Get the organization document
  const orgDoc = await getDoc(orgDocRef);
  const orgData = orgDoc.data();

  //* Reference to the user document
  const userDocRef = doc(db, "users", user_id);

  //* Check if user_ref already exists in joined_members
  if (orgData?.joined_members) {
    for (let member of orgData.joined_members) {
      if (member.user_ref?.id === user_id) {
        throw new Error("User is already a member of this organization.");
      }
    }
  }

  //* Update the organization document to add the new member
  await updateDoc(orgDocRef, {
    joined_members: arrayUnion({
      role: role.toUpperCase(),
      user_ref: userDocRef,
    }),
  });
  
  //* Update or push the user's joined_orgs[] with the value of the org_ref and the role
  await updateDoc(userDocRef, {
    joined_orgs: arrayUnion({
      role: role.toUpperCase(),
      org_ref: orgDocRef
    })
  })
};

export const getOrgMembers = async (org_id: string) => {

  //* Create a reference to the specific organization document
  const orgRef = doc(db, "organizations", org_id);

  //* Fetch the document
  const orgDoc = await getDoc(orgRef);

  //* If document doesn't exist, return null or handle error
  if (!orgDoc.exists()) {
    return null;
  }
  
  const data = orgDoc.data();
  
  //* Extract the DocumentReference for creator
  const creatorRef = data?.creator_ref;
  const { id } = creatorRef;

  //* Fetch the document referred to by creatorRef
  const creatorDoc = await getDoc(creatorRef);

  //* Handle joined_members
  let membersData: {
    role: string;
    full_name: string;
    phone_number: string;
    user_id: string;
  }[] = [];
  if (data?.joined_members && Array.isArray(data.joined_members)) {
    const memberPromises = data.joined_members.map(async (memberRef: any) => {

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
        created_at: getValueOrDefault(memberData?.created_at)
      };
    });

    membersData = await Promise.all(memberPromises);
  }

  return membersData;
};

export const getOrgDetails = async (org_id: string) => {
  // Get a reference to the document with the specified org_id
  const orgDocRef = doc(db, "organizations", org_id);
  
  
  // Fetch the document
  const orgDoc = await getDoc(orgDocRef);

  // Check if the document exists
  if (!orgDoc.exists()) {
    return null;  // or you could throw an error or handle it differently
  }
  
  const data = orgDoc.data();

  //* Extract the DocumentReference
  const creatorRef = data.creator_ref;
  const { id } = creatorRef;

  //* Fetch the document referred to by creatorRef
  const creatorDoc = await getDoc(creatorRef);

  //* Extract first_name and last_name from the creatorDoc data
  const { first_name, last_name } = creatorDoc.data() as any;

  //* Create a new object with the extracted data
  const extractedData = {
    org_name: data.org_name,
    org_email: data.org_email,
    org_url: data.org_url,
    org_address: data.org_address,
    org_details: data.org_details,
    org_id: orgDoc.id,
    creator: {
      user_id: id,
      first_name,
      last_name,
    },
  };

  return extractedData;
};
