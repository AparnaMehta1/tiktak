  import {useLocation, Outlet, Navigate} from "react-router-dom";
 

  const RequiredAuth = ({allowdRoles}) =>{
      const location = useLocation();
      return (
          localStorage.getItem("userTypes")=== allowdRoles[0]
           ?<Outlet />
           :localStorage.getItem("userTypes")
           ?<Navigate  to="/unauthorised" state={{from:location}} replace />
           :<Navigate to="/" state={{from:location}} replace/>         
      )
      
      
  }

  export default RequiredAuth;