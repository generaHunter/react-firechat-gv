import Navbar from "@/components/Navbar";
import { Suspense } from "react";
import { Navigate, Outlet } from "react-router";
import { useSigninCheck, useUser } from "reactfire";

const AdminLayout = () => {
  const { status, data: signCheckResult, hasEmitted } = useSigninCheck();

  // Mostrar loading miestras se verifica el estado de la sesion
  if (status === "loading" || !hasEmitted) {
    return <div>Loading...</div>;
  }

  // Redirigir si el usuario no esta autenticado
  if (status === "success" && !signCheckResult.signedIn) {
    return <Navigate to={"/auth/login"} />;
  }

  return (
    <Suspense fallback={<div>Loading user...</div>}>
      <AuthenticatedLayout />
    </Suspense>
  );
};
export default AdminLayout;

const AuthenticatedLayout = () => {
  useUser({
    suspense: true
  });

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <Outlet />
      </div>
    </div>
  );
};
