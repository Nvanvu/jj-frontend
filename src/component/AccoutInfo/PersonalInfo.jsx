import './PersonalInfo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useSelector, } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import request from '../../Api/request';
import { createUserInfo } from '../../Redux/apiRequest';
import { type } from '@testing-library/user-event/dist/type';


const PersonalInfo = () => {
    const user = useSelector(state => state.auth.user);
    const navigate = useNavigate();

    const [ho, setHo] = useState('');
    const [ten, setTen] = useState('');
    const [bangCapCaoNhat, setBangCapCaoNhat] = useState('');
    const [kinhNghiemLamViec, setKinhNghiemLamViec] = useState('');
    const [congViecUngTuyen, setCongViecUngTuyen] = useState('');
    const [viTriUngTuyen, setViTriUngTuyen] = useState('');

    const [PR, setPR] = useState('');
    const [dieuKhoanSuDung, setDieuKhoanSuDung] = useState('');
    const [baoMatThongTin, setBaoMatThongTin] = useState('');
    const [chuyenNganh, setChuyenNganh] = useState('');
    const [mucLuongMongMuon, setMucLuongMongMuon] = useState('');

    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File.');

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
    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    })
    const CheckBox = (prevState, newValue) => {
        const isCheck = prevState.includes(newValue);
        if (isCheck) {
            const newChecks = prevState.filter(check => check !== newValue);
            return newChecks;
        }
        return [...prevState, newValue];
    }
    const handleCheck1 = (value) => {
        setBaoMatThongTin(prevState => CheckBox(prevState, value));
    }
    const handleCheck2 = (value) => {
        setDieuKhoanSuDung(prevState => CheckBox(prevState, value));
    }
    const onChangeFile = (e) => {
        const files = e.target.files;
        if (files.length) {
            setFile(files[0]);
            setFilename(files[0].name);
        }
    }

    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await request({
                url: "/v4/upload-file-to-cloud",
                method: "post",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" }
            });
            return (res.data);
        } catch (error) {
            console.log("Loi ", error);
            return '';
        }
    }


    const hanldeSubmit = async (e) => {
        e.preventDefault();
        const fileCV = await uploadFile(file);
        const newPersonalInfo = {
            ho,
            ten,
            bangCapCaoNhat,
            kinhNghiemLamViec,
            congViecUngTuyen,
            viTriUngTuyen,
            fileCV,
            PR,
            dieuKhoanSuDung,
            baoMatThongTin,
            chuyenNganh,
            mucLuongMongMuon
        }
        createUserInfo(newPersonalInfo, user.accessToken, navigate);
    }
    return (
        <div className='thong-tin-ca-nhan'>
            <div className='personal-0'>
                <div className='personal-1'>
                    <span>エントリーフォーム</span>
                    <span>ジョブ<b>J</b><span>oinJapa</span>への登録は、こちらのエントリーフォームからお願いします。</span>
                </div>
                <form onSubmit={(e) => hanldeSubmit(e)}>
                    <div className='ho-ten'>
                        <label >姓<input type="text" onChange={e => setHo(e.target.value)} /></label>
                        <label >名<input type="text" onChange={e => setTen(e.target.value)} /></label>
                    </div>
                    <div className='dia-chi-mail'>
                        <label>メールアドレス<span>{user?.username}</span></label>
                    </div>
                    <div className='bac-hoc-cao-nhat'>
                        <label>最終学歴</label>
                        <select onChange={e => setBangCapCaoNhat(e.target.value)}>
                            <option selected disabled>最終学歴を選択して下さい</option>
                            {BangCap.map(type => {
                                return (
                                    <>
                                        <option key={type.name} value={type.name}>{type.name}</option>
                                    </>
                                )
                            })}
                        </select>
                    </div>
                    <div className='chuyen-nganh'>
                        <label>専攻</label>
                        <select onChange={e => setChuyenNganh(e.target.value)}>
                            <option selected disabled>専攻を選択して下さい</option>
                            {ChuyenNganh.map(type => {
                                return (
                                    <>
                                        <option key={type.name} value={type.name}>{type.name}</option>

                                    </>
                                )
                            })}
                        </select>
                    </div>
                    <div className='kinh-nghiem'>
                        <label>経験年数</label>
                        <select onChange={e => setKinhNghiemLamViec(e.target.value)}>
                            <option selected disabled>経験年数を選択して下さい</option>
                            {
                                KinhNghiem.map(type => {
                                    return (
                                        <>
                                            <option key={type.name} value={type.name}>{type.name}</option>
                                        </>
                                    )
                                })
                            }                        </select>
                    </div>
                    <div className='cong-viec-ung-tuyen'>
                        <label>職種応募</label>
                        <select onChange={e => setCongViecUngTuyen(e.target.value)}>
                            <option selected disabled>職種を選択して下さい</option>
                            {
                                CongViecUngTuyen.map(type => {
                                    return (
                                        <>
                                            <option value={type.name}>{type.name}</option>
                                        </>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='vi-tri'>
                        <label>役職</label>
                        <select onChange={e => setViTriUngTuyen(e.target.value)}>
                            <option selected disabled>役職を選択して下さい</option>
                            {
                                ViTri.map(type => {
                                    return (
                                        <>
                                            <option value={type.name}>{type.name}</option>
                                        </>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='muc-luong'>
                        <label>給料希望</label>
                        <select onChange={e => setMucLuongMongMuon(e.target.value)}>
                            <option selected disabled>給料希望を選択して下さい</option>
                            {MucLuong.map(type => {
                                return (
                                    <>
                                        <option value={type.name}>{type.name}</option>
                                    </>
                                )
                            })}
                        </select>
                    </div>
                    <div className='gui-CV'>
                        <label>履歴書を添付して下さい</label>
                        <div>
                            <label>
                                <span>ファイルを選択 </span> &nbsp;
                                <FontAwesomeIcon icon={faCloudArrowUp} />
                                <input type="file" onChange={onChangeFile} />
                            </label>
                            <label>{filename}</label>
                        </div>
                        <label>Word, PDF,エクセル,パワーポイントのファイルがアップロード可能です。
                            一つファイル2MBまでとなっております。
                        </label>
                    </div>
                    <div className='ghi-chu'>
                        <label>PR</label>
                        <textarea
                            onChange={e => setPR(e.target.value)}
                            name=""
                            id=""
                            cols="30"
                            rows="10"
                            placeholder='ご質問内容や、ご希望などございましたら記載下さい。'
                        >
                        </textarea>
                    </div>
                    <div className='cam-ket'>
                        <label>利用規約と個人情報保護方針をお読み頂き、同意の上ご登録下さい</label>
                        <label ><input type="checkbox" value='dong y' onChange={(e) => handleCheck1(e.target.value)} /><i></i> 利用規約</label>
                        <label ><input type="checkbox" value='dong y' onChange={(e) => handleCheck2(e.target.value)} /><i></i> 個人情報保護方針</label>
                    </div>
                    <div className='gui-thong-tin'>
                        <button>CLICK</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default PersonalInfo;