import './Register.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { registerUser } from '../../Redux/apiRequest';

const Register = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [errEmail, setErrEmail] = useState('');
    const [errPassword, setErrPassword] = useState('');
    const [errConfPassword, setErrConfPassword] = useState('');
    const [errPhone, setErrPhone] = useState('');
    // const [errServer, setErrServer] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        const filterEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        const filterPassword = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/;
        const filterPhone = /((09|03|07|08|05)+([0-9]{8})\b)/;
        if (!filterEmail.test(email)) {
            setErrEmail('email khong hop le');
            return false;
        } else {
            setErrEmail('');
        }

        if (!filterPassword.test(password)) {
            setErrPassword('pass khong hop le');
            return false;
        } else {
            setErrPassword('');
        }

        if (password !== confirmPassword) {
            setErrConfPassword('pass khong giong nhau');
            return false;
        } else {
            setErrConfPassword('');
        }
        if (!filterPhone.test(phone)) {
            setErrPhone('sdt khong hop le');
            return false;
        } else {
            setErrPhone('');
        }
        const newUser = {
            email: email,
            password: password,
            phone: phone
        }
        registerUser(newUser, navigate);
        // try {
        //     await axios.post('http://localhost:8000/v1/auth/register-user', newUser);
        //     navigate('/login');

        // } catch (error) {
        //     if (error.response.request.status === 399) {
        //         setErrPhone(error.response.data.message);
        //         return false;
        //     }
        //     if (error.response.request.status === 398) {
        //         setErrEmail(error.response.data.message);
        //         return false;
        //     }

        // }

    }
    return (
        <div className='reg-container'>
            <form onSubmit={handleSubmit}>
                <div className='reg-signUp'>
                    <span className='reg-s-title'>新 登 録</span>
                    <div className='reg-d-child'>
                        <span className='reg-s-title-child'>メールアドレス :</span>
                        <div>
                            <input
                                type='email'
                                onChange={e => setEmail(e.target.value)}
                                className='reg-i-username'
                                placeholder='例：example2022@joinjapan.com'
                                required
                            />
                        </div>
                        <span id='err' className='err'>{errEmail}</span>

                    </div>
                    <div className='reg-d-child'>
                        <span className='reg-s-title-child'>パスワード :</span>
                        <div>
                            <input
                                type='password'
                                onChange={e => setPassword(e.target.value)}
                                className='reg-i-pass'
                                placeholder='パスワードを入力して下さい。'
                                required
                            />
                        </div>
                        <span id='err' className='err'>{errPassword}</span>

                    </div>
                    <div className='reg-d-child'>
                        <span className='reg-s-title-child'>パスワード の 確認 :</span>
                        <div>
                            <input
                                type='password'
                                onChange={e => setConfirmPassword(e.target.value)}
                                className='reg-i-confirmPass'
                                placeholder='パスワードの確認を入力して下さい。'
                                required
                            />
                        </div>
                        <span id='err' className='err'>{errConfPassword}</span>
                    </div>

                    <div className='reg-d-child'>
                        <span className='reg-s-title-child'>携帯電話 :</span>
                        <div>
                            <input
                                type='number'
                                onChange={e => setPhone(e.target.value)}
                                className='reg-i-phone'
                                placeholder='例：090 321 5678'
                                required
                            />
                        </div>
                        <span id='err' className='err'>{errPhone}</span>
                    </div>
                    {/* <span>{errServer}</span> */}
                    <div className='d-btn'>
                        <button className='reg-btn'>登 録</button>
                    </div>
                </div>
            </form>

        </div>
    )
}
export default Register;