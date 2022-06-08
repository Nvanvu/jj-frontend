import axios from '../Api/request';
import {
    setUserInfo
} from './authSlice';

export const LoginUser = async(user, dispatch, navigeta) => {
    try {
        const res = await axios.post('/v4/auth/login-user', user);
        dispatch(setUserInfo({
            status: 'success',
            data: res.data
        }));
        navigeta('/');
    } catch (error) {
        dispatch(setUserInfo({
            status: `error ${error}`,
            data: null
        }));
        alert('Login filed.');
    }
}

export const registerUser = async(user, navigeta) => {
    try {
        await axios.post('/v4/auth/register-user', user);
        alert('Register successful.');
        navigeta('/login');
    } catch (error) {
        alert('system is busy at the moment. Please try again later.')
    }
}

export const createCompanyName = async(companyName, token, navigeta) => {
    try {
        await axios.post('/v4/register/new-company-name', companyName, {
            headers: { authToken: `joinjapan ${token}` }
        });
        // dispatch(createCompnay(res.data));
        navigeta('/job');
    } catch (error) {
        // dispatch(createCompnayFailed());
        alert('create company name filed.');
    }
}

export const uploadFileToCloud = async(formData) => {

    try {
        await axios({
            url: "/v4/upload-file-to-cloud",
            method: "post",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" }
        });
    } catch (error) {
        console.log("Loi ", error);
    }
}

export const createUserInfo = async(newInfor, token, navigeta) => {
    try {
        await axios({
            url: "/v4/create-user-personal-information",
            method: "post",
            data: newInfor,
            headers: { authToken: `joinjapan ${token}` }
        });
        alert('successful.');
        navigeta('/');
    } catch (error) {
        console.log(error);
    }
}