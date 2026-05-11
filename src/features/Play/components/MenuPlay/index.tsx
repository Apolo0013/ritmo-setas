import './MenuPlay.scss'
//context e store
import { menuPlayState } from '../../store/menuPlay.store'
import MenuStart from './MenuStart'
import MenuStop from './MenuStop'

function MenuPlay() {
    //store
    const isBegin: boolean = menuPlayState(state => state.isBegin)


    return (
        <div className='wraper-menu-play'>
            <div className="menu-play">
                {
                    !isBegin 
                        ? <MenuStart />
                        : <MenuStop />
                }
            </div>
        </div>
    )
}

export default MenuPlay