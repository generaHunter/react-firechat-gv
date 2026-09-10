import { Outlet } from "react-router";
import { Toaster } from "@/components/ui/toast";

const RootLayout = () => {
  return (
    <div>
      <Outlet />
      <Toaster />
    </div>
  );
};
export default RootLayout;
