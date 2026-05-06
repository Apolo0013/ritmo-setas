import { useState, type RefObject } from 'react'
//Type
import {type ParamHandlerKeyDown, validKey } from './type'
//Store
import { gameState } from '../store/game.store'


type ParamuseHitZone = {
    refDetector: RefObject<HTMLDivElement | null>,
    refParent: RefObject<HTMLDivElement | null>
}

function useHitZone({
    refDetector,
    refParent
}: ParamuseHitZone) {
    function keyAlreadyCliked(el: HTMLElement): boolean {
        //true: essa tecla ja foi clicada ou algo deu errado
        //el: é o elemento que representa a ceta
        const idData: string | undefined = el.dataset.id
        if (!idData) return true
        //resultado do adicao do id
        let resultAddId: boolean = false

        setlistOfKeysClicked(prev => {
            if (prev.includes(idData)) {
                resultAddId = true
                return prev
            }
            resultAddId = false
            return [...prev, idData]
        })
        return resultAddId
    }

    function HandlerKeyDown({ e }: ParamHandlerKeyDown) {
        //se ele for false nao passa
        if (!refDetector.current || !refParent.current) return
        const rectDetector: DOMRect = refDetector.current.getBoundingClientRect()
        const centroX: number = rectDetector.left + rectDetector.width / 2
        //children seria o as cetas.
        const children = [...refParent.current.children] as HTMLElement[]
        //key que foi "clicada"
        let elTarget: HTMLElement | null = null
        for (const el of children) {
            const rectE: DOMRect = el.getBoundingClientRect()
            const colidiu: boolean =
                centroX <= rectE.right &&
                centroX >= rectE.left
            
            if (colidiu) {
                elTarget = el
                break
            }
        }
        //caso ele for nulo que dizer que nenhum key foi clicado
        if (!elTarget) return
        //essa key ja foi "clicado"
        const keyAlready = keyAlreadyCliked(elTarget)
        if (keyAlready) return // se sim apenas vamos ignora.
        //aqui temos a tecla, que foi "clicada".
        const keyCodeStr: string = e.code
        //caso a tecla nao seja valido, apenas as cetas sao permitadas
        if (!validKey.includes(keyCodeStr as Validkeys)) return // caso a tecla clicada nao seja valida
        const keyCode = keyCodeStr as Validkeys
        //pegando a direcao da key que ele "clicou"
        const keyDataStr: string | undefined = elTarget.dataset.direction
        if (!keyDataStr) return //caso nao nao tenha.
        const keyData = keyDataStr as Validkeys
        //Agora temos as direcao que dois.     
        //!-
        if (keyCode == keyData) {
            setScore()
            elTarget.classList.add('key-move-certificate')
        }
        else elTarget.classList.add('key-move-wrong')
        console.log(keyCode == keyData ? 'Acertou' : 'errou')
    }
    //state
    //state que irar guardar
    const [_, setlistOfKeysClicked] = useState<string[]>([])
    //Store.
    //Pegar o "alterado" de score
    const setScore = gameState(state => state.increaseScore)
    return {
        HandlerKeyDown
    }
}

export default useHitZone