import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './FindCV.css';

const FindCV = () => {
    const user = useSelector(state => state.auth.user);

    useEffect(() => {

    }, []);
    return (
        <div className='find-cv'>
            <div className='find-cv-content'>
                DAY LA TRANG FIND CV
            </div>
        </div>
    )
}
export default FindCV;