import { Outlet, Navigate } from "react-router-dom";

export default function CompanyRoute({ user }) {
    if (!user) { return <Navigate to='/login' /> }
    else {
        if (user.role === 'company') return <Outlet />
        return <Navigate to='/'/>
    }
}