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
  QueryDocumentSnapshot,
} from "firebase/firestore";

interface NotifIds {
  bug_id?: string;
  user_id?: string;
  project_id?: string;
  org_id?: string;
}
interface NotifData extends NotifIds {
  title: string;
  description: string;
  type: string;
  author: string;
  date: string;
}

export const createNotif = async (data: NotifData) => {
  //* Create the notification object
  const notification = {
    ...data,
    time: serverTimestamp(), //* Use serverTimestamp for consistent time across all users
  };

  //* Reference to the "notifications" collection
  const notificationsRef = doc(collection(db, "notifications"));

  //* Add the notification to the "notifications" collection
  await setDoc(notificationsRef, notification);
};

export const getNotifs = async (data: NotifIds) => {
  const q = collection(db, "notifications");

  let conditions = [];

  if (data.bug_id) {
    conditions.push(where("bug_id", "==", data.bug_id));
  }
  if (data.user_id) {
    conditions.push(where("user_id", "==", data.user_id));
  }
  if (data.project_id) {
    conditions.push(where("project_id", "==", data.project_id));
  }
  if (data.org_id) {
    conditions.push(where("org_id", "==", data.org_id));
  }
  
  const querySnapshot =
    conditions.length > 0
      ? await getDocs(query(q, ...conditions))
      : await getDocs(q);

  const notifications: Notification[] = querySnapshot.docs.map(
    (doc: QueryDocumentSnapshot) => ({
      ...(doc.data() as Notification),
      id: doc.id,
    })
  );

  return notifications;
};
