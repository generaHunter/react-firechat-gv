import { Controller, useForm } from "react-hook-form";
import { Card, CardContent } from "./ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createTaskZodShema,
  type CreateTaskZodShemaType,
} from "@/lib/zod.shemas";
import { useMessage } from "@/hooks/use-message";
import { useTaskActions } from "@/hooks/use-task-actions";
import { useTransition } from "react";

const FormTask = () => {
  const { showMessageError, showMessageSuccess } = useMessage();

  const [isPending, startTransition] = useTransition();

  const { createTask } = useTaskActions();

  const form = useForm<CreateTaskZodShemaType>({
    resolver: zodResolver(createTaskZodShema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (data: CreateTaskZodShemaType) => {
    startTransition(async () => {
      try {
        await createTask(data);
        //console.log(result);
        form.reset();
        showMessageSuccess("Task added successfully");
      } catch (error) {
        console.log(error);
        showMessageError("Error adding task");
      }
    });

  };
  return (
    <div>
      <Card>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FieldGroup>
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Title</FieldLabel>
                    <Input
                      {...field}
                      id="i-title"
                      type="text"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter task title"
                      autoComplete="false"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Description</FieldLabel>
                    <Input
                      {...field}
                      id="i-description"
                      type="text"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter task description"
                      autoComplete="false"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <Button className="w-full mt-5" type="submit" disabled={isPending}>
              {isPending ? "Adding task..." : "Add task"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
export default FormTask;
