import './Home.css';
import Search from '../Search/Search';
import { useSelector } from 'react-redux';
import Admin from '../Admin/Admin';

const Home = () => {
    const user = useSelector(state => state.auth.user);
    return (
        <>{user?.role === 'admin' ? <>
            <Admin/>
        </> : <>
            <div className='home'>
                <Search />
            </div></>}</>
    )
}

export default Home;