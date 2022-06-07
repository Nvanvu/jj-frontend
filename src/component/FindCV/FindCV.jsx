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
                <form>
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
                </form>
                <form>
                    <div className='find-title'>
                        <div>
                            <span className='f-ho'>Ho</span>
                            <span className='f-ten'>Ten</span>
                            <span className='f-trinhdo'>Trinh do</span>
                            <span className='f-chuyennganh'>Chuyen nganh</span>
                            <span className='f-kinhnghiem'>Kinh nghiem</span>
                            <span className='f-congviecungtuyen'>Cong viec ung tuyen</span>
                            <span className='f-vitri'>Vi tri ung tuyen</span>
                            <span className='f-mucluong'>Muc luong</span>
                            <span className='f-ngaydang'>Ngay dang</span>
                        </div>
                    </div>
                    {listCV.map(CV => {
                        return (
                            <>
                                <div className='find-content'>

                                    <label className='l-find'>
                                        <input
                                            key={CV._id}
                                            className='inp-find'
                                            type='checkbox'
                                        />
                                        <i className='i-find' ></i>{CV.name}

                                        <span className='f-ho-s'>{CV.ho}</span>
                                        <span className='f-ten-s'>{CV.ten}</span>
                                        <span className='f-trinhdo-s'>{CV.bangCapCaoNhat}</span>
                                        <span className='f-chuyennganh-s'>{CV.chuyenNganh}</span>
                                        <span className='f-kinhnghiem-s'>{CV.kinhNghiemLamViec}</span>
                                        <span className='f-congviecungtuyen-s'>{CV.congViecUngTuyen}</span>
                                        <span className='f-vitri-s'>{CV.viTriUngTuyen}</span>
                                        <span className='f-mucluong-s'>{CV.mucLuongMongMuon}</span>
                                        <span className='f-ngaydang'>{CV.updatedAt}</span>
                                    </label>
                                </div>
                            </>
                        )
                    })}
                    <div>
                        <button>
                            CHON
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default FindCV;