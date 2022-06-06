import useAuth from "../Hooks/useAuth";

function Authenticated({ children }) {
    const { isAuthenticated, user } = useAuth();

    if (isAuthenticated) {
        return children(user);
    }
    return null;
}
export default Authenticated;