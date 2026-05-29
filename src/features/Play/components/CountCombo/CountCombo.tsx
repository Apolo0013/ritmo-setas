import { gameState } from '../../store/game.store'
import './CountCombo.scss'

function CountCombo() {
    //currentComboSequence vai muddar de valor, e mudando ele vai atualizar a key e depois desmontar esse componente, e vai montar outro com valor diferente.
    const currentComboSequence = gameState(state => state.currentComboSequence)
    
    return (    
        <div
            key={currentComboSequence}
            className={`count-combo count-combo-up`}
        >
            <h1>{currentComboSequence}X</h1>
        </div>
    )
}

export default CountCombo