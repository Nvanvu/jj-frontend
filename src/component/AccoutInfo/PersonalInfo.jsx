import './PersonalInfo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useSelector, } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import request from '../../Api/request';
import { createUserInfo } from '../../Redux/apiRequest';


const PersonalInfo = () => {
    const user = useSelector(state => state.auth.user);
    const navigate = useNavigate();

    const [ho, setHo] = useState('');
    const [ten, setTen] = useState('');
    const [bangCapCaoNhat, setBangCapCaoNhat] = useState('');
    const [kinhNghiemLamViec, setKinhNghiemLamViec] = useState('');

    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File.');

    const [ghiChu, setGhiChu] = useState('');

    const [dieuKhoanSuDung, setDieuKhoanSuDung] = useState('');
    const [baoMatThongTin, setBaoMatThongTin] = useState('');

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
            fileCV,
            ghiChu,
            dieuKhoanSuDung,
            baoMatThongTin
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
                        <select onChange={e => setBangCapCaoNhat(e.target.value)}>
                            <option selected disabled>最終学歴を選択して下さい</option>
                            <option value="大学卒">大学卒</option>
                            <option value="短期大学卒">短期大学卒</option>
                            <option value="専門学校卒">専門学校卒</option>
                            <option value="他">他</option>
                        </select>
                    </div>
                    <div className='chuyen-nganh'>
                        <label>専攻</label>
                        <select onChange={e => setKinhNghiemLamViec(e.target.value)}>
                            <option selected disabled>専攻を選択して下さい</option>
                            <option value="IT">IT</option>
                            <option value="ゴム製品">ゴム製品</option>
                            <option value="産業用電力">産業用電力</option>
                            <option value="機械">機械</option>
                            <option value="化学">化学</option>
                            <option value="農業">農業</option>
                            <option value="経済">経済</option>
                            <option value="銀行サービス">銀行サービス</option>
                            <option value="他の専攻">他の専攻</option>
                        </select>
                    </div>
                    <div className='kinh-nghiem'>
                        <label>経験年数</label>
                        <select onChange={e => setKinhNghiemLamViec(e.target.value)}>
                            <option selected disabled>経験年数を選択して下さい</option>
                            <option value="0">不経験</option>
                            <option value="12">1-2年</option>
                            <option value="34">3-4年</option>
                            <option value="56">5-6年</option>
                            <option value="78">7-8年</option>
                            <option value="90">9-10年</option>
                            <option value="99">11年以上</option>
                        </select>
                    </div>
                    <div className='vi-tri'>
                        <label>役職</label>
                        <select onChange={e => setKinhNghiemLamViec(e.target.value)}>
                            <option selected disabled>役職を選択して下さい</option>
                            <option value="0">社員</option>
                            <option value="12">課長</option>
                            <option value="34">部長</option>
                            <option value="56">社長</option>
                            <option value="78">他の役職</option>
                        </select>
                    </div>
                    <div className='muc-luong'>
                        <label>給料希望</label>
                        <select>
                            <option selected disabled>給料希望を選択して下さい</option>
                            <option value="10">10万円</option>
                            <option value="102">10万円-20万円</option>
                            <option value="203">20万円-30万円</option>
                            <option value="304">30万円-40万円</option>
                            <option value="405">40万円-50万円</option>
                            <option value="506">50万円-60万円</option>
                            <option value="607">60万円-70万円</option>
                            <option value="708">70万円-80万円</option>
                            <option value="809">80万円-90万円</option>
                            <option value="900">90万円-100万円</option>
                            <option value="909">100万円以上</option>
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
                        <label>ノート</label>
                        <textarea
                            onChange={e => setGhiChu(e.target.value)}
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