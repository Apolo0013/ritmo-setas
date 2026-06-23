
import { useEffect } from "react"
import { useAudio } from "../store/audioContext/useAudio"
import { gameResultState } from "../store/gameResult.store"

function useGameResult() {
    function RegisterCBEventEned() {
        if (!refAudio.current) return
        setListCbEndAudio(() => setIsShow(true))
    }
    //store
    const setIsShow = gameResultState(state => state.setIsShow)
    const { setListCbEndAudio, refAudio } = useAudio()!
    useEffect(() => {
        RegisterCBEventEned() // registrando.
    }, [])
    return {
        
    }
}

export default useGameResult