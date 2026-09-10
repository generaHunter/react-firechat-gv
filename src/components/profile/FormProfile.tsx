import { useProfileAtions } from "@/hooks/use-profile-actions";
import { Card, CardContent } from "../ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updatePrfileZodShema,
  type UpdateProfileZodShemaType,
} from "@/lib/zod.shemas";
import { useMessage } from "@/hooks/use-message";
import type { User } from "firebase/auth";

interface Props {
    user: User | null
}

const FormProfile = ({user}: Props) => {
  const { loading, updateUserProfile } = useProfileAtions();
 

  const { showMessageError, showMessageSuccess } = useMessage();

  const form = useForm<UpdateProfileZodShemaType>({
    resolver: zodResolver(updatePrfileZodShema),
    defaultValues: {
      displayName: user?.displayName || "",
      photoUrl: user?.photoURL || undefined,
    },
  });

  const onSubmit = async (data: UpdateProfileZodShemaType) => {
    const response = await updateUserProfile(data);

    console.log(response);

    if (!response.success) {
      console.log(response);
      showMessageError("Have been an error in update profile");
    }

    showMessageSuccess("Profile information was updated successfully")
  };
  return (
    <div>
      <Card>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FieldGroup>
              <Controller
                name="displayName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Displayname</FieldLabel>
                    <Input
                      {...field}
                      id="i-displayname"
                      type="text"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your displayname"
                      autoComplete="false"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="photoUrl"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Photo</FieldLabel>
                    <Input
                      {...field}
                      id="i-photoUrl"
                      aria-invalid={fieldState.invalid}
                      placeholder="https://example.com/photo.jpg"
                      autoComplete="false"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <Button className="w-full mt-5" disabled={loading} type="submit">
              {loading ? "Saving..." : "Save"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
export default FormProfile;
