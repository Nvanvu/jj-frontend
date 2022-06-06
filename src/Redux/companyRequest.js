import requset from '../Api/request';

export const createJob = async(newJob, token, navigate) => {
    try {
        await requset({
            url: 'v4/create-job-information',
            method: 'POST',
            headers: { authToken: `joinjapan ${token}` }
        })
        navigate('/');
    } catch (error) {
        alert('create job filed. ', error)
    }
}