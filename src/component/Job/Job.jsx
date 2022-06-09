import './Job.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../Api/request';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import showError from '../errorIcon/showError';


const Company = () => {
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.user);

    const hinhthutuyendung = [
        { name: '正社員' },
        { name: '契約社員' },
        { name: '派遣社員' },
        { name: 'アルバイト' }
    ]
    const diadiemlamviec = [
        { name: '東京' },
        { name: '大阪' },
        { name: '関東' },
        { name: '北海道' },
        { name: '広島' },
        { name: '名古屋' },
        { name: '岡山' }
    ]
    const loainganhnghe = [
        { name: 'IT' },
        { name: '水産' },
        { name: '化学' },
        { name: 'ゴム製品' },
        { name: 'ガラス' },
        { name: '機械' },
        { name: '経済' }
    ]
    const chedo=[
        { name: '健康保険' },
        {name:'厚生年金'},
        {name:'雇用保険'},
        {name:'労災保険'},
        { name: '定期健康診断' },
        { name: '昇給' }
    ]
    const [preface, setPreface] = useState('');
    const [companyId, setCompanyId] = useState('');
    const [company, setCompany] = useState('');

    const [contractTypesNote, setContractTypesNote] = useState('');
    const [workAddressNote, setWorklocationNote] = useState('');

    const [salary, setSalary] = useState('');
    const [salaryNote, setSalaryNote] = useState('');

    const [treatmentNote, setTreatmentNote] = useState('');
    const [jobDescription, setJobDescription] = useState('');

    const [workingHourStart, setWorkingHourStart] = useState('');
    const [workingHourEnd, setWorkingHourEnd] = useState('');
    const [workingHourNote, setWorkingHourNote] = useState('');

    const [holidayVacation, setHolidayVacation] = useState('');
    const [requiredExperience, setRequiredExperience] = useState('');
    const [welcomeSkills, setWelcomeSkills] = useState('');

    const [notices, setNotices] = useState('');


    const [contractTypes, setContractTypes] = useState([]);
    const [workAddress, setWorkAddr] = useState([]);
    const [typeIndustry, setJobTypes] = useState([]);
    const [treatments, setTreatments] = useState([]);

    const [error1, setError1] = useState('');
    const [error2, setError2] = useState('');
    const [error3, setError3] = useState('');
    const [error4, setError4] = useState('');
    const [error5, setError5] = useState('');
    const [error6, setError6] = useState('');
    const [error7, setError7] = useState('');
    const [error8, setError8] = useState('');
    const [error9, setError9] = useState('');
    const [error10, setError10] = useState('');
    const [error11, setError11] = useState('');
    const [error12, setError12] = useState('');
    const [error13, setError13] = useState('');


    const handleCheckBox = (prevState, newValue) => {
        const isCheck = prevState.includes(newValue);
        if (isCheck) {
            const newChecks = prevState.filter(check => check !== newValue);
            return newChecks;

        }
        return [...prevState, newValue]
    }

    const getCompanyName = async (userId) => {
        console.log(userId)
        const res = await axios.get('/v4/get-company', { params: { 'createdByUSer': userId } })

        console.log(res);
        console.log(res.data[0]?.companyName);
        return res.data[0]?.companyName;
    }

    const getCompany = async (token) => {
        try {
            const res = await axios.get(
                '/v4/get-company-by-user-id', {
                headers: {
                    authToken: `joinJapan ${token}`
                }
            })
            if (res.data.length === 0 || res.data === null) {
                navigate('/company');

            } else {
                setCompany(res.data);
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
        getCompany(user?.accessToken);
    }, []);

    const handleContractType = (value) => {
        setContractTypes(prevState => handleCheckBox(prevState, value));
    }

    const handleWorkAddr = (value) => {
        setWorkAddr(prevState => handleCheckBox(prevState, value));
    }

    const handleJobTypes = (value) => {
        setJobTypes(prevState => handleCheckBox(prevState, value));;
    }
    const handleTreatments = (value) => {
        setTreatments(prevState => handleCheckBox(prevState, value));
    }

    const handleGetCompanyId = id => {
        setCompanyId(prevState => handleCheckBox(prevState, id))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (companyId.length === 0) {
            setError1(showError());
            return false;
        } else {
            setError1('');
        }
        if (!preface) {
            setError2(showError());
            return false;
        } else {
            setError2('');
        }
        if (contractTypes.length === 0) {
            setError3(showError());
            return false;
        } else {
            setError3('');
        }
        if (workAddress.length === 0) {
            setError4(showError());
            return false;
        } else {
            setError4('');
        }
        if (typeIndustry.length === 0) {
            setError5(showError());
            return false;
        } else {
            setError5('');
        }
        if (!salary) {
            setError6(showError());
            return false;
        } else {
            setError6('');
        }
        if (treatments.length === 0) {
            setError7(showError());
            return false;
        } else {
            setError7('');
        }
        if (!jobDescription) {
            setError8(showError());
            return false;
        } else {
            setError8('');
        }

        if (!workingHourStart || !workingHourEnd) {
            setError9(showError());
            return false;
        } else {
            setError9('');
        }
        if (!holidayVacation) {
            setError10(showError());
            return false;
        } else {
            setError10('');
        }
        if (!requiredExperience) {
            setError11(showError());
            return false;
        } else {
            setError11('');
        }
        if (!welcomeSkills) {
            setError12(showError());
            return false;
        } else {
            setError12('');
        }
        if (!notices) {
            setError13(showError());
            return false;
        } else {
            setError13('');
        }
        const comName = await getCompanyName(user.userId);
        const newCompany = {
            preface,
            contractTypes,
            contractTypesNote,
            workAddress,
            workAddressNote,
            typeIndustry,
            salary,
            salaryNote,
            treatments,
            treatmentNote,
            jobDescription,
            workingHourStart,
            workingHourEnd,
            workingHourNote,
            holidayVacation,
            requiredExperience,
            welcomeSkills,
            notices, 
            companyName: comName,
            createdByCompany: companyId
        };
        try {
            await axios.post('v4/create-job-information', newCompany, {
                headers: { authtoken: `joinJapan ${user?.accessToken}` }
            });
            alert('create job successful.');
            navigate('/');
        } catch (error) {
            alert('system is busy at the moment. please try again later.');
            return '';
        }
    }
    const handleCancel = () => {
        navigate('/');
    }
    return (
        < div className='job' >
            <div className='d-j-1'>
                <div className='d-j-2'>
                    <div className='job-title'>
                        <span>会 社 情 報 フォーム</span>
                    </div>
                    <form onSubmit={handleSubmit} id='f-job'>
                        <div className='job-content'>
                            <div className='d-j-3'>
                                <div className='ten-congty'>
                                    <span>掲載企業名 <span>{error1}</span></span>
                                    <div className='d-j-5'>
                                        {
                                            company ? company.map(com => {
                                                return (
                                                    <label className='l-job' key={com._id}>
                                                        <input key={com._id + 'inp'}
                                                            name={com.CompanyName}
                                                            className='inp-job'
                                                            type='checkbox'
                                                            onChange={() => handleGetCompanyId(com._id)}
                                                            value={com._id}
                                                        />
                                                        <i className='i-job' key={com._id + 'i'}></i>{com.companyName}
                                                    </label>
                                                )
                                            }) : <>{ }</>
                                        }

                                    </div>
                                </div>
                                <div className='loi-tua'>
                                    <span >序文<span>{error2}</span></span>

                                    <textarea
                                        className='t-preface'
                                        onChange={e => setPreface(e.target.value)}
                                        placeholder='例えば：
                                    先進安全機能や自動運転で注目を集める自動車産業。
現在、ソフトウェアがこれらを支える中心技術となっています。
ARCは30年も前からソフトウェア開発の重要性を認識し、ソフトウェアの開発を効率化する
国産初のモデルベース開発（MBD）支援ツール「ZIPC」（ジップシー）を開発・販売してきました。
自動車産業で話題になっている自動運転や空飛ぶクルマも実現させるには最新のソフトウェア技術と開発環境（ツール）が必要です。
このような次世代システムに必要な最先端のソフトウェア研究とそれを実用化できる人材を広く募集しています。
（外国籍、留学生歓迎）'
                                    >
                                    </textarea>
                                </div>

                                <div className='hinh-thuc-tuyen-dung'>
                                    <span>雇用形態<span>{error3}</span></span>
                                    <div className='d-recruitmentForm'>
                                        {hinhthutuyendung.map(type => {
                                            return (
                                                <label className='l-job'>
                                                    <input
                                                        key={type.name}
                                                        name={type.name}
                                                        className='inp-job'
                                                        type='checkbox'
                                                        onChange={(e) => handleContractType(e.target.value)}
                                                        value={type.name}
                                                    />
                                                    <i className='i-job' ></i>{type.name}
                                                </label>
                                            )
                                        })}
                                    </div>
                                    <textarea
                                        className='t-recruitmentForm'
                                        onChange={e => setContractTypesNote(e.target.value)}
                                        placeholder='例えば：
                                    正社員（期間の定め:無）
試用期間:有 3ヶ月（試用期間中の勤務条件:変更無）'
                                    >
                                    </textarea>
                                </div>

                                <div className='noi-lam-viec'>
                                    <span>勤務地<span>{error4}</span></span>
                                    <div className='d-worklocation'>
                                        {diadiemlamviec.map(address => {
                                            return (
                                                <label className='l-job'>
                                                    <input
                                                        key={address.name}
                                                        className='inp-job'
                                                        onChange={(e) => handleWorkAddr(e.target.value)}
                                                        type='checkbox'
                                                        name={address.name}
                                                        value={address.name}
                                                    />
                                                    <i className='i-job' ></i>{address.name}
                                                </label>
                                            )
                                        })}
                                    </div>
                                    <textarea
                                        className='t-worklocation'
                                        onChange={e => setWorklocationNote(e.target.value)}
                                        placeholder='例えば：
                                    株式会社NTTデータ オートモビリジェンス研究所 本社（新横浜）
神奈川県横浜市港北区新横浜3-1-9 アリーナタワー3F
JR横浜線新横浜駅 横浜市営地下鉄ブルーライン新横浜駅
敷地内禁煙（屋内喫煙可能場所あり）'
                                    >

                                    </textarea>
                                </div>

                                <div className='nganh-nghe'>
                                    <span>業種<span>{error5}</span></span>
                                    <div className='d-industry'>
                                        {loainganhnghe.map(type=>{
                                            return (
                                                <label className='l-job'>
                                                    <input
                                                    key={type.name}
                                                        className='inp-job'
                                                        name={type.name}
                                                        type='checkbox'
                                                        onChange={(e) => handleJobTypes(e.target.value)}
                                                        value={type.name} />
                                                    <i className='i-job' ></i>{type.name}
                                                </label>
                                            )
                                        })}
                                    </div>
                                </div>

                                <div className='luong'>
                                    <span>給与<span>{error6}</span></span>
                                    <div>
                                        <label className='l-salary'>
                                            <input
                                                type='number'
                                                className='i-salary'
                                                onChange={e => setSalary(e.target.value)} /> 円
                                        </label>
                                    </div>
                                    <textarea
                                        className='t-salary'
                                        onChange={e => setSalaryNote(e.target.value)}
                                        placeholder='例えば：
                                    想定年収 450万円〜1,000万円
賞与実績:年2回支給'
                                    >
                                    </textarea>
                                </div>

                                <div className='phuc-loi'>
                                    <span >待遇・福利厚生<span>{error7}</span></span>
                                    <div>
                                        {chedo.map(type=>{
                                            return (
                                                <label className='l-job'>
                                                    <input
                                                    key={type.name}
                                                        onChange={(e) => handleTreatments(e.target.value)}
                                                        className='inp-job'
                                                        type='checkbox'
                                                        name={type.name}
                                                        value={type.name}
                                                         />
                                                    <i className='i-job' ></i>{type.name}
                                                </label>
                                            )
                                        })}
                                    </div>
                                    <textarea
                                        className='t-treatment'
                                        onChange={e => setTreatmentNote(e.target.value)}
                                        placeholder='例えば：
                                    昇給:年1回
服装自由(オフィスカジュアル)'
                                    >
                                    </textarea>
                                </div>

                                <div className='noi-dung-cong-viec'>
                                    <span>仕事内容<span>{error8}</span></span>
                                    <textarea
                                        className='t-jobDescription'
                                        onChange={e => setJobDescription(e.target.value)}
                                        placeholder='例えば：
                                    大手企業のサイト制作やアプリケーション開発においてディレクターやデザイナー、フロントエンジニアと連携しながらサーバサイドの要件定義、設計、開発業務に携わって頂きます。
HTML+CSS+JavaScript、Flash、ObjectiveC、Javaを利用したWEBサイトやスマートフォンサイト、アプリケーションなどのフロントエンドの設計・開発業務です。
実装・開発にとどまらず新たな技術を探求しながらクライアントの課題解決や自社の開発プロジェクトにもチャレンジして頂きます'
                                    ></textarea>
                                </div>

                                <div className='thoi-gian-lam-viec'>
                                    <span>勤務時間<span>{error9}</span></span>
                                    <div>
                                        <label className='l-workingHour'>
                                            <input
                                                className='i-workingHour'
                                                type='time'
                                                onChange={
                                                    e => setWorkingHourStart(e.target.value)
                                                }
                                            />から
                                        </label>
                                        <label className='l-workingHour'>
                                            <input
                                                className='i-workingHour'
                                                type='time'
                                                onChange={
                                                    e => setWorkingHourEnd(e.target.value)
                                                }
                                            />まで
                                        </label>
                                    </div>
                                    <textarea
                                        className='t-workingHour'
                                        onChange={e => setWorkingHourNote(e.target.value)}
                                        placeholder='例えば：
                                    所定労働時間 08時間00分 休憩60分
フレックスタイム制（コアタイム:有 13:00〜15:00）
残業:有
残業手当:有（残業時間に応じて別途支給）'
                                    ></textarea>
                                </div>

                                <div className='ngay-nghi-phep'>
                                    <span>休日・休暇<span>{error10}</span></span>
                                    <textarea
                                        onChange={e => setHolidayVacation(e.target.value)}
                                        className='t-holidayVacation'
                                        placeholder='例えば：
                                    年間130日以上
（内訳）土曜 日曜 祝日 夏期5日 年末年始5日 その他（創立記念日11/14）
有給休暇
入社半年経過時点10日 / 最高付与日数20日
有休取得率は高く大型連休を作りやすい'>
                                    </textarea>
                                </div>

                                <div className='nang-luc-ung-tuyen'>
                                    <span>必要な経験・能力<span>{error11}</span></span>
                                    <textarea
                                        className='t-requiredExperience'
                                        onChange={e => setRequiredExperience(e.target.value)}
                                        placeholder='例えば：
                                    必須
【1】,【2】いずれかのご経験をお持ちの方
1】プログラミングスキル:JavaScript、TypeScript、Python、C、C++、C#、Java等
2】モデリングスキル:UML、SysML、状態遷移、数理解析（MATLAB/simulink等）
歓迎
● 業界スキル: MBD、MBSEに関するスキル、AI、ディープラーニング、機械学習のご経験
● 語学力: TOEIC650点以上もしくは同等の英語力
学歴
● 大学 大学院'
                                    ></textarea>
                                </div>

                                <div className='ky-nang-can-thiet'>
                                    <span>歓迎スキル<span>{error12}</span></span>
                                    <textarea
                                        className='t-welcomeSkills'
                                        onChange={e => setWelcomeSkills(e.target.value)}
                                        placeholder='例えば：
                                    【必須スキル】
★レガシー業界を変える開発にワクワク出来る方
★静的型付け言語での経験 (個人開発含む)
★GitHub等でのプルリク文化のある組織での経験

【歓迎スキル】
★TypeScript / React を用いた開発経験
★Node.js による Web サービス開発・運用経験
★クラウド (AWS)周りの知識が豊富な方
★スタートアップなどのスピード感のある環境での業務経験'
                                    ></textarea>
                                </div>

                                <div className='notices'>
                                    <span>特記事項<span>{error13}</span></span>
                                    <textarea
                                        className='t-notices'
                                        onChange={e => setNotices(e.target.value)}
                                        placeholder='例えば：
                                    選考プロセス
STEP1
応募フォームによる
書類選考
STEP2
.
.
STEP4
通知
状況に応じて複数回面接をお願いする場合もありますのでご了承下さい。
選考においてはなるべくスピーディーに行います。
面接日等は考慮しますのでご相談ください。'
                                    ></textarea>
                                </div>

                                <div className='complete'>
                                    <span className='s-complete'>以上</span>
                                </div>
                            </div>

                            <div className='btn-submit'>
                                <button type='submit' className='btn btn-2 btn-2a'>送り</button>
                            </div>
                        </div>
                    </form>
                    <div className='d-cancel'>
                        <label onClick={handleCancel}>
                            <Link to='/home'>
                                <FontAwesomeIcon icon={faBackward} />
                                &nbsp; キャンセル
                            </Link>
                        </label>
                    </div>
                </div >
            </div>
        </div >
    )
}
export default Company;