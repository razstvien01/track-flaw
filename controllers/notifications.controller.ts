import { NotifData, NotifIds } from "@/types/types";
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
  orderBy,
  limit,
  DocumentData,
} from "firebase/firestore";

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

//* Define a helper function to merge query results, filtering out duplicates.
const mergeResults = (resultsArray: DocumentData[][]): DocumentData[] => {
  const merged = new Map<string, DocumentData>();
  for (const results of resultsArray) {
    for (const doc of results) {
      merged.set(doc.id, doc); // Map ensures unique IDs only.
    }
  }
  return Array.from(merged.values());
};

// This function merges query results and sorts them by time in descending order.
const mergeAndSortResults = (
  resultsArray: DocumentData[][]
): DocumentData[] => {
  // Merge all documents into a single array and use a Map to remove duplicates.
  const mergedMap = new Map<string, DocumentData>();

  resultsArray.flat().forEach((doc) => {
    mergedMap.set(doc.id, doc); // This will overwrite any duplicates.
  });

  // Convert the map values to an array.
  const merged = Array.from(mergedMap.values());

  // Sort the merged results by the 'time' field in descending order.
  // Adjust the sorting logic to match the data type of your 'time' field.
  merged.sort((a, b) => {
    // If 'time' is a Firestore Timestamp object:
    return b.time.toMillis() - a.time.toMillis();
    // If 'time' is a string or a different format, you need to convert accordingly.
    // For example, if 'time' is a string:
    // return new Date(b.time).getTime() - new Date(a.time).getTime();
  });

  // Return the sorted results without duplicates.
  return merged;
};

export const getNotifs = async (data: NotifIds) => {
  const dbQuery = collection(db, "notifications");
  let queries = [];

  // Split the org_ids into chunks if they exist and are more than 10.
  if (data.org_ids && data.org_ids.length) {
    for (let i = 0; i < data.org_ids.length; i += 10) {
      const chunk = data.org_ids.slice(i, i + 10);
      queries.push(query(dbQuery, where("org_id", "in", chunk)));
    }
  }

  // Add other queries based on bug_id, user_id, and project_id.
  if (data.bug_id) {
    queries.push(query(dbQuery, where("bug_id", "==", data.bug_id)));
  }
  if (data.user_id) {
    queries.push(query(dbQuery, where("user_id", "==", data.user_id)));
  }
  if (data.project_id) {
    queries.push(query(dbQuery, where("project_id", "==", data.project_id)));
  }

  // If there were no specific org_ids or conditions, use a default query.
  if (queries.length === 0) {
    queries.push(query(dbQuery, orderBy("time", "desc"), limit(25)));
  }

  // Execute all queries and collect the results.
  const allResultsPromises = queries.map((q) => getDocs(q));
  const allResultsSnapshots = await Promise.all(allResultsPromises);
  const allResults = allResultsSnapshots.map((snapshot) =>
    snapshot.docs.map((doc) => ({
      ...(doc.data() as DocumentData),
      id: doc.id,
    }))
  );

  // Merge and sort the results of the separate queries.
  const notifications = mergeAndSortResults(allResults);

  // Return the sorted notifications
  return notifications;
};
