import { useEffect, useState, type RefObject } from 'react'
//Imagem
import { imagens } from '../../../../shared/assets/index'
//css
import './KeyPlayer.scss'
//type
import type { Direction, GradeInformationEl, ParamRegisterSetValueKeyLost, Validkeys } from '../../hook/type'

type PropsKeyPlayer = {
    k: number, // chave
    angle: Direction,
    time: number,
    lane: number,
    direction: Validkeys,
    order: number,
    refNotesEl: RefObject<GradeInformationEl[]>,
    //registrar a funcao
    registerKeyLost: ({ cb, id }: ParamRegisterSetValueKeyLost) => void,
    registerRefKey: (ref: HTMLDivElement) => void
}

function KeyPlayer({
    angle,
    lane,
    time,
    direction,
    order,
    refNotesEl,
    k,
    registerRefKey,
    registerKeyLost
}: PropsKeyPlayer) {
    
    const [isLost, setIsLost] = useState<boolean>(false)
    const idEl: string = `${k} - ${direction} - ${angle}`
    useEffect(() => {
        registerKeyLost({
            cb: (value: boolean) => setIsLost(value),
            id: idEl
        })
    }, [])
    return (
        <div
            //style={{position: 'absolute',left: '70%'}}
            key={k}
            //data
            data-direction={direction}
            //dateset
            data-id={idEl} // id
            data-lost='yes' // por padrao, a key esta sujeito como perdida.
            className="wraper-key-move"
            //aqui vamos "recriar" a lista gerada mais com elemento incluso nele            
            ref={ref => {
                    if (!ref) return
                    //registrando a referencia.
                    registerRefKey(ref)
                    //Verifique esse refNotesEl
                    refNotesEl.current.push({
                        angle: angle,
                        direction: direction,
                        el: ref,
                        lane: lane,
                        order: order,
                        time: time
                    })
                }}
        >
            <div
                className='key-move'
                //direcao
                style={{transform: `rotate(${angle})`}}
            >
                <img
                    
                    src={imagens.arrow}
                    alt="Imagem de um ceta"
                />
            </div>
            { 
                isLost
                    ?
                        <div className="key-lost">
                            <div></div>
                            <div></div>                    
                        </div>
                    : null
            }
        </div>
    )
}

export default KeyPlayer