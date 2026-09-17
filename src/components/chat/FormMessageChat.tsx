import { messageZodSchema, type MessageZodSchemaType } from "@/lib/zod.shemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError } from "../ui/field";
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
  const { showMessageError } = useMessage();

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
        showMessageError("Ha ocurrido un error al enviar el mensaje");
      }
    });
  };

  return (
    <div className="shrink-0 border-t bg-background p-3">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-start gap-2"
      >
        <Controller
          name="text"
          control={form.control}
          render={({ field, fieldState }) => (
            <div className="flex-1">
              <Field>
                <Input
                  {...field}
                  type="text"
                  aria-invalid={fieldState.invalid}
                  placeholder="Escribe un mensaje..."
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            </div>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Enviando..." : "Enviar"}
        </Button>
      </form>
    </div>
  );
};

export default FormMessageChat;