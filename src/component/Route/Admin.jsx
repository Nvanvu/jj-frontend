import { Outlet, Navigate } from "react-router-dom";

export default function Admin({ user }) {
    if (!user) { return <Navigate to='/login' /> }
    else {
        if (user.role === 'addmin') return <Outlet />
        return <Navigate to='/'/>
    }
}