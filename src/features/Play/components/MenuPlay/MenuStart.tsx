//css
import './MenuPlay.scss'
//imagens
import ImgPlay from '../../../../shared/assets/play.svg'
//context
import { useAudio } from '../../store/audioContext/useAudio'


function MenuStart() {
    //context
    const context = useAudio()!
    return (
        <div className='menu-start'>
            <h1 className='titulo-game'>Setas Ritmo</h1>
            <p>Para começar, clique no botão abaixo e inicie a música.</p>
            <button
                className="menu-play-btn menu-play-btn-primary"
                onClick={() => {
                    if (!context) return
                    context.playAudio()
                }}
            >
                <img
                    src={ImgPlay}
                    alt="Imagem de uma play"
                />
                <p>Começar</p>
            </button>
        </div>
    )
}

export default MenuStart