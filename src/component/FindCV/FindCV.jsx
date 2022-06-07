import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './FindCV.css';
import { findCV } from '../../Redux/companyRequest';
import { useNavigate } from 'react-router-dom';

const FindCV = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);
    const [listCV, setListCV] = useState([]);

    const typeIndustry = [
        { name: 'IT' },
        { name: '水産' },
        { name: '化学' },
        { name: 'ゴム製品' },
        { name: 'ガラス' },
        { name: '機械' },
        { name: '経済' }
    ]

    const getAllCV = async () => {
        setListCV(await findCV(user?.accessToken, navigate));
    }
    useEffect(() => {
        getAllCV();
    }, []);
    return (
        <div className='find-cv'>
            <div className='find-cv-content'>
                <div className='find-command'>
                    {typeIndustry.map(type => {
                        return (
                            <label className='l-find'>
                                <input
                                    key={type.name}
                                    name={type.name}
                                    className='inp-find' value={type.name}
                                    type='checkbox'
                                />
                                <i className='i-find'></i>{type.name}
                            </label>
                        )
                    })}
                </div>
                <div className='find-title'>
                    <div>
                        <span className='f-sp-1'>Ho</span>
                        <span className='f-sp-2'>Ten</span>
                        <span className='f-sp-3'>Trinh do</span>
                        <span className='f-sp-13'>Chuyen nganh</span>
                        <span className='f-sp-4'>Kinh nghiem</span>
                        <span className='f-sp-5'>Vi tri ung tuyen</span>
                        <span className='f-sp-6'>Ngay dang</span></div>
                </div>
                {listCV.map(CV => {
                    return (
                        <>
                            <form>
                                <div className='find-content'>

                                    <label className='l-find'>
                                        <input
                                            key={CV._id}
                                            className='inp-find'
                                            type='checkbox'
                                        />
                                        <i className='i-find' ></i>{CV.name}

                                        <span className='f-sp-7'>{CV.ho}</span>
                                        <span className='f-sp-8'>{CV.ten}</span>
                                        <span className='f-sp-9'>{CV.bangCapCaoNhat}</span>
                                        <span className='f-sp-14'>{CV.congViecUngTuyen}</span>
                                        <span className='f-sp-10'>{CV.kinhNghiemLamViec}</span>
                                        <span className='f-sp-11'>{CV.viTriUngTuyen}</span>
                                        <span className='f-sp-12'>{CV.updatedAt}</span>
                                    </label>
                                </div>
                            </form>
                        </>
                    )
                })}
            </div>
        </div>
    )
}
export default FindCV;