import { Link } from 'react-router-dom';
import './Navbar.819px.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignJustify, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';


const Navbar819 = () => {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const SidebarData = [
        { title: 'Home', path: '/', cName: 'nav-item' },
        { title: 'Login', path: '/', cName: 'nav-item' },
        { title: 'Register', path: '/', cName: 'nav-item' },
        { title: 'About', path: '/', cName: 'nav-item' },
        { title: 'Contact', path: '/', cName: 'nav-item' }

    ]
    return (
        <>
            <div className='navbar'>
                <div className='navbar-content'>
                    <span>JOIN JAPAN</span>
                    <Link to='' id='menu-bars'>
                        <FontAwesomeIcon
                            id='faAlignJustify'
                            icon={faAlignJustify}
                            onClick={showSidebar} />
                    </Link>
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul onClick={showSidebar}>
                        <li>
                            <FontAwesomeIcon
                                icon={faAnglesRight}
                                id='faAnglesRight' />
                        </li>
                        {SidebarData.map((item, key) => {
                            return (
                                <li key={key} className={item.cName}>
                                    <Link to={item.path}>{item.title}</Link>
                                </li>
                            )
                        })}
                        <hr />

                    </ul>

                </nav>
            </div>
        </>
    )
}
export default Navbar819;