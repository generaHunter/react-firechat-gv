import { useMessage } from "@/hooks/use-message";
import { useRoomActions } from "@/hooks/use-room-actions";
import {
  searchFriendZodSchema,
  type SearchFriendSchemaType,
} from "@/lib/zod.shemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface Props {
  handleClickRoomId: (id: string) => void;
}

const FormSearchFriend = ({ handleClickRoomId }: Props) => {
  const [isPending, startTransition] = useTransition();
  const { showMessageError, showMessageInfo } = useMessage();
  const { findOrCreateRoom } = useRoomActions();

  const form = useForm<SearchFriendSchemaType>({
    resolver: zodResolver(searchFriendZodSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: SearchFriendSchemaType) => {
    startTransition(async () => {
      try {
        const result = await findOrCreateRoom(values.email);
        if (!result.success) {
          showMessageInfo(result.message);
        } else {
          handleClickRoomId(result.roomId || "");
          form.reset();
        }
      } catch (error) {
        console.log(error);
        showMessageError("Ha ocurrido un error al buscar amigo");
      }
    });
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel className="sr-only">Email</FieldLabel>
                <Input
                  {...field}
                  type="text"
                  aria-invalid={fieldState.invalid}
                  placeholder="Buscar por email..."
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <Button
          className="w-full mt-2"
          size="sm"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Buscando..." : "Buscar"}
        </Button>
      </form>
    </div>
  );
};

export default FormSearchFriend;