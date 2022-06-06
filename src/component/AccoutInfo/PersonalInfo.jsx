import './PersonalInfo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useSelector, } from 'react-redux';
import { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
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


    const hanldeSubmit =async (e) => {
        e.preventDefault();
        const fileCV=await uploadFile(file);
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
                        <select name="" id="" onChange={e => setBangCapCaoNhat(e.target.value)}>最終学歴を選択して下さい
                            <option value="">bac hoc cao nhat</option>
                            <option value="大学卒">大学卒</option>
                            <option value="短期大学卒">短期大学卒</option>
                            <option value="専門学校卒">専門学校卒</option>
                            <option value="他">他</option>
                        </select>
                    </div>
                    <div className='kinh-nghiem'>
                        <label>経験職種</label>
                        <textarea onChange={e => setKinhNghiemLamViec(e.target.value)} />
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
                        <label ><input type="checkbox"value='dong y' onChange={(e) => handleCheck1(e.target.value)} /><i></i> 利用規約</label>
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