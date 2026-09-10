import { useAuthActions } from "@/hooks/use-auth-actions";
import { Button } from "./ui/button";
import { CardFooter } from "./ui/card";
import { Mail } from "lucide-react";
import { Link } from "react-router";
import { useMessage } from "@/hooks/use-message";
interface Props {
  type: "login" | "register";
  loading: boolean;
}

const CardFooterAuth = ({ type, loading }: Props) => {
  const { loginWithGoogle } = useAuthActions();
  const { showMessageError } = useMessage();

  const handleLoginWithGoogle = async () => {
    const result = await loginWithGoogle();

    if (result.success) {
      console.log("Login successfully");
    } else {
      console.error("Login failed:", result.error);
      showMessageError(`Have been an error in ${type === "login"? 'login': 'register'} with Google.`);
    }
  };

  return (
    <CardFooter className="flex flex-col items-center gap-4">
      <Button
        onClick={handleLoginWithGoogle}
        className="w-full"
        disabled={loading}
        variant="outline"
      >
        <Mail className="mr-2" />
        {type === "login" ? "Login with Google" : "Register with Google"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        {type === "login"
          ? "Don't have an account?"
          : "Already have an account?"}
        <Link to={type === "login" ? "/auth/register" : "/auth/login"}>
          <Button variant="link" className="p-0 h-auto font-normal">
            {type === "login" ? "Register" : "Sign in"}
          </Button>
        </Link>
      </p>
    </CardFooter>
  );
};
export default CardFooterAuth;
