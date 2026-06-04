import { createContext, type RefObject } from "react"
export type AudioContextValues = {
    playAudio: () => Promise<void> | undefined,
    pauseAudio: () => void,
    refAudio: RefObject<HTMLAudioElement | null>,
    setListCbTimeUpdate: (cb: () => void) => void ,
    listCbTimeUpdate: Array<() => void>
}

export const AudioContext = createContext < AudioContextValues |  null>(null)