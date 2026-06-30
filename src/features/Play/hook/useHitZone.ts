import { useEffect, useRef, useState, type RefObject } from 'react'
//Type
import {type GradeInformationEl, type ParamCheckCombo, type ParamHandlerKeyDown, type ParamRegisterSetValueKeyLost, validKey, type Validkeys } from './type'
//Store
import { gameState } from '../store/game.store'

type ParamuseHitZone = {
    refDetector: RefObject<HTMLDivElement | null>,
    refParent: RefObject<HTMLDivElement | null>,
    refPosKey: RefObject<Record<string, number>>
}

function useHitZone({
    refDetector,
    refParent,
    refPosKey
}: ParamuseHitZone) {

    //SetValue, das Key-Lost
    function registerKeyLost({cb, id}: ParamRegisterSetValueKeyLost) {
        setValueKeyLostList.current[id] = cb
    }

    function registerRefKey(ref: HTMLDivElement) { childrenKeys.current.push(ref)}

    function loopMissingKey() {
        const timer = setInterval(() => {
            MissingKeys()
            if (!runningLoopMissingKey.current) clearInterval(timer)
        }, 250)
    }

    function MissingKeys() { // SUSPEITO
        if (!rightDetector.current) return
        for (const el of childrenKeys.current) {
            const id: string = el.dataset.id! // Confia, nao sera unfined
            if (!id) return
            const left: number = refPosKey.current[id]
            const keyLost = el.dataset.lost
            console.clear()
            console.log(left)
            console.log(rightDetector.current)
            
            if (
                left > rightDetector.current &&
                left > rightDetector.current + 50 &&
                !listOfMissingKeys.current.includes(id)
            ) { //se a key passa do detector depois de 50px
                //setValueKeyLostList: Uma Lista com uma funcao que mexe com um estado em outro componente.
                //keyLost: Essa Key foi perdida?
                if (keyLost == 'yes') setValueKeyLostList.current[id](true)
                //setlistOfMissingKeys(prev => [...prev, id])
                listOfMissingKeys.current.push(id)
            }
        }
    }


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
    function checkCombo({ situation }: ParamCheckCombo) {
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
        //aqui vamos add a sequencia que ele esta.
        //! - Ou ele tem 0 ou tem 1,2,3 ......... assim por diante.
        setCurrentComboSequence(currentComboTemp.current)
    }


    function handlerKeyDown({ e }: ParamHandlerKeyDown) {
        MissingKeys()
        //se ele for false nao passa
        if (!refDetector.current || !refParent.current) return
        const rectDetector: DOMRect = refDetector.current.getBoundingClientRect()
        const centroX: number = rectDetector.left + rectDetector.width / 2
        //key que foi "clicada"
        let elTarget: HTMLElement | null = null
        console.log(childrenKeys.current.length)
        for (const el of childrenKeys.current) {
            const rectE: DOMRect = el.getBoundingClientRect()
            const colidiu: boolean =
                centroX <= rectE.right &&
                centroX >= rectE.left
            console.warn(colidiu)
            if (colidiu) {
                elTarget = el
                break
            }
        }
        console.log(elTarget)
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
        if (keyCode == keyData) { // acertou
            checkCombo({ situation: 'win' }) // checando o combo
            setScore() // setando o pontos
            // animacao
            elTarget.classList.add('key-move-certificate')
            elTarget.dataset.lost = 'no' // key perdida??
        }
        else {
            checkCombo({ situation: 'loser' }) // checando o combo
            // animacao
            elTarget.classList.add('key-move-wrong') // errou 
        }
        console.log(keyCode == keyData ? 'Acertou' : 'errou')
    }
    //posicao direito do detector
    const rightDetector = useRef<number | null>(null)
    //state
    //state que irar guardar
    const [kc, setlistOfKeysClicked] = useState<string[]>([])
    //TROCA DO state para Ref
    //const [listOfMissingKeys, setlistOfMissingKeys] = useState<string[]>([])
    const listOfMissingKeys = useRef<string[]>([])
    //Store.
    //Pegar o "alterado" de score
    const setScore = gameState(state => state.increaseScore)
    const setCombo = gameState(state => state.setCombo)
    const setCurrentComboSequence = gameState(state => state.setCurrentComboSequence)
    //Responsavel por guardar combo
    const currentComboTemp = useRef<number>(0)
    //children seria o as cetas.
    const childrenKeys = useRef<HTMLDivElement[]>([])
    //Responsavel por controla o loop
    const runningLoopMissingKey = useRef<boolean>(true)
    //SetState dos valores key lost
    const setValueKeyLostList = useRef<{ [key: string]: (value: boolean) => void }>({})
    useEffect(() => {
        //Retirada a animacao de perdido na Key
        //loopMissingKey()
        return () => {runningLoopMissingKey.current = false}
    }, [])

    useEffect(() => {
        if (!refDetector.current) return
        const { right } = refDetector.current.getBoundingClientRect()
        rightDetector.current = right
    }, [refDetector.current])

    return {
        handlerKeyDown,
        registerKeyLost,
        registerRefKey
    }
}

export default useHitZone