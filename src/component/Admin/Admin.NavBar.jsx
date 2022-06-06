import './Admin.NavBar.css';
import { Link, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHandshakeSimple,
    faRightFromBracket
} from '@fortawesome/free-solid-svg-icons';
import { logout } from '../../Redux/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminNavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        navigate('/');
    }
    return (
        <div className='admin-navbar'>
            <div className='ad-logo'>
                <span>
                    <Link to='/'>
                        <b>J</b>
                        <span>OIN JAPAN</span>
                        <FontAwesomeIcon
                            icon={faHandshakeSimple}
                        />
                    </Link>
                </span>
                <div className='ad-menu'>
                    <li>
                        <Link to=''>
                            <FontAwesomeIcon
                                icon={faRightFromBracket}
                                onClick={(e) => handleLogout(e)}
                            />
                        </Link>
                    </li>
                </div>
            </div>
        </div>
    )
}
export default AdminNavBar;