import { Outlet, Navigate } from "react-router-dom";

import useAuth from "../../Hooks/useAuth";

export default function GuestRoute() {
    const { user } = useAuth();

    if (user) return <Navigate to='/' replace />

    return (<Outlet />)
}