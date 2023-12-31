import { Navigate, Outlet } from "react-router-dom"
import { Header } from "./Header"
import useAuth from "../../../hooks/useAuth"

export const PublicLayout = () => {
  const {auth} = useAuth();
  return (
    <>
        {/* layout */}
        <Header/>

        {/* contenido principal */}
        <section className="layout__content-login">
          {!auth._id ? 
              <Outlet/>
            :
              <Navigate to="/social"/>
          }
        </section>
    </>
  )
}
