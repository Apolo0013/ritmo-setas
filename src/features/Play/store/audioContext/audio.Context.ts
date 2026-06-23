import { createContext, type RefObject } from "react"
export type AudioContextValues = {
    playAudio: () => Promise<void> | undefined,
    pauseAudio: () => void,
    refAudio: RefObject<HTMLAudioElement | null>,
    //lista de callbacks do event TimeUpdate
    setListCbTimeUpdate: (cb: () => void) => void ,
    listCbTimeUpdate: Array<() => void>,
    //lista de callbacks do evento 
    setListCbEndAudio: (cb: () => void) => void,
    listCbEnd: Array<() => void>
}

export const AudioContext = createContext < AudioContextValues |  null>(null)