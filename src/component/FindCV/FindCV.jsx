import './FindCV.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { findCV } from '../../Redux/companyRequest';
import { useNavigate, useSearchParams } from 'react-router-dom';

const FindCV = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);

    const [searchParams, setSearchParams] = useSearchParams();
    const [listCV, setListCV] = useState([]);

    const [bangCap, setBangCap] = useState('');
    const [chuyenNganh, setChuyenNganh] = useState('');
    const [kinhNghiem, setKinhnghiem] = useState('');
    const [congViecUngTuyen, setCongViecUngTuyen] = useState('');
    const [viTri, setViTri] = useState('');
    const [mucLuong, setMucLuong] = useState('');

    const BangCap = [
        { name: '大学卒' },
        { name: '短期大学卒' },
        { name: '専門学校卒' },
        { name: '他' }
    ]
    const ChuyenNganh = [
        { name: 'IT' },
        { name: 'ゴム製品' },
        { name: '産業用電力' },
        { name: '機械' },
        { name: '化学' },
        { name: '農業' },
        { name: '経済' },
        { name: '銀行サービス' },
        { name: '他の専攻' },
    ]
    const KinhNghiem = [
        { name: '不経験' },
        { name: '1-2年' },
        { name: '3-4年' },
        { name: '5-6年' },
        { name: '7-8年' },
        { name: '9-10年' },
        { name: '11年以上' },
    ]
    const CongViecUngTuyen = [
        { name: 'IT' },
        { name: 'ゴム製品' },
        { name: '産業用電力' },
        { name: '機械' },
        { name: '化学' },
        { name: '農業' },
        { name: '経済' },
        { name: '銀行サービス' },
        { name: '他の専攻' },
    ]
    const ViTri = [
        { name: 'アルバイト' },
        { name: '実習生' },
        { name: '社員' },
        { name: '課長' },
        { name: '部長' },
        { name: '社長' },
        { name: '他の役職' },
    ]
    const MucLuong = [
        { name: '10万円' },
        { name: '10万円-20万円' },
        { name: '20万円-30万円' },
        { name: '30万円-40万円' },
        { name: '40万円-50万円' },
        { name: '50万円-60万円' },
        { name: '60万円-70万円' },
        { name: '70万円-80万円' },
        { name: '80万円-90万円' },
        { name: '90万円-100万円' },
        { name: '100万円以上' },
    ]

    const getAllCV = async () => {
        setListCV(await findCV(user?.accessToken, navigate));
    }
    useEffect(() => {
        getAllCV();
    }, []);

    const handleChoseCV = (e) => {
        e.preventDefault();
    }
    const searchCommand = async () => {
    }
    const handleCommanSubmit = (e) => {
        e.preventDefault();

    }
    return (
        <div className='find-cv'>
            <div className='find-cv-content'>
                <form onSubmit={e => handleCommanSubmit(e)}>
                    <div className='find-border'>
                        <div className='find-command'>
                            <div className='find-BangCap'>
                                <label>最終学歴 </label>
                                <select onChange={e => setBangCap(e.target.value)}>
                                    <option selected disabled>最終学歴を選択して下さい</option>
                                    {BangCap.map(type => {
                                        return (
                                            <>
                                                <option value={type.name}>{type.name}</option>
                                            </>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='find-ChuyenNganh'>
                                <label>専攻</label>
                                <select onChange={e => setChuyenNganh(e.target.value)}>
                                    <option selected disabled>専攻を選択して下さい</option>
                                    {ChuyenNganh.map(type => {
                                        return (
                                            <>
                                                <option value={type.name}>{type.name}</option>
                                            </>
                                        )
                                    })}
                                </select>
                            </div>

                            <div className='find-kinhnghiem'>
                                <label>経験年数</label>
                                <select onChange={e => setKinhnghiem(e.target.value)}>
                                    <option selected disabled>経験年数を選択して下さい</option>
                                    {KinhNghiem.map(type => {
                                        return (
                                            <>
                                                <option value={type.name}>{type.name}</option>
                                            </>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='find-CongViecUngTuyen'>
                                <label>職種応募</label>
                                <select onChange={e => setCongViecUngTuyen(e.target.value)}>
                                    <option selected disabled>職種を選択して下さい</option>
                                    {CongViecUngTuyen.map(type => {
                                        return (
                                            <>
                                                <option value={type.name}>{type.name}</option>
                                            </>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='find-ViTri'>
                                <label>役職</label>
                                <select onChange={e => setViTri(e.target.value)}>
                                    <option selected disabled>役職を選択して下さい</option>
                                    {ViTri.map(type => {
                                        return (
                                            <>
                                                <option value={type.name}>{type.name}</option>
                                            </>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='find-MucLuong'>
                                <label>給料</label>
                                <select onChange={e => setMucLuong(e.target.value)}>
                                    <option selected disabled>給料を選択して下さい</option>
                                    {MucLuong.map(type => {
                                        return (
                                            <>
                                                <option value={type.name}>{type.name}</option>
                                            </>
                                        )
                                    })}
                                </select>
                            </div>

                        </div>
                        <div className='find-btn-sreach'>
                            <div>
                                <button>検索</button>
                            </div>
                        </div>
                    </div>
                </form>
                <form onSubmit={e => handleChoseCV(e)}>
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
                    <div className='find-btn'>
                        <div>
                            <button>
                                CHON
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default FindCV;