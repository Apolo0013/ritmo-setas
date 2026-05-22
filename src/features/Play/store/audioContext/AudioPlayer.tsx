import { useAudio } from "./useAudio"
import AudioTeste from '../../Page/Slipknot - The Blister Exists (Audio) - Slipknot (youtube).mp3'

function AudioPlayer() {
    const {refAudio} = useAudio()!
    return (
        <>
            <audio
                className='audio-game'
                muted
                ref={refAudio}
                src={AudioTeste}
            ></audio>
        </>
    )
}

export default AudioPlayer