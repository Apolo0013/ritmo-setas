//Componentes
import HeaderLogo from '../../../../shared/UI/HeaderLogo/HeaderLogo'
//css
import './Header.scss'
//store
import { gameState } from '../../store/game.store'
import { menuPlayState } from '../../store/menuPlay.store'
//imagens
import PauseImg from '../../assets/pause-default.svg'
import { useAudio } from '../../store/audioContext/useAudio'


function Header() {
    const valueCurrentScore: number = gameState(state => state.scoreView) 
    const valueCurrentCombo: number = gameState(state => state.combo)
    const {pauseAudio} = useAudio()!
    //store
    const setIsShow = menuPlayState(state => state.setIsShow)
    const setIsPause = menuPlayState(state => state.setIsPause)
    return (    
        <header className='wraper-play-header'>
            <div className='play-header'>
                <HeaderLogo />
                <div className='play-header-info'>
                    <h2>Score: <strong>{valueCurrentScore}</strong></h2>
                    <h2>Combo: <strong>{valueCurrentCombo}</strong></h2>
                </div>
            </div>
            <button
                className='btn-pause'
                onClick={() => {
                    setIsPause(true) // ele estarar true, mas vamos garantir esse valor nele
                    setIsShow(true) // mostrar a UI
                    pauseAudio() // pausa o audio.
                }}
            >
                <img
                    src={PauseImg}
                    alt='Imagem de pause'
                />
            </button>
        </header>
    )
}

export default Header