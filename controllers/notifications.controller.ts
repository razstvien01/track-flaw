import { db } from "../app/firebase";
import {
  arrayRemove,
  arrayUnion,
  collection,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
  doc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";

interface NotifData {
  title: string;
  description: string;
  type: string;
  author: string;
  date: string;
  bug_id: string;
  user_id: string;
  project_id: string;
}

export const createOrgNotif = async (orgData: NotifData) => {
  try {
    const { title, description, type, user_id, project_id } = orgData;

    //* Create the notification object
    const notification = {
      title,
      description,
      user: user_id,
      time: serverTimestamp(), //() Use serverTimestamp for consistent time across all users
      type,
      project_id, //* Assuming you want to store the project_id in the notification
    };

    //* Reference to the "notifications" collection
    const notificationsRef = collection(db, "notifications");

    // Add the notification to the "notifications" collection
    const docRef = await setDoc(doc(notificationsRef), notification);

    console.log('Notification created successfully');
  } catch (error) {
    console.error('Error creating notification:', error);
  }
};
