import { messageZodSchema, type MessageZodSchemaType } from "@/lib/zod.shemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMessagesActions } from "@/hooks/use-messages-actions";
import { useMessage } from "@/hooks/use-message";

interface Props {
  roomId: string;
}

const FormMessageChat = ({ roomId }: Props) => {
  const [isPending, startTransition] = useTransition();
  const { sendMessage } = useMessagesActions(roomId);
  const {showMessageError} = useMessage();

  const form = useForm<MessageZodSchemaType>({
    resolver: zodResolver(messageZodSchema),
    defaultValues: {
      text: "",
    },
  });

  const onSubmit = (values: MessageZodSchemaType) => {
    startTransition(async () => {
      try {
        await sendMessage(values.text);
        form.reset();
      } catch (error) {
        console.log(error);
        showMessageError("Ha ocurrido un error al enviar el mensaje")
      }
    });
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FieldGroup>
          <Controller
            name="text"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Text</FieldLabel>
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
        </FieldGroup>
        <Button className="w-full mt-5" type="submit" disabled={isPending}>
          {isPending ? "Sending..." : "Send"}
        </Button>
      </form>
    </div>
  );
};
export default FormMessageChat;
