import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthActions } from "../../hooks/use-auth-actions";
import CardFooterAuth from "@/components/CardFooterAuth";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { useMessage } from "@/hooks/use-message";
import { resgisterZodShema, type RegisterZodShemaType } from "@/lib/zod.shemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const RegisterPage = () => {
  const { loading, register } = useAuthActions();

  const { showMessageError } = useMessage();

  const form = useForm<RegisterZodShemaType>({
    resolver: zodResolver(resgisterZodShema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      displayName: "",
    },
  });

  const onSubmit = async (data: RegisterZodShemaType) => {
    const response = await register(data);

    console.log(response);

    if (!response.success) {
      console.log(response);
      showMessageError("Have been an error in register with user and password");
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Register to your account using email and password or with Google.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Email</FieldLabel>
                    <Input
                      {...field}
                      id="i-email"
                      type="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your email"
                      autoComplete="false"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Password</FieldLabel>
                    <Input
                      {...field}
                      id="i-password"
                      type="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your password"
                      autoComplete="false"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Confirm Password</FieldLabel>
                    <Input
                      {...field}
                      id="i-confirmPassword"
                      type="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="Confirm your password"
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
              {loading ? "Loggin in..." : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooterAuth type="register" loading={loading} />
      </Card>
    </div>
  );
};
export default RegisterPage;
