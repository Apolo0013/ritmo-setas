import './GameResult.scss'
//imagens
import LoopImg from '../../assets/loop.svg'
import HomeImg from '../../assets/home.svg'
import { gameState } from '../../store/game.store'
import useGameResult from '../../hook/useGameResult'

type PropsGameResult = {
}

function GameResult() {
    const {
        combo,
        score
    } = gameState()
    //hook
    const { 
        onClickGoBackHome,
        onClickTryAgain
    } = useGameResult()

    return (
        <div className="wraper-game-result">
            <div className="game-result">
                <h1>FIM DE PARTIDA</h1>
                <div className='time-result'>
                    <p>--:--</p>
                    <p>/</p>
                    <p>--:--</p>
                </div>
                <div className='dot-board'>
                    <div className='dot-board-info'>
                        <p>SCORE</p>
                        <h1>{score}</h1>
                    </div>
                    <div className='dot-board-diviso'></div>
                    <div className="dot-board-info">
                        <p>COMBO MÁXIMO</p>
                        <h1>{combo}</h1>
                    </div>
                </div>
                <div className="game-result-buttons">
                    <button
                        className='game-result-button'
                        onClick={onClickTryAgain}
                    >
                        <img
                            src={LoopImg}
                            alt='Imagem de um loop'
                        />
                        <p>TENTAR NOVAMENTE</p>
                    </button>
                    <button
                        className='game-result-button'
                        onClick={onClickGoBackHome}
                    >
                        <img
                            src={HomeImg}
                            alt="Imagem de uma casa."
                        />
                        <p>VOLTAR AO MENU</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GameResult