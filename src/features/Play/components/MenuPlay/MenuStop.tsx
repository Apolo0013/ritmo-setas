import './MenuPlay.scss'
///imagens
import ImgPause from '../../assets/pause.svg'
import ImgPlay from '../../../../shared/assets/play.svg'
import ImgHome from '../../assets/home.svg'
///store e context
import { menuPlayState } from '../../store/menuPlay.store'
import { useNavigate } from 'react-router-dom'
import { useAudio } from '../../store/audioContext/useAudio'
import { countDownState } from '../../store/countDown.store'


function MenuStop() {
    const setIsShow = menuPlayState(state => state.setIsShow)
    const TimeOutCount = countDownState(state => state.TimeOutCount)
    const { playAudio } = useAudio()!
    //
    const nv = useNavigate()
    return (
        <div className="menu-stop">
            <div className="imagem-stop">
                <img
                    src={ImgPause}
                    alt="Imagem do simbolo de pause"
                />
            </div>
            <h1 className='titulo-game'>Jogo Pausado</h1>
            <p>A música foi pausada. Você pode continuar ou voltar ao menu.</p>
            <div className="conteiner-botoes-stop">
                <button
                    className='menu-play-btn menu-play-btn-primary'
                    onClick={() => {
                        setIsShow(false)
                        //
                        TimeOutCount(playAudio) // time ja pronto.
                        //3s é o tempo de animacao.
                        setTimeout(async () => await playAudio(), 3000)
                    }}
                >
                    <img
                        src={ImgPlay}
                        alt="Imagem de play"
                    />
                    <p>Continuar</p>
                </button>
                <button
                    className='menu-play-btn menu-play-btn-secondary'
                    onClick={() => {
                        nv('/home')
                    }}
                >
                    <img
                        src={ImgHome}
                        alt="Imagem de uma casa"
                    />
                    <p>Voltar ao Menu</p>
                </button>
            </div>
        </div>
    )
}

export default MenuStop