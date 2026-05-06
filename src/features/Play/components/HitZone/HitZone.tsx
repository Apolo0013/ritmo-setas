import './HitZone.scss'
//imagens
import { imagens } from '../../../../shared/assets/index'
import AudioTeste from './Slipknot - The Blister Exists (Audio) - Slipknot (youtube).mp3'
//Hook
import useHitZone from '../../hook/useHitZone'
import { useEffect, useRef } from 'react'
//services
import { addCallBackKeyDown } from '../../../../shared/services/keydownManager'
import type { keyInfo } from '../../hook/type'
import useGame from '../../hook/useGame'

function HitZone() {

    //const keyList = [{ 'key': 'ArrowDown', 'direction': '180deg' }, { 'key': 'ArrowRight', 'direction': '90deg' }, { 'key': 'ArrowLeft', 'direction': '270deg' }, { 'key': 'ArrowUp', 'direction': '0deg' }, { 'key': 'ArrowLeft', 'direction': '270deg' }, { 'key': 'ArrowDown', 'direction': '180deg' }, { 'key': 'ArrowRight', 'direction': '90deg' }, { 'key': 'ArrowLeft', 'direction': '270deg' }, { 'key': 'ArrowRight', 'direction': '90deg' }, { 'key': 'ArrowRight', 'direction': '90deg' }] satisfies keyInfo[]
    //ref
    const refDetector = useRef<HTMLDivElement | null>(null)
    const refParent = useRef<HTMLDivElement | null>(null)
    const refAudio = useRef<HTMLAudioElement | null>(null)
    //hook
    const {
        HandlerKeyDown
    } = useHitZone({
        refDetector, 
        refParent
    })
    //hook principal, onde ele vai move as keys/setas
    const {
        notes,
        refNotesEl
    } = useGame({
        refDetector,
        refParent,
        refAudio
    })

    //use Effect
    useEffect(() => {
        addCallBackKeyDown((e) => HandlerKeyDown({
            e
        }))
    }, [])
    return (
        <div className='play-hitzone'>
            <audio
                className='audio-game'
                ref={refAudio}
                src={AudioTeste}
                controls
            ></audio>

            <div
                className="detector"
                ref={refDetector}
            ></div>
            <div
                className="wraper-keys-move"
                ref={refParent}
            >
                {
                    notes ?
                        notes.map(({ direction, angle, lane, order, time}, k) => (
                            <div
                                //aqui vamos "recriar" a lista gerada mais com elemento incluso nele
                                ref={ref => {
                                    if (!ref) return
                                    refNotesEl.current.push({
                                        angle: angle,
                                        direction: direction,
                                        el: ref,
                                        lane: lane,
                                        order: order,
                                        time: time
                                    })
                                    console.log(refNotesEl.current.map(x => x.el.dataset.direction))
                                }}
                                
                                //
                                className='key-move'
                                key={k}
                                //data
                                data-direction={direction}
                                //id dele
                                data-id={`${k} - ${direction} - ${angle}`}
                                //direcao
                                style={{transform: `rotate(${angle})`}}
                            >
                                <img
                                    src={imagens.arrow}
                                    alt="Imagem de um ceta"
                                />
                            </div>
                    ))
                        : null
                }
            </div>
        </div>
    )
}

export default HitZone