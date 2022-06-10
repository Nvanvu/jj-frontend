import './Search.css';
import { useEffect, useState } from 'react';
import request from '../../Api/request';
const Search = () => {
    const [postData, setPostData] = useState({
        status: 'idle',
        data: []
    });
    const [workAddress, setWorkAddress] = useState('');
    const [keyword, setKeyword] = useState('');
    const fetchPosts = async (workAddress, keyword) => {
        try {
            setPostData((preState) => ({
                ...preState, status: 'loading'
            }));
            const res = await request.get('/v4/sreach/jobs', {
                params: {
                    "workAddress": workAddress,
                    "keyword": keyword,
                }
            });
            if (res.success) {
                setPostData({
                    status: 'success',
                    data: res.data
                });

            } else {
                setPostData((preState) => ({
                    ...preState, status: 'error'
                }));
            }
        } catch (error) {
            setPostData((preState) => ({ ...preState, status: 'error' }))
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchPosts(workAddress, keyword);

    }
    return (<>
        <form onSubmit={handleSubmit}>
            <div className='search'>
                <div >
                    <span>キーワード</span>
                    <input onChange={e => setKeyword(e.target.value)} type="text" placeholder='職種、キーワード、会社名など' />
                </div>
                <div>
                    <span>勤務地</span>
                    <input onChange={e => setWorkAddress(e.target.value)} type="text" placeholder='都道府県、市区町村、駅名' />
                </div>

                <button className='btn-search'>求人検索</button>
            </div>
        </form>

        <div className='job-list-container'>
            <div className='job-list-content'>

                {postData?.data.map(post => (
                    <div key={post._id} className='job-list-1'>
                        <span className='job-list-2'>{post.companyName}</span>
                        <div>
                            <div className='job-list-3'>
                                <label>
                                    <span>雇用形態 :</span> &nbsp;&nbsp;
                                    {post.contractTypes.map(a => (
                                        <span key={a}>{a} &nbsp; &nbsp;</span>
                                    ))}
                                </label>
                                <label>
                                    <span>勤務地 :</span> &nbsp;&nbsp;
                                    {post.workAddress.map(a => (
                                        <span key={a}>{a}&nbsp;&nbsp;</span>
                                    ))
                                    }
                                </label>
                                <label>
                                    <span>業種 :</span> &nbsp;&nbsp;
                                    {post.typeIndustry.map(a => (
                                        <span key={a}>{a}&nbsp;&nbsp;</span>
                                    ))
                                    }
                                </label>
                                <label>
                                    <span>給料 :</span> &nbsp;&nbsp;
                                    {post.salary}&nbsp;円
                                </label>
                            </div>
                            <br />
                            <div className='job-list-4'>
                                {post.preface}
                            </div>
                        </div>

                    </div>
                ))}

            </div>
        </div>
    </>

    )
}
export default Search;