
import {
    useRef,
    type ReactNode,
} from 'react'

import {AudioContext} from './audio.Context'


function AudioProvider({children}: {children: ReactNode}) {
    function playAudio() {
        if (!refAudio.current) return
        return refAudio.current?.play()
    }

    function pauseAudio() {
        if (!refAudio.current) return
        refAudio.current.pause()
    }

    const refAudio = useRef<HTMLAudioElement | null>(null)

    return (
        <AudioContext.Provider
            value={{
                pauseAudio,
                playAudio,
                refAudio
            }}
        >
            {children}
        </AudioContext.Provider>
    )
}

export default AudioProvider

