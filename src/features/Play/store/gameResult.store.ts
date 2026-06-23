import { create } from "zustand";

//throw new Error("Carregou")

type GameResultState = {
    isShow: boolean,
    setIsShow: (value: boolean) => void
}

export const gameResultState = create<GameResultState>((set) => {
    console.log("gameResult.store Criado")
    return ({    
        isShow: false,
        setIsShow: (value: boolean) => set({
            isShow: value
        })
    })

})