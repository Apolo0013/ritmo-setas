import { useEffect, useRef, useState, type RefObject } from 'react'
//Type
import {type ParamCheckCombo, type ParamHandlerKeyDown, validKey, type Validkeys } from './type'
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


    //Funcao responsavel por menipular combo e etc.
    function CheckCombo({ situation }: ParamCheckCombo) {
        const currentCombo = gameState.getState().combo
        console.log(currentCombo)
        if (situation == 'win') {
            currentComboTemp.current += 1
            if (currentComboTemp.current > currentCombo) setCombo(currentComboTemp.current)
        }
        else {
            if (currentCombo < currentComboTemp.current) {
                console.warn("Add")
                setCombo(currentComboTemp.current)
            }
            currentComboTemp.current = 0
        }
        
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
        if (keyCode == keyData) { // acertou
            CheckCombo({situation: 'win'})
            setScore()
            elTarget.classList.add('key-move-certificate')
        }
        else {
            CheckCombo({situation: 'loser'})
            elTarget.classList.add('key-move-wrong') // errou
        }
        console.log(keyCode == keyData ? 'Acertou' : 'errou')
    }
    
    //state
    //state que irar guardar
    const [_, setlistOfKeysClicked] = useState<string[]>([])
    //Store.
    //Pegar o "alterado" de score
    const setScore = gameState(state => state.increaseScore)
    const setCombo = gameState(state => state.setCombo)

    //Responsavel por guardar combo
    const currentComboTemp = useRef<number>(1)
    useEffect(() => {
        //CheckCombo({situation: 'loser'})
        //setInterval(() => setScore(), 5000)
    }, [])
    return {
        HandlerKeyDown,
    }
}

export default useHitZone