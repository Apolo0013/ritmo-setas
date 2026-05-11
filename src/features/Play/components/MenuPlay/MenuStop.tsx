import './MenuPlay.scss'
///imagens
import ImgPause from '../../assets/pause.svg'
import ImgPlay from '../../../../shared/assets/play.svg'
import ImgHome from '../../assets/home.svg'

function MenuStop() {
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
                <button className='menu-play-btn menu-play-btn-primary'>
                    <img
                        src={ImgPlay}
                        alt="Imagem de play"
                    />
                    <p>Continuar</p>
                </button>
                <button className='menu-play-btn menu-play-btn-secondary'>
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