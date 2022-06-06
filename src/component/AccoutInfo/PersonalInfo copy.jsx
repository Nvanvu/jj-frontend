import './PersonalInfo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp, faL } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import request from '../../api/request';

const PersonalInfo = () => {
    const user = useSelector(state => state.auth.user?.currentUser);
    const navigate = useNavigate();

    const [ho, setHo] = useState('');
    const [ten, setTen] = useState('');
    const [email, setEmail] = useState('');
    const [bacHocCaoNhat, setBacHocCaoNhat] = useState('');
    const [kinhNghiemLamViec, setKinhNghiemLamViec] = useState('');

    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File.');

    const [ghiChu, setGhiChu] = useState('');

    const [camKet1, setCamKet1] = useState('');
    const [camKet2, setCamket2] = useState('');

    const CheckBox = (prevState, newValue) => {
        const isCheck = prevState.includes(newValue);
        if (isCheck) {
            const newChecks = prevState.filter(check => check !== newValue);
            return newChecks;
        }
        return [...prevState, newValue];
    }
    const handleCheck1 = (value) => {
        setCamKet1(prevState => CheckBox(prevState, value));
    }
    const handleCheck2 = (value) => {
        setCamket2(prevState => CheckBox(prevState, value));
    }
    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await request({
                url: '/v4/upload-file-to-cloud',
                method: 'POST',
                data: formData,
            })
            return res.data;
        } catch (error) {
            return '';
        }
    }
    const onSubmit = async file => {
        if (file) {
            try {
                const res = await request({
                    url: '/v4/upload-file',
                    method: 'POST',
                    data: {
                        fileUrl: file
                    }
                })
                if (res.success) {
                    alert('Success');
                }
            } catch (error) {
                alert('loio cmnr');
            }
        }
    }
    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    })


    const onChangeFile = async (e) => {
        const files = e.target.files;
        if (files.length) {
            const fileUrl = await uploadFile(files[0]);
            setFile(fileUrl);
            setFilename(files[0].name);

            console.log(fileUrl);
        }

    }

    const hanldeSubmit = (e, onSubmit) => {
        e.preventDefault();


    }
    return (
        <div className='thong-tin-ca-nhan'>
            <div className='personal-0'>
                <div className='personal-1'>
                    <span>エントリーフォーム</span>
                    <span>ジョブ<b>J</b><span>oinJapa</span>への登録は、こちらのエントリーフォームからお願いします。</span>
                </div>
                <form onSubmit={(e) => hanldeSubmit(e, onSubmit)}>
                    <div className='ho-ten'>
                        <label >姓<input type="text" onChange={e => setHo(e.target.value)} /></label>
                        <label >名<input type="text" onChange={e => setTen(e.target.value)} /></label>
                    </div>
                    <div className='dia-chi-mail'>
                        <label>メールアドレス<input type='email' /></label>
                    </div>
                    <div className='bac-hoc-cao-nhat'>
                        <select name="" id="" onChange={e => setBacHocCaoNhat(e.target.value)}>最終学歴を選択して下さい
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
                        <label ><input type="checkbox" onChange={() => handleCheck1('dong y')} /><i></i> 利用規約</label>
                        <label ><input type="checkbox" onChange={() => handleCheck2('dong y')} /><i></i> 個人情報保護方針</label>
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