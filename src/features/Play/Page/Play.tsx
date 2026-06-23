import CountCombo from '../components/CountCombo/CountCombo'
import CountDown from '../components/Countdown/Countdown'
import GameResult from '../components/GameResult/GameResult'
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
import { gameResultState } from '../store/gameResult.store'
import { menuPlayState } from '../store/menuPlay.store'
//scss
import './Play.scss'


function Play() {
    const isShowMenu: boolean = menuPlayState(state => state.isShow)
    const isPause: boolean = menuPlayState(state => state.isPause)
    const isCount: boolean = countDownState(state => state.isCount)
    const currentCombo: number = gameState(state => state.currentComboSequence)
    const isShowGameResult: boolean = gameResultState(state => state.isShow)

    return (
        <main className='play'>
            <AudioProvider>    
                {/*Elemento Audio*/}
                <AudioPlayer />
                {
                    //o display da contagem de combo.
                    currentCombo > 0
                        ? <CountCombo />
                        : null
                }
                {
                    //Fim de jogo
                    isShowGameResult
                        ? <GameResult/>
                        : null
                }                
                { 
                    //Contado, é usado antes da partida
                    isCount && isPause
                        ? <CountDown />
                        : null
                }
                { 
                    //Menu Start e Stop
                    isShowMenu
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