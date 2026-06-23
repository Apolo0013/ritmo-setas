
import './SongProgressBar.scss'
import useSongProgressBar from '../../hook/useSongProgressBar'

function SongProgressBar() {
    const {
        percentage,
        currentTime,
        durationSong
    } = useSongProgressBar()
    return (
        <div className="wraper-song-progress-bar">
            <div className='song-bar'>
                <div
                    className='song-progress'
                    style={{
                        width: '50%' ///percentage + '%'
                    }}
                ></div>
            </div>
            <div className='song-time'>
                <p>{currentTime}</p>
                <p>/</p>
                <p>{durationSong}</p>
            </div>
        </div>
    )
}

export default SongProgressBar