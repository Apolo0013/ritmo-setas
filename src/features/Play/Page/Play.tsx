import Header from '../components/Header/Header'
import HitZone from '../components/HitZone/HitZone'
import MenuPlay from '../components/MenuPlay/index'
import ShowKeys from '../components/ShowKeys/ShowKeys'
//contexto
import AudioProvider from '../store/audioContext/audio.Provider'
import './Play.scss'

function Play() {
    return (
        <main className='play'>
            <AudioProvider>
                <MenuPlay />
                <Header />
                <ShowKeys />
                <HitZone />
            </AudioProvider>
        </main>
    )
}

export default Play