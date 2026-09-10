import { useUser } from "reactfire";
import { useAuthActions } from "../../hooks/use-auth-actions";
import { Button } from "@/components/ui/button";

const DashboardPage = () => {
  const { data: user } = useUser();

  const {logout} = useAuthActions();

  return (
    <div className="">
      <h1>DashboardPage</h1>
      <p>Welcome, {user!.displayName || "Guest"}</p>
      <p>Email: {user!.email || "Not provided"}</p>
      <Button variant={"destructive"} onClick={logout}>Sign Out</Button>
    </div>
  );
};
export default DashboardPage;
