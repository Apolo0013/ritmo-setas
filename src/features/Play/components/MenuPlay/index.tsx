import './MenuPlay.scss'
//context e store
import { menuPlayState } from '../../store/menuPlay.store'
import MenuStart from './MenuStart'
import MenuStop from './MenuStop'

function MenuPlay() {
    //store
    const isPause: boolean = menuPlayState(state => state.isPause)
    return (
        <div className='wraper-menu-play'>
            <div className="menu-play">
                {
                    !isPause
                        ? <MenuStart />
                        : <MenuStop />
                }
            </div>
        </div>
    )
}

export default MenuPlay