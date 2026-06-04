import CountCombo from '../components/CountCombo/CountCombo'
import CountDown from '../components/Countdown/Countdown'
import Header from '../components/Header/Header'
import HitZone from '../components/HitZone/HitZone'
import MenuPlay from '../components/MenuPlay/index'
import ShowKeys from '../components/ShowKeys/ShowKeys'
import SongProgressBar from '../components/SongProgressBar/SongProgressBar'
import AudioProvider from '../store/audioContext/audio.Provider'
import AudioPlayer from '../store/audioContext/AudioPlayer'
//store
import { countDownState } from '../store/countDown.store'
import { gameState } from '../store/game.store'
import { menuPlayState } from '../store/menuPlay.store'
//scss
import './Play.scss'


function Play() {
    const isShow: boolean = menuPlayState(state => state.isShow)
    const isPause: boolean = menuPlayState(state => state.isPause)
    const isCount: boolean = countDownState(state => state.isCount)
    const currentCombo: number = gameState(state => state.currentComboSequence)
    return (
        <main className='play'>
            <AudioProvider>    
                {
                    currentCombo > 0
                        ? <CountCombo />
                        : null
                }
                <AudioPlayer />
                { 
                    isCount && isPause
                        ? <CountDown />
                        : null
                }
                { 
                    isShow
                        ? <MenuPlay />
                        : null
                }
                <Header />
                <SongProgressBar />
                <ShowKeys />
                <HitZone />
            </AudioProvider>
        </main>
    )
}

export default Play