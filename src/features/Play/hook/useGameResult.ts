
import { useEffect } from "react"
import { useAudio } from "../store/audioContext/useAudio"
import { gameResultState } from "../store/gameResult.store"
import { gameState } from "../store/game.store"
import { menuPlayState } from "../store/menuPlay.store"

function useGameResult() {
    function fds() {
        if (!refAudio.current) return
        //refAudio.current.currentTime = refAudio.current.duration - 5

    }

    function RegisterCBEventEned() {
        if (!refAudio.current) return
        setListCbEndAudio(() => setIsShow(true))
    }

    function onClickTryAgain() {
        if (!refAudio.current) return
        //Reniciando as pontuacao
        setCombo(0)
        setScore(0)
        //Renderizacao condicionais default/padrao
        setIsPauseMenuPlay(false) // Nao estara pausado
        setIsShowMenuPlay(true) // o UI esta visivel
        //retirando a UI do gameResult.tsx
        setIsShow(false)
        //reset na musica
        refAudio.current.currentTime = 0
        //resetando o componente hitzone.tsx inteiro
        resetKeyHitZone()
    }

    function onClickGoBackHome() {

    }
    //store
    const setIsShow = gameResultState(state => state.setIsShow)
    //set das pontuacao
    const setCombo = gameState(state => state.setCombo)
    const setScore = gameState(state => state.setScore)
    //set dos state rederizacao condicionais
    const setIsPauseMenuPlay = menuPlayState(state => state.setIsPause)
    const setIsShowMenuPlay = menuPlayState(state => state.setIsShow)
    //
    const resetKeyHitZone = gameState(state => state.resetKeyHitZone)
    //
    
    const { setListCbEndAudio, refAudio } = useAudio()!
    useEffect(() => {
        RegisterCBEventEned() // registrando.
    }, [])
    return {
        onClickGoBackHome,
        onClickTryAgain,
        fds
    }
}

export default useGameResult