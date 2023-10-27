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
  org_id: string;
}

export const createNotif = async (data: NotifData) => {
  try {
    //* Create the notification object
    const notification = {
      ...data,
      time: serverTimestamp(), //() Use serverTimestamp for consistent time across all users
    };

    //* Reference to the "notifications" collection
    const notificationsRef = doc(collection(db, "notifications"));

    // Add the notification to the "notifications" collection
    const docRef = await setDoc(notificationsRef, notification);

    // console.log('Notification created successfully');
    // return true;
  } catch (error) {
    console.error("Error creating notification:", error);
    // return false;
  }
};
