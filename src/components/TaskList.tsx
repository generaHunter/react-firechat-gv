import { useTaskActions } from "@/hooks/use-task-actions";
import { MoreHorizontalIcon } from "lucide-react";

import type { Task } from "@/schemas/task.schemas";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { useMessage } from "@/hooks/use-message";
import { useTransition } from "react";
import { Spinner } from "./ui/spinner";

const TaskList = () => {
  const { tasks, deleteTask, toggleTaskCompletion } = useTaskActions();

  const { showMessageError, showMessageSuccess } = useMessage();

  const [isPending, startTransition] = useTransition();

  const deleteAction = (task: Task) => {
    startTransition(async () => {
      try {
        await deleteTask(task.id);
        showMessageSuccess("Task deleted successfully");
      } catch (error) {
        console.log(error);
        showMessageError("Error deleting task");
      }
    });
  };

  const editAction = (task: Task) => {
    startTransition(async () => {
           try {
        await toggleTaskCompletion(task.id);
        showMessageSuccess("Task edited successfully");
      } catch (error) {
        console.log(error);
        showMessageError("Error editing task");
      }
    })
  }

  if (isPending) {
    return (
      <div className="flex items-center gap-4">
        <Spinner /> Proccesing...
      </div>
    );
  }

  return (
    <Table className="p-4">
      <TableCaption>List of tasks</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task: Task, index) => (
          <TableRow key={index}>
            <TableCell>{task.title}</TableCell>
            <TableCell>{task.completed ? "Completed" : "Pending"}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant="ghost" size="icon" className="size-8">
                      <MoreHorizontalIcon />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  }
                />
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={()=> editAction(task)}>Edit</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => deleteAction(task)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default TaskList;
