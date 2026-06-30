import type { StateCreator } from "zustand"


export type GameState = {
    combo: number,
    currentComboSequence: number,
    setCurrentComboSequence: (value: number) => void,
    setCombo: (value: number) => void
    setScore: (value: number) => void
    score: number, // score real.
    increaseScore: (value?: number) => void, // a funcao que vai add esse valor
    scoreView: number, // score apenas para exbicao,
    //key do hitzone
    keyHitZone: number,
    resetKeyHitZone: () => void
}

export type ParamAnimationCounter = {
    set: Parameters<StateCreator<GameState>>[0],
    get: () => GameState
}