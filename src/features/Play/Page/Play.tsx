import CountDown from '../components/Countdown/Countdown'
import Header from '../components/Header/Header'
import HitZone from '../components/HitZone/HitZone'
import MenuPlay from '../components/MenuPlay/index'
import ShowKeys from '../components/ShowKeys/ShowKeys'
import AudioProvider from '../store/audioContext/audio.Provider'
import AudioPlayer from '../store/audioContext/AudioPlayer'
//store
import { countDownState } from '../store/countDown.store'
import { menuPlayState } from '../store/menuPlay.store'
//scss
import './Play.scss'


function Play() {
    const isShow: boolean = menuPlayState(state => state.isShow)
    const isPause = menuPlayState(state => state.isPause)
    const isCount: boolean = countDownState(state => state.isCount)
    return (
        <main className='play'>
            <AudioProvider>    
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
                <ShowKeys />
                <HitZone />
            </AudioProvider>
        </main>
    )
}

export default Play