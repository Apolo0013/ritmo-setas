import './HitZone.scss'
//imagens
import { imagens } from '../../../../shared/assets/index'
import AudioTeste from './Slipknot - The Blister Exists (Audio) - Slipknot (youtube).mp3'
//Hook
import useHitZone from '../../hook/useHitZone'
import { useEffect, useRef } from 'react'
//services
import { addCallBackKeyDown } from '../../../../shared/services/keydownManager'
import useGame from '../../hook/useGame'
import { useAudio } from '../../store/audioContext/useAudio'

function HitZone() {
    //ref
    const refDetector = useRef<HTMLDivElement | null>(null)
    const refParent = useRef<HTMLDivElement | null>(null)
    //const refAudio = useRef<HTMLAudioElement | null>(null)
    //context
    const { refAudio } = useAudio()!
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
    //faca que o menuplay tenha o poder de play/pause e teste o contexto
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
                muted
                autoPlay
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