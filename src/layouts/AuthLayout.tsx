import { Navigate, Outlet } from "react-router"
import { useSigninCheck } from "reactfire";

const AuthLayout = () => {
  const {status, data: signCheckResult, hasEmitted} = useSigninCheck();
  
    // Mostrar loading miestras se verifica el estado de la sesion
  if (status === "loading" || !hasEmitted) {
    return <div>Loading...</div>
  }

  // Redirigir si el usuario ya esta autenticado
  if (status === "success" && signCheckResult.signedIn) {
    return <Navigate to={"/admin"} replace />
  }
  
  return (
    <div>
      <Outlet />
    </div>
  )
}
export default AuthLayout