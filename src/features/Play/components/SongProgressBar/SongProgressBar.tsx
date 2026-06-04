
import './SongProgressBar.scss'
import useSongProgressBar from '../../hook/useSongProgressBar'
type PropsSongProgressBar = {
    width: string
}

function SongProgressBar({ width = '1%' }: PropsSongProgressBar) {
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
                    style={{width: percentage + '%'}}
                ></div>
            </div>
            <div className='song-time'>
                <p>{currentTime} / {durationSong}</p>
            </div>
        </div>
    )
}

export default SongProgressBar