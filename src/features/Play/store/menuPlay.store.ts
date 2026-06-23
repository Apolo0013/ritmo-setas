import { create } from "zustand";

type MenuPlayState = {
    isShow: boolean,
    setIsShow: (value: boolean) => void,
    isPause: boolean, // ele ja inicio (apertou o botao de comeca a jogatina)
    setIsPause: (value: boolean) => void
}

export const menuPlayState = create<MenuPlayState>((set) => ({
    // responsavel por mostrar o menu play
    isShow: true,
    setIsShow: (value: boolean) => set({
        isShow: value
    }),
    // responsavel por dizer oq exbir, start ou stop
    isPause: false,
    // false: nao esta pausado
    // true: esta pausado
    setIsPause: (value: boolean) => set({
        isPause: value
    })
}))