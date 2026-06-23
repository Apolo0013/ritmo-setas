import { useAudio } from "./useAudio"
import AudioTeste from '../../Page/Slipknot - The Blister Exists (Audio) - Slipknot (youtube).mp3'

function AudioPlayer() {
    const {
        refAudio,
        listCbTimeUpdate,
        listCbEnd
    } = useAudio()!
    return (
        <>
            <audio
                className='audio-game'
                muted
                ref={refAudio}
                src={AudioTeste}

                onTimeUpdate={() => {
                    listCbTimeUpdate.forEach((cb) => {cb()})
                }}
                onEnded={() => {
                    listCbEnd.forEach(cb => {cb()})
                }}
            ></audio>
        </>
    )
}

export default AudioPlayer