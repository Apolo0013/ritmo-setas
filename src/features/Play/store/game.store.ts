import { create } from "zustand";
import type { GameState, ParamAnimationCounter} from "./type";

function AnimationCounter({ set, get }: ParamAnimationCounter) {
    const increase: number = 250 // de quanto em quanto ele vai add
    const timer = setInterval(() => {
        set(prev => ({
            scoreView: prev.scoreView + increase
        }))
        //console.log(get().score)
        // index add +1 valor. indicando cada incrementacao do looop
        
        if (get().scoreView >= get().score) {
            set(prev => ({
                scoreView: prev.score
            }))
            clearInterval(timer)
            return
        }
    }, 50)
}

export const gameState = create<GameState>((set, get) => ({
    combo: 2,
    currentComboSequence: 0, // no caso é a sequencia que ele esta
    setCurrentComboSequence: (value: number) => set({currentComboSequence: value}),
    setCombo: (value: number) => set({ combo: value }),
    score: 0,
    scoreView: 0,
    increaseScore: (value: number = 10000) => {
        set(prev => ({
            //valor atual + valor do paramemtro recebido
            scoreView: prev.score,
            score: prev.score + value
        }))
        AnimationCounter({ set, get })
    }
}))