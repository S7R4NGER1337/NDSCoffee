import { Outlet, Navigate } from "react-router-dom"

export default function AuthGuard() {
    const user = false

    return user ? <Outlet /> : <Navigate to={'/'} />
}