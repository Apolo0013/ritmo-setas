import { useAudio } from "./useAudio"
import AudioTeste from '../../Page/Slipknot - The Blister Exists (Audio) - Slipknot (youtube).mp3'

function AudioPlayer() {
    const {
        refAudio,
        listCbTimeUpdate
    } = useAudio()!
    return (
        <>
            <audio
                className='audio-game'
                muted
                ref={refAudio}
                src={AudioTeste}

                onTimeUpdate={() => {
                    console.log(listCbTimeUpdate)
                    listCbTimeUpdate.forEach((cb) => {cb()})
                }}
            ></audio>
        </>
    )
}

export default AudioPlayer