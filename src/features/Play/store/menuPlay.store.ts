import { create } from "zustand";

type MenuPlayState = {
    isBegin: boolean, // ele ja inicio (apertou o botao de comeca a jogatina)
}

export const menuPlayState = create<MenuPlayState>(() => ({
    isBegin: true
}))