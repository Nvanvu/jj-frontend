import { Outlet, Navigate } from "react-router-dom";

export default function UserRoute({ user }) {
    if (!user) {
        return <Navigate to='/login' />
    } else {
        if (user.role === 'user') return <Outlet />
        return <Navigate to='/' />
    }
}