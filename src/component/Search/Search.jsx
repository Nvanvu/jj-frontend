import './Search.css';

const Search = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className='search'>
                <div >
                    <span>キーワード</span>
                    <input type="text" placeholder='職種、キーワード、会社名など' />
                </div>
                <div>
                    <span>勤務地</span>
                    <input type="text" placeholder='都道府県、市区町村、駅名' />
                </div>

                <button className='btn-search'>求人検索</button>
            </div>
        </form>
    )
}
export default Search;