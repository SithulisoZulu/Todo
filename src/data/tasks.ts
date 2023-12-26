
import { app } from "../firebase/server";
import { getFirestore } from "firebase-admin/firestore";


export interface Task {
    id: string;
    task: string;
    date: string;
}


const db = getFirestore(app);
const tasksRef = db.collection("tasks");
const tasksSnapshot = await tasksRef.get();
export const allTasks = tasksSnapshot.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
})) as Task [];
