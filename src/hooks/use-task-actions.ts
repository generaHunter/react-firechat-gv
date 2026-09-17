import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";
import {
  collection,
  query,
  where,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import type { Task } from "@/schemas/task.schemas";

export const useTaskActions = () => {
  const { data: user } = useUser();
  const db = useFirestore();
  const taskCollectionRef = collection(db, "tasks");

  const tasksQuery = query(taskCollectionRef, where("userId", "==", user!.uid));

  const { data: tasks } = useFirestoreCollectionData(tasksQuery, {
    idField: "id",
    suspense: true,
  });
  

  const createTask = async (data: { title: string; description?: string }) => {
    return await addDoc(taskCollectionRef, {
      ...data,
      userId: user!.uid,
      completed: false,
    });
  };

  const deleteTask = async (taskId: string) => {
    const taskDoc = doc(db, "tasks", taskId);
    return await deleteDoc(taskDoc)
  }

  const toggleTaskCompletion = async (taskId: string) => {
    const task = tasks.find((task) => task.id === taskId);
    const taskDoc = doc(db, "tasks", taskId);

    return await updateDoc(taskDoc, {
      completed: !task?.completed
    })
  }

  return {
    tasks: tasks as Task[],
    createTask,
    deleteTask,
    toggleTaskCompletion
  };
};
