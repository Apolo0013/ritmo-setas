
import {
    useRef,
    useState,
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
    //listas do callback
    //evento timeupdate
    const [listCbTimeUpdate, setListCbTimeUpdate] = useState<Array<() => void>>([])
    //evento ended
    const [listCbEnd, setListCbEnd] = useState<Array<() => void>>([])

    return (
        <AudioContext.Provider
            value={{
                pauseAudio,
                playAudio,
                refAudio,
                setListCbTimeUpdate: (cb) => {
                    setListCbTimeUpdate(prev => ([...prev, cb]))
                },
                listCbTimeUpdate: listCbTimeUpdate,
                listCbEnd: listCbEnd,
                setListCbEndAudio: (cb) => {
                    setListCbEnd(prev => ([...prev, cb]))
                }
            }}
        >
            {children}
        </AudioContext.Provider>
    )
}

export default AudioProvider

