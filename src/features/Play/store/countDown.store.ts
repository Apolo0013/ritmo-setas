import { create } from "zustand"

type CountDownState = {
    isCount: boolean,
    setIsCount: (value: boolean) => void,
    TimeOutCount: (playAudio:  () => Promise<void> | undefined) => void
}


export const countDownState = create<CountDownState>((set) => ({
    isCount: false,
    setIsCount: (value: boolean) => set({ isCount: value }),
    TimeOutCount: () => { // funcao ja pronta com time, ele vai exbir a o componente por 5s, oq tempo que o componente faz a animacao.
        //! - O audio vai da play por fora.
        set({isCount: true}) // mostrar
        setTimeout(async () => {
            //retirar o componentes da tela
            set({ isCount: false })
            //da play na musica 
            //await playAudio()
        }, 3000)
    }
})) 