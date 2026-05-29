import './HitZone.scss'
//Hook
import useHitZone from '../../hook/useHitZone'
import { useEffect, useRef } from 'react'
//services
import { addCallBackKeyDown } from '../../../../shared/services/keydownManager'
import useGame from '../../hook/useGame'
import { useAudio } from '../../store/audioContext/useAudio'
import KeyPlayer from './KeyPlayer'

function HitZone() {
    //ref
    const refDetector = useRef<HTMLDivElement | null>(null)
    const refParent = useRef<HTMLDivElement | null>(null)
    //hook
    const {
        HandlerKeyDown,
        RegisterSetValueKeyLost
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
        refParent
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
                            <KeyPlayer
                                RegisterSetValueKeyLost={RegisterSetValueKeyLost}
                                angle={angle}
                                direction={direction}
                                lane={lane}
                                k={k}
                                order={order}
                                refNotesEl={refNotesEl}
                                time={time}
                                key={k}
                            />
                    ))
                        : null
                }
            </div>
        </div>
    )
}

export default HitZone