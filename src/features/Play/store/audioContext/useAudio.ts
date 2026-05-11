import { useContext } from 'react'
import {AudioContext} from './audio.Context'

export function useAudio() {
    if (!AudioContext) console.log("Context Ainda nao criado.")
    return useContext(AudioContext)
}