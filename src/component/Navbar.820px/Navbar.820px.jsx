import './Navbar.820.css';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faRightFromBracket,
    faGear,
    faCircleInfo,
    faHouseUser,
    faHandshakeSimple
} from '@fortawesome/free-solid-svg-icons';
import { logout } from '../../Redux/authSlice';

const Navbar820 = () => {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        navigate('/');
    }

    return (
        <div className='navbar-820'>
            <div className='d-820'>
                <span>
                    <Link to='/'><b>J</b><span>OIN JAPAN</span> <FontAwesomeIcon icon={faHandshakeSimple} /></Link>
                </span>
                <div className='content-820'>
                    {user ?
                        <>
                            <li>
                                <Link to='/'>
                                    {user.username}
                                </Link>
                            </li>
                            <li>
                                <NavLink to='/' activeClassNam='active'>
                                    <FontAwesomeIcon icon={faHouseUser} />
                                </NavLink>
                            </li>
                            {
                                user.role === 'user' ?
                                    <>
                                        <li>
                                            <NavLink to='/user' activeClassNam='active'>
                                                <FontAwesomeIcon icon={faGear} />
                                            </NavLink>
                                        </li>

                                    </>
                                    :
                                    <>
                                        <li className='post-job'>
                                            <NavLink to='/job' activeClassNam='active'>
                                                <span>Post&nbsp;Job</span>
                                            </NavLink>
                                        </li>
                                        <li className='find-cv'>
                                            <NavLink to='/find-cv' activeClassNam='active'>
                                                <span>Find&nbsp;CV</span>
                                            </NavLink>
                                        </li>
                                    </>
                            }
                            <li>
                                <NavLink to='/about' activeClassNam='active'>
                                    <FontAwesomeIcon icon={faCircleInfo} />
                                </NavLink>
                            </li>

                            <li>
                                <Link to=''>
                                    <FontAwesomeIcon
                                        icon={faRightFromBracket}
                                        onClick={(e) => handleLogout(e)}
                                    />
                                </Link>
                            </li>
                        </>
                        :
                        <>
                            <li>
                                <NavLink
                                    to='/'
                                    activeClassNam='active'
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li><NavLink to='/login' activeClassNam='active'>Login</NavLink></li>
                            <li><NavLink to='/register' activeClassNam='active'>Register</NavLink></li>
                            <li><NavLink to='/about' activeClassNam='active'>About</NavLink></li>
                        </>}
                </div>
            </div>
        </div>
    )
}
export default Navbar820;