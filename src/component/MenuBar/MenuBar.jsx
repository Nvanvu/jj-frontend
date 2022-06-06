import Navbar820 from "../Navbar.820px/Navbar.820px";
import Navbar819 from "../Navbar.819px/Navbar.819px";
import './MenuBar.css';
import { useSelector } from "react-redux";
import AdminNavBar from "../Admin/Admin.NavBar";

const MenuBar = () => {
    const user = useSelector(state => state.auth.user);
    return (
        <>
            {user?.role === 'admin' ?
                <>
                    <AdminNavBar />
                </> :
                <>
                    <div className="sidebar">
                        <Navbar819 />
                        <Navbar820 />
                    </div>
                </>
            }
        </>

    )
}
export default MenuBar;