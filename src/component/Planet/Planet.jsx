import './Planet.css';

const Planet = () => {

    return (
        <div id='galaxy'>
            <div>
                <div className="circ">
                    <div className="load">Loading . . .</div>
                </div>
            </div>
            <div className='galaxy'>
                <div className='galaxy-1'></div>
                <div className='galaxy-2'></div>
                <div className='galaxy-3'></div>
            </div>
        </div >
    )
}
export default Planet;