import FormTask from "@/components/FormTask";
import TaskList from "@/components/TaskList";
import { Suspense } from "react";

const TasksPage = () => {
  return (
    <div>
      <FormTask />
      <h1 className="text-2xl font-bold p-4">Tasks</h1>
      <Suspense fallback={<div>Loading tasks...</div>}>
        <TaskList />
      </Suspense>
    </div>
  );
};
export default TasksPage;
