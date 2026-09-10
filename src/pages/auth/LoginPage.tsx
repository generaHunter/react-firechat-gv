import CardFooterAuth from "@/components/CardFooterAuth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthActions } from "@/hooks/use-auth-actions";
import { loginZodShema, type LoginZodShemaType } from "@/lib/zod.shemas";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMessage } from "@/hooks/use-message";

const LoginPage = () => {
  const { loading, login } = useAuthActions();
  const { showMessageError } = useMessage();

  const form = useForm<LoginZodShemaType>({
    resolver: zodResolver(loginZodShema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginZodShemaType) => {
    //RG_pruebas01
    const response = await login(data);

    console.log(response);

    if (!response.success) {
      showMessageError("Have been an error in login with user and password");
      if (response.error?.code === "auth/invalid-credential") {
        form.setError("email", {
          type: "manual",
          message: "Invalid email or password",
        });

        form.setError("password", {
          type: "manual",
          message: "Invalid email or password",
        });
      }
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Login to your account using email and password or with Google.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
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
            </FieldGroup>
            <Button className="w-full mt-5" disabled={loading} type="submit">
              {loading ? "Loggin in..." : "Login"}
            </Button>
          </form>
        </CardContent>
        <FieldSeparator />
        <CardFooterAuth type="login" loading={loading} />
      </Card>
    </div>
  );
};
export default LoginPage;
