import { Outlet, Navigate } from "react-router-dom"

export default function AuthGuard({isAuthenticated}) {
    
    return isAuthenticated ? <Outlet /> : <Navigate to={'/admin/login'} />
}