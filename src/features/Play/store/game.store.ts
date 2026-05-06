import { create } from "zustand";
import type { GameState, ParamTotalIncrease, ParamAnimationCounter} from "./type";


function TotalIncrease({increase, targetValue}: ParamTotalIncrease): number {
    return targetValue / increase
}

function AnimationCounter({ set, get }: ParamAnimationCounter) {
    const increase: number = 250 // de quanto em quanto ele vai add
    //Fazer uma animacao simples de "aumento de ponto."
    let i: number = 0
    const maxIncremente: number = TotalIncrease({
        increase,
        targetValue: get().score
    })
    console.log(maxIncremente)
    const timer = setInterval(() => {
        set(prev => ({
            scoreView: prev.scoreView + 250
        }))
        // index add +1 valor. indicando cada incrementacao do looop
        i++
        if (i == maxIncremente) clearInterval(timer)
    }, 50)
}



export const gameState = create<GameState>((set, get) => ({
    score: 0,
    scoreView: 0,
    increaseScore: (value: number = 10000) => {
        set(prev => ({
            //valor atual + valor do paramemtro recebido
            scoreView: prev.score,
            score: prev.score + value
        }))
        AnimationCounter({set, get})
    }
}))