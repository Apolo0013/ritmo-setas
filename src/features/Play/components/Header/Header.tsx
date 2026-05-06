//Componentes
import HeaderLogo from '../../../../shared/UI/HeaderLogo/HeaderLogo'
//css
import './Header.scss'
//store
import {gameState} from '../../store/game.store'


function Header() {
    const valueCurrentScore: number = gameState(state => state.scoreView)

    return (    
        <header className='play-header'>
            <HeaderLogo />
            <div className='play-header-info'>
                <h2>Score: <strong>{valueCurrentScore}</strong></h2>
                <h2>Combo: <strong>0</strong></h2>
            </div>
        </header>
    )
}

export default Header