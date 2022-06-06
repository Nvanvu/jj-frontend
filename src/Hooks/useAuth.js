import { useSelector } from "react-redux";

function useAuth() {
    const user = useSelector(state => state.auth.user);
    const isAuthenticated = !!user;

    return {
        user,
        isAuthenticated
    }
}
export default useAuth;