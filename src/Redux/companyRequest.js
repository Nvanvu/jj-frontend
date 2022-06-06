import requset from '../Api/request';

export const createJob = async(newJob, token, navigate) => {
    try {
        await requset({
            url: '/v4/create-job-information',
            newJob,
            method: 'POST',
            headers: { authToken: `joinjapan ${token}` }
        })
        navigate('/');
    } catch (error) {
        alert('create job filed. ', error)
    }
}

export const findCV = async(query, token) => {
    try {
        const res = await requset({
            url: '/v4/find-cv',
            method: 'POST',
            query: { query },
            headers: { authToken: `joinjapan ${token}` }
        })
        return res.data;
    } catch (error) {
        alert('System is busy at the mumount. Please try again later.');
    }
}